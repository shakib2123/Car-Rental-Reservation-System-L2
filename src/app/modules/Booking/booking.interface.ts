import { Types } from "mongoose";

export type TBooking = {
  date: string;
  startTime: string;
  endTime: string;
  user: Types.ObjectId;
  car: Types.ObjectId;
  GPS: boolean;
  childSeat: boolean;
  creditCard: string;
  drivingLicense: string;
  passport: string;
  userEmail: string;
  totalCost: number;
  status: string;
  returned: boolean;
  isPaid: boolean;
};
