import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { randomUUID } from "node:crypto";
import dotenv from "dotenv";
import { handleError } from "./utils/handleError.js";
import bcrypt from "bcrypt";

dotenv.config();
const PATH_FILE_USER = process.env.PATH_FILE_USER;
const PATH_FILE_ERROR = process.env.PATH_FILE_ERROR;

//Muestra los usuarios
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

//Muestra usuario por ID
const getUserByID = (id) => {
  try {
    if (!id) {
      throw new Error("Id is missing");
    }
    const users = getUsers(PATH_FILE_USER);
    const foundUser = users.find((user) => user.id === id);

    if (!foundUser) {
      throw new Error("User not found");
    }
    return foundUser;
  } catch (error) {
    const objError = handleError(error, PATH_FILE_ERROR);
    return objError;
  }
};

//Agrega usuario
const addUser = async (userData) => {
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

    const hash = await bcrypt.hash(password, 10);

    const newUser = {
      id: randomUUID(),
      name,
      lastName,
      email,
      password: hash,
      isLoggedIn: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    users.push(newUser);
    writeFileSync(PATH_FILE_USER, JSON.stringify(users));

    return newUser;
  } catch (error) {
    const objError = handleError(error, PATH_FILE_ERROR);
    return objError;
  }
};

//Actualiza usuario
const updateUser = async (userData) => {
  try {
    const { id, name, lastName, email, password } = userData;
    if (!id) {
      throw new Error("Id is missing");
    }

    const users = getUsers(PATH_FILE_USER);
    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      throw new Error("User not found");
    }

    const foundUser = users[userIndex];

    if (email && email !== foundUser.email) {
      const existingEMail = users.find((user) => user.email === email);
      if (existingEMail) {
        throw new Error("Invalid data: Email is already registered.");
      }
      foundUser.email = email;
    }

    if (name && typeof name === "string") {
      foundUser.name = name;
    }

    if (lastName && typeof lastName === "string") {
      foundUser.lastName = lastName;
    }

    if (password && typeof password === "string") {
      const hash = await bcrypt.hash(password, 10);
      foundUser.password = hash;
    }

    foundUser.updatedAt = new Date().toISOString();
    users[userIndex] = foundUser;

    writeFileSync(PATH_FILE_USER, JSON.stringify(users));

    return foundUser;
  } catch (error) {
    const objError = handleError(error, PATH_FILE_ERROR);
    return objError;
  }
};

//Elimina usuario
const deleteUser = (id) => {
  try {
    if (!id) {
      throw new Error("Id is missing");
    }

    const users = getUsers(PATH_FILE_USER);
    const user = getUserByID(id);
    const usersModified = users.filter((user) => user.id !== id);
    writeFileSync(PATH_FILE_USER, JSON.stringify(usersModified));
    return user;
  } catch (error) {
    const objError = handleError(error, PATH_FILE_ERROR);
    return objError;
  }
};

export { getUsers, getUserByID, addUser, deleteUser };
