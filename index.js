import { getUsers, getUserByID, addUser, deleteUser } from "./modules.js";

const args = process.argv.splice(2);

//Recibir los args pasados por terminal
//Enviárselos a "./utils/createObjectUser.js" (en caso de crear o actualizar el usuario)
//Evaluar qué acción quiere realizar el usuario (list, search/get, add, update, delete)
//Devolver el output al cliente final
