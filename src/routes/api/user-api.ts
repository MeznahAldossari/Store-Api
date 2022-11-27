import Router from "express";
import {
  retrive_users,
  retrivespecific_user,
  DeleteUser,
  update_user,
  check_user_auths,
  new_user,
} from "../../all-controllers/user-controller";
import { validate_token } from "../../middelware/validtoken";
const user_router = Router();

user_router.post("/added", new_user);
user_router.get("/", validate_token, retrive_users);
user_router.get("/:id", validate_token, retrivespecific_user);
user_router.delete("/:id", validate_token, DeleteUser);
user_router.put("/:id", validate_token, update_user);
user_router.post("/", check_user_auths);

export default user_router;
