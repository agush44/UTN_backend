import {
  getUsers,
  getUserByID,
  addUser,
  updateUser,
  deleteUser,
} from "./models.js";
import dotenv from "dotenv";
import { handleError } from "./utils/handleError.js";
import { createUserObject } from "./utils/createObjectUser.js";
import { createUpdateUserObject } from "./utils/createObjectUser.js";

dotenv.config();
const PATH_FILE_USER = process.env.PATH_FILE_USER;
const PATH_FILE_ERROR = process.env.PATH_FILE_ERROR;

const args = process.argv.splice(2);
const action = args[0];

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
  default:
    console.log(
      "Invalid action. Use 'list', 'get', 'add', 'update', or 'delete'."
    );
    break;
}
