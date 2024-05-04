export type UserType = {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export type EventType = {
  _id: string;
  userId: string;
  name: string;
  city: string;
  location: string;
  description: string;
  type: string;
  guestCount: number;
  entryFee: number;
  imageUrls: string[];
  lastUpdated: Date;
  bookings: BookingType[];
};

export type BookingType = {
  _id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  guestCount: number;
  checkIn: Date;
  checkOut: Date;
  totalCost: number;
};

export type EventSearchResponse = {
  data: EventType[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
};
