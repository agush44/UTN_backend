//Obtener los args pasados por terminal (que vienen del index)
//Desarrollar las funciones que crean los objetos para añadir un usuario y actualizar un usuario
//Aplicar control de errores entorno a las posibilidades de que surja uno
import { handleError } from "./handleError.js";
import dotenv from "dotenv";

dotenv.config();
const PATH_FILE_USER = process.env.PATH_FILE_USER;
const PATH_FILE_ERROR = process.env.PATH_FILE_ERROR;

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
