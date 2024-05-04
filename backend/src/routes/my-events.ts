import express, { Request, Response } from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import Event from "../models/event";
import verifyToken from "../middleware/auth";
import { body } from "express-validator";
import { EventType } from "../shared/types";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

router.post(
  "/",
  verifyToken,
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("location").notEmpty().withMessage("location is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("type").notEmpty().withMessage("Event type is required"),
    body("entryFee")
      .notEmpty()
      .isNumeric()
      .withMessage("Entry is required and must be a number"),
  ],
  upload.array("imageFiles", 6),
  async (req: Request, res: Response) => {
    try {
      const imageFiles = req.files as Express.Multer.File[];
      const newEvent: EventType = req.body;

      const imageUrls = await uploadImages(imageFiles);

      newEvent.imageUrls = imageUrls;
      newEvent.lastUpdated = new Date();
      newEvent.userId = req.userId;

      const event = new Event(newEvent);
      await event.save();

      res.status(201).send(event);
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

router.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const events = await Event.find({ userId: req.userId });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Error fetching events" });
  }
});

router.get("/:id", verifyToken, async (req: Request, res: Response) => {
  const id = req.params.id.toString();
  try {
    const event = await Event.findOne({
      _id: id,
      userId: req.userId,
    });
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: "Error fetching events" });
  }
});

router.put(
  "/:eventId",
  verifyToken,
  upload.array("imageFiles"),
  async (req: Request, res: Response) => {
    try {
      const updatedEvent: EventType = req.body;
      updatedEvent.lastUpdated = new Date();

      const event = await Event.findOneAndUpdate(
        {
          _id: req.params.eventId,
          userId: req.userId,
        },
        updatedEvent,
        { new: true }
      );

      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }

      const files = req.files as Express.Multer.File[];
      const updatedImageUrls = await uploadImages(files);

      event.imageUrls = [
        ...updatedImageUrls,
        ...(updatedEvent.imageUrls || []),
      ];

      await event.save();
      res.status(201).json(event);
    } catch (error) {
      res.status(500).json({ message: "Something went throw" });
    }
  }
);

async function uploadImages(imageFiles: Express.Multer.File[]) {
  const uploadPromises = imageFiles.map(async (image) => {
    const b64 = Buffer.from(image.buffer).toString("base64");
    let dataURI = "data:" + image.mimetype + ";base64," + b64;
    const res = await cloudinary.v2.uploader.upload(dataURI);
    return res.url;
  });

  const imageUrls = await Promise.all(uploadPromises);
  return imageUrls;
}

export default router;
