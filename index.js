import {
  getUsers,
  getUserByID,
  addUser,
  updateUser,
  deleteUser,
  showHelp,
} from "./models.js";
import dotenv from "dotenv";
import { createUserObject } from "./utils/createObjectUser.js";
import { createUpdateUserObject } from "./utils/createObjectUser.js";

// Carga las variables de entorno desde el archivo .env
dotenv.config();
const PATH_FILE_USER = process.env.PATH_FILE_USER;

const args = process.argv.splice(2);

if (args.length === 0) {
  console.log("No command provided. Use 'help' for available commands.");
}

// Asigna el primer argumento como la acción a realizar
const action = args[0];

// Utiliza un switch para determinar la acción a realizar
switch (action) {
  case "list":
    console.log(getUsers(PATH_FILE_USER));
    break;
  case "get":
    console.log(getUserByID(args[1]));
    break;
  case "add":
    const newUser = createUserObject(args);
    console.log(await addUser(newUser));
    break;
  case "update":
    const updatedUser = createUpdateUserObject(args);
    console.log(await updateUser(updatedUser));
    break;
  case "delete":
    console.log(deleteUser(args[1]));
    break;
  case "help":
    showHelp();
    break;
  default:
    console.log(
      "Invalid action. Use 'list', 'get', 'add', 'update', 'delete' or 'help'."
    );
    break;
}
