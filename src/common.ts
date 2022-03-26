import Ajv from "ajv";
import { merge } from "lodash";
import { logSchema, Show, showSchema } from "./types";

export const BOX_STYLE = {
  border: "solid 1px #dddddd",
  borderRadius: "10px",
  padding: "15px 20px",
  backgroundColor: "white",
  maxWidth: "970px",
  margin: "30px auto",
};

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
    return "March 21, " + (now.getFullYear() + 1).toString();
  } else if (stringDate === "spring") {
    const year = now.getMonth() < 4 ? now.getFullYear() : now.getFullYear() + 1;
    return "June 21, " + year.toString();
  } else if (parseInt(stringDate).toString() === stringDate) {
    return "December 31, " + stringDate;
  }
  return stringDate;
}

export async function getLogs(logUrl: string) {
  const out = await fetch(logUrl);
  if (out.ok) {
    return await out.json();
  } else {
    throw new Error(out.statusText);
  }
}

export async function getData(dataUrls: string[]) {
  const theData: Record<string, Show> = {};
  for (const url of dataUrls) {
    if (!url.trim()) continue;
    const out = await fetch(url);
    if (out.ok) {
      const entries = (await out.json()) as Show[];
      for (const entry of entries) {
        if (!(entry.name in theData)) {
          theData[entry.name] = entry;
        } else {
          merge(theData[entry.name], entry);
        }
      }
    } else {
      throw new Error(out.statusText || (await out.text()));
    }
  }
  return Object.values(theData);
}

const ajv = new Ajv({ strict: true });
export const logValidator = ajv.compile(logSchema);
export const showsValidator = ajv.compile(showSchema);
