import { randomUUID } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";

const now = new Date();
const dateString = now.toLocaleDateString();
const timeString = now.toLocaleTimeString();

const handleError = (error, path) => {
  const dbError = JSON.parse(readFileSync(path));
  const newError = {
    id: randomUUID(),
    type: error.message,
    date: `${timeString} ${dateString}`,
  };
  dbError.push(newError);
  writeFileSync(path, JSON.stringify(dbError));
  return newError;
};

export { handleError };
