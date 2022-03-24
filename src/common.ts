export function asProperDate(stringDate: string) {
  const now = new Date();
  if (stringDate === "summer") {
    const year = now.getMonth() < 7 ? now.getFullYear() : now.getFullYear() + 1;
    return "September 21, " + year.toString();
  } else if (stringDate === "fall") {
    const year =
      now.getMonth() < 10 ? now.getFullYear() : now.getFullYear() + 1;
    return "December 21, " + year.toString();
  } else if (stringDate === "winter") {
    const year =
      now.getMonth() < 13 ? now.getFullYear() : now.getFullYear() + 1;
    return "March 21, " + year.toString();
  } else if (stringDate === "spring") {
    const year = now.getMonth() < 4 ? now.getFullYear() : now.getFullYear() + 1;
    return "June 21, " + year.toString();
  } else if (parseInt(stringDate).toString() === stringDate) {
    return "December 31, " + stringDate;
  }
  return stringDate;
}
