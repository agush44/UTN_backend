import { handleError } from "./handleError.js";
import dotenv from "dotenv";

// Carga las variables de entorno desde el archivo .env
dotenv.config();
const PATH_FILE_ERROR = process.env.PATH_FILE_ERROR;

// Función para crear un objeto de usuario a partir de argumentos de entrada
const createUserObject = (args) => {
  try {
    const [name, lastName, email, password] = args.slice(1);
    if (!name || !lastName || !email || !password) {
      throw new Error("Missing data");
    }

    return {
      name,
      lastName,
      email,
      password,
    };
  } catch (error) {
    const objError = handleError(error, PATH_FILE_ERROR);
    return objError;
  }
};

// Función para crear un objeto de usuario actualizado a partir de argumentos de entrada
const createUpdateUserObject = (args) => {
  try {
    const [id, name, lastName, email, password] = args.slice(1);
    if (!id) {
      throw new Error("Id is missing");
    }

    const updatedUser = { id };
    if (name) updatedUser.name = name;
    if (lastName) updatedUser.lastName = lastName;
    if (email) updatedUser.email = email;
    if (password) updatedUser.password = password;
    updatedUser.id = id;

    return updatedUser;
  } catch (error) {
    const objError = handleError(error, PATH_FILE_ERROR);
    return objError;
  }
};

export { createUserObject, createUpdateUserObject };
