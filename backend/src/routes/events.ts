import express, { Request, Response } from "express";
import Event from "../models/event";
import { BookingType, EventSearchResponse } from "../shared/types";
import { param, validationResult } from "express-validator";
import verifyToken from "../middleware/auth";


const router = express.Router();

router.get("/search", async (req: Request, res: Response) => {
  try {
    const query = constructSearchQuery(req.query);

    let sortOptions = {};
    switch (req.query.sortOption) {
      case "entryFeeAsc":
        sortOptions = { entryFee: 1 };
        break;
      case "entryFeeDesc":
        sortOptions = { entryFee: -1 };
        break;
    }

    const pageSize = 5;
    const pageNumber = parseInt(
      req.query.page ? req.query.page.toString() : "1"
    );
    const skip = (pageNumber - 1) * pageSize;

    const events = await Event.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(pageSize);

    const total = await Event.countDocuments(query);

    const response: EventSearchResponse = {
      data: events,
      pagination: {
        total,
        page: pageNumber,
        pages: Math.ceil(total / pageSize),
      },
    };

    res.json(response);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    const events = await Event.find().sort("-lastUpdated");
    res.json(events);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Error fetching events" });
  }
});

router.get(
  "/:id",
  [param("id").notEmpty().withMessage("Event ID is required")],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const id = req.params.id.toString();

    try {
      const event = await Event.findById(id);
      res.json(event);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error fetching event" });
    }
  }
);

router.post(
  "/:eventId/bookings",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      
      const newBooking: BookingType = {
        ...req.body,
        userId: req.userId,
      };

      const event = await Event.findOneAndUpdate(
        { _id: req.params.eventId },
        {
          $push: { bookings: newBooking },
        }
      );

      if (!event) {
        return res.status(400).json({ message: "event not found" });
      }

      await event.save();
      res.status(200).send();
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "something went wrong" });
    }
  }
);

const constructSearchQuery = (queryParams: any) => {
  let constructedQuery: any = {};

  if (queryParams.destination) {
    constructedQuery.$or = [
      { city: new RegExp(queryParams.destination, "i") },
      { location: new RegExp(queryParams.destination, "i") },
    ];
  }

  if (queryParams.guestCount) {
    constructedQuery.guestCount = {
      $gte: parseInt(queryParams.guestCount),
    };
  }

 
  if (queryParams.types) {
    constructedQuery.type = {
      $in: Array.isArray(queryParams.types)
        ? queryParams.types
        : [queryParams.types],
    };
  }

  if (queryParams.maxPrice) {
    constructedQuery.entryFee= {
      $lte: parseInt(queryParams.maxPrice).toString(),
    };
  }

  return constructedQuery;
};

export default router;
