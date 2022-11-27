import { request, Request, Response } from "express";
import { user_details, user_operations } from "../models/user";
import jwt from "jsonwebtoken";
import dotenv, { config } from "dotenv";

const user_info = new user_operations();

dotenv.config();
const { TOKENSECRET } = process.env;

const new_user = async (request: Request, response: Response) => {
  try {
    const username = request.body.username;
    const firstname = request.body.firstname;
    const lastname = request.body.lastname;
    const user_password = request.body.user_password;

    if (!username || !firstname || !lastname || !user_password) {
      response.status(401).json("error in new user function");
    }
    const user_attributes: user_details = {
      username,
      firstname,
      lastname,
      user_password,
    };

    const user_result = await user_info.create(user_attributes);
    const token_value = jwt.sign(
      { user: { id: user_result.id, username: user_result.username } },
      TOKENSECRET as string
    );

    response.json({
      status: "success",
      data: {
        ...user_result,
        token_value,
      },
    });
  } catch (error) {
    response.status(400).json(error);
  }
};
const retrive_users = async (_request: Request, response: Response) => {
  try {
    const users = await user_info.display_all_users();
    response.json(users);
  } catch (error) {
    response.status(401).json(error);
  }
};

const retrivespecific_user = async (request: Request, response: Response) => {
  try {
    const id = Number(request.params.id);

    if (!id) {
      response.status(400).send("This user does not Exists");
    }
    const users = await user_info.display_specific_user(id);
    response.send(users);
  } catch (error) {
    response.status(401).json(error);
  }
};

const DeleteUser = async (request: Request, response: Response) => {
  try {
    const id = Number(request.params.id);

    if (!id) {
      response.status(400).send("This user does not Exists");
    }
    const userid2 = await user_info.delete_user(id);

    response.json("the user deleted");
  } catch (error) {
    response.status(400).json(error);
  }
};

const update_user = async (request: Request, response: Response) => {
  try {
    const id = Number(request.params.id);
    const username = request.body.username;
    const firstname = request.body.firstname;
    const lastname = request.body.lastname;
    const user_password = request.body.user_password;

    if (!id) {
      response.status(400).send("This user does not Exists");
    }

    if (!firstname || !lastname || !user_password || !username) {
      response
        .status(400)
        .send("There are some paramaters that are missing in update user");
    }

    const productInfo = { id, username, firstname, lastname, user_password };
    const updataProduct = await user_info.updata_user(productInfo);
    response.json(updataProduct);
  } catch (error) {
    response.status(401).json(error);
  }
};

const check_user_auths = async (request: Request, response: Response) => {
  try {
    const username = request.body.username;
    const user_password = request.body.user_password;
    if (!username || !user_password) {
      response.status(401).send("There are missing parameters in auth");
    }
    const userdetails = await user_info.userAuthentication(
      username,
      user_password
    );
    if (!userdetails) {
      response.status(401).send("Username OR password does not correct");
    } else {
      const token_value = jwt.sign(
        { user: { id: userdetails.id, username: userdetails.username } },
        TOKENSECRET as string
      );
      response.json({
        status: "success",
        data: {
          ...userdetails,
          token_value,
        },
      });
    }
  } catch (error) {
    response.status(400).json(error);
  }
};

export {
  retrive_users,
  retrivespecific_user,
  DeleteUser,
  update_user,
  check_user_auths,
  new_user,
};
