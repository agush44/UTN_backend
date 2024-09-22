import { existsSync, readFileSync, writeFileSync } from "node:fs";
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

const addUser = (userData) => {
  try {
    const { name, lastName, email, password } = userData;

    if (!name || !lastName || !email || !password) {
      throw new Error("Missing data. All fields are required.");
    }

    if (
      typeof name !== "string" ||
      typeof lastName !== "string" ||
      typeof email !== "string"
    ) {
      throw new Error("Invalid data: name, last name and mail must be strings");
    }

    const users = getUsers(PATH_FILE_USER);

    const emailExists = users.some((user) => user.email === email);

    if (emailExists) {
      throw new Error("Invalid data: email is already registered");
    }

    const hash = createHash("sha256").update(password).digest("hex");

    const newUser = {
      id: randomUUID(),
      name,
      lastName,
      email,
      password: hash,
      isLoggedIn: false,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    writeFileSync(PATH_FILE_USER, JSON.stringify(users));

    return newUser;
  } catch (error) {
    const objError = handleError(error, PATH_FILE_ERROR);
    return objError;
  }
};

/*
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

export { getUsers, getUserByID, addUser, deleteUser };
