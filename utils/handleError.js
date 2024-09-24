import { randomUUID } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";

const now = new Date();
const dateString = now.toLocaleDateString();
const timeString = now.toLocaleTimeString();

/**
 * Maneja los errores y los registra en un archivo de logs.
 *
 * @param {Error} error - El objeto de error que se desea manejar.
 * @param {string} path - La ruta del archivo donde se almacenan los logs de errores.
 * @returns {Object} - Un nuevo objeto de error que se ha registrado.
 */
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
