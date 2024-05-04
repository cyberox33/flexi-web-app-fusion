import { RegisterFormData } from "./pages/Register.jsx";
import { SignInFormData } from "./pages/SignIn.jsx";
import {
  EventSearchResponse,
  EventType,
  UserType,
} from "../../backend/src/shared/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const fetchCurrentUser = async (): Promise<UserType> => {
  const response = await fetch(`${API_BASE_URL}/api/users/me`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Error fetching user");
  }
  return response.json();
};

export const register = async (formData: RegisterFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};

export const signIn = async (formData: SignInFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.message);
  }
  return body;
};

export const validateToken = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Token invalid");
  }

  return response.json();
};

export const signOut = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    credentials: "include",
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Error during sign out");
  }
};

export const addMyEvent = async (eventFormData: FormData) => {
  const response = await fetch(`${API_BASE_URL}/api/my-events`, {
    method: "POST",
    credentials: "include",
    body: eventFormData,
  });

  if (!response.ok) {
    throw new Error("Failed to add event");
  }

  return response.json();
};

export const fetchMyEvents = async (): Promise<EventType[]> => {
  const response = await fetch(`${API_BASE_URL}/api/my-events`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error fetching events");
  }

  return response.json();
};

export const fetchMyEventById = async (eventId: string): Promise<EventType> => {
  const response = await fetch(`${API_BASE_URL}/api/my-events/${eventId}`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error fetching Events");
  }

  return response.json();
};

export const updateMyEventById = async (eventFormData: FormData) => {
  const response = await fetch(
    `${API_BASE_URL}/api/my-events/${eventFormData.get("eventId")}`,
    {
      method: "PUT",
      body: eventFormData,
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update Event");
  }

  return response.json();
};

export type SearchParams = {
  destination?: string;
  checkIn?: string;
  checkOut?: string;
  guestCount?: string;
  page?: string;
  types?: string[];
  maxPrice?: string;
  sortOption?: string;
};

export const searchEvents = async (
  searchParams: SearchParams
): Promise<EventSearchResponse> => {
  const queryParams = new URLSearchParams();
  queryParams.append("destination", searchParams.destination || "");
  queryParams.append("checkIn", searchParams.checkIn || "");
  queryParams.append("checkOut", searchParams.checkOut || "");
  queryParams.append("guestCount", searchParams.guestCount || "");
  queryParams.append("page", searchParams.page || "");

  queryParams.append("maxPrice", searchParams.maxPrice || "");
  queryParams.append("sortOption", searchParams.sortOption || "");


  searchParams.types?.forEach((type) => queryParams.append("types", type));

  const response = await fetch(
    `${API_BASE_URL}/api/events/search?${queryParams}`
  );

  if (!response.ok) {
    throw new Error("Error fetching events");
  }

  return response.json();
};

export const fetchEvents = async (): Promise<EventType[]> => {
  const response = await fetch(`${API_BASE_URL}/api/events`);
  if (!response.ok) {
    throw new Error("Error fetching events");
  }
  return response.json();
};

export const fetchEventById = async (eventId: string): Promise<EventType> => {
  const response = await fetch(`${API_BASE_URL}/api/events/${eventId}`);
  if (!response.ok) {
    throw new Error("Error fetching Events");
  }

  return response.json();
};

