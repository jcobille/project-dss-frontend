const padTo2Digits = (num: number) => {
  return num.toString().padStart(2, "0");
};

export const formatDate = (datetime?: Date) => {
  let date = datetime ? new Date(datetime) : new Date();
  return (
    [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join("-")
  );
};

export const getYear = (time: Date) => {
  let date = time ? new Date(time) : new Date();
  return date.getFullYear();
};
