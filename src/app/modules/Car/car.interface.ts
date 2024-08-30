export type TCar = {
  name: string;
  model: string;
  year: string;
  date: string;
  image: string;
  location: string;
  ownerEmail: string;
  OwnerName: string;
  description: string;
  color: string;
  carType: string;
  seatCapacity: number;
  isElectric: boolean;
  status: string;
  features: string[];
  pricePerHour: number;
  isDeleted: boolean;
};

export type TReturnCar = {
  bookingId: string;
  endTime: string;
};
