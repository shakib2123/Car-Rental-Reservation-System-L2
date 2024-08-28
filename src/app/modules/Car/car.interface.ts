export type TCar = {
  name: string;
  model: string;
  year: string;
  image: string;
  location: string;
  ownerEmail: string;
  OwnerName: string;
  description: string;
  color: string;
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
