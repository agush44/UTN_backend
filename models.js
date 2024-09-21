import { existsSync, read, readFileSync, write, writeFileSync } from "node:fs";
import { randomUUID, createHash } from "node:crypto";
//import { dotenv } from "node:dotenv";
import { error } from "node:console";
import { type } from "node:os";
import { handleError } from "./utils/handleError.js";

//Recuperar variables de entorno !!
const PATH_FILE = process.env.PATH_FILE;

const getUsers = (urlFile) => {
  try {
    if (!urlFile) {
      throw new Error("Access denied");
    }
    const exists = existsSync(PATH_FILE);
    if (!exists) {
      writeFileSync(PATH_FILE, JSON.stringify([]));
      return [];
    }
    const users = JSON.parse(readFileSync(PATH_FILE));
    return users;
  } catch (error) {
    const errorPathFile = "./error/log.json";
    handleError(error, errorPathFile);
    return error.message;
  }
};

/*
const getUserByID = () => {
  try {
  } catch (error) {}
};

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
