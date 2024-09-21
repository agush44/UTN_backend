import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { randomUUID, createHash } from "node:crypto";
import { dotenv } from "node:dotenv";
import { handleError } from "./utils/handleError.js";

//Recuperar variables de entorno !!

//Métodos:

const getUsers = () => {
  try {
  } catch (error) {
    //const objError = handleError();
    //return objError;
  }
};

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

export { getUsers, getUserByID, addUser, deleteUser };
