import { existsSync, read, readFileSync, write, writeFileSync } from "node:fs";
import { randomUUID, createHash } from "node:crypto";
import dotenv from "dotenv";
import { handleError } from "./utils/handleError.js";

dotenv.config();
const PATH_FILE_USER = process.env.PATH_FILE_USER;
const PATH_FILE_ERROR = process.env.PATH_FILE_ERROR;

const getUsers = (urlFile) => {
  try {
    if (!urlFile) {
      throw new Error("Access denied");
    }
    const exists = existsSync(urlFile);
    if (!exists) {
      writeFileSync(urlFile, JSON.stringify([]));
      return [];
    }
    const users = JSON.parse(readFileSync(urlFile));
    return users;
  } catch (error) {
    const objError = handleError(error, PATH_FILE_ERROR);
    return objError;
  }
};

const getUserByID = (id) => {
  try {
    if (!id) {
      throw new Error("Id is missing");
    }
    const users = getUsers(PATH_FILE_USER);
    const user = users.find((user) => user.id === id);

    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    const objError = handleError(error, PATH_FILE_ERROR);
    return objError;
  }
};

const res = getUserByID();
console.log(res);

/*
//Recibe un objeto con toda la data para el nuevo usuario.
//Valida que estén los datos mínimos para añadir un usuario.
//Valida que el nombre sea un string
//Valida que el apellido sea un string
//Valida que el mail sea un string y que no se repita
//Hashea la contraseña antes de registrar al usuario
const addUser = (userData) => {
  try {
  } catch (error) {}
};

//Todos los datos del usuario pueden ser modificados menos el ID
//Si se modifica la pass debería ser nuevamente hasheada
//Si se modifica el mail, validar que no exista
const updateUser = (userData) => {
  try {
  } catch (error) {}
};

const deleteUser = (id) => {
  try {
  } catch (error) {}
};
*/

//export { getUsers, getUserByID, addUser, deleteUser };
