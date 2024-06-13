export const convertTimeToHours = (time: string): number => {
  const [hours, minutes] = time.split(":");
  return Number(hours) + Number(minutes) / 60;
};
