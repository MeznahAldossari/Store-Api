import supertest from "supertest";
import app from "../../server";
import { validate_token } from "../../middelware/validtoken";
import { application, request, response } from "express";
import dotenv from "dotenv";
import { user_operations, user_details } from "../../models/user";
import { verify } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import db_parameters from "../../db";

//let get_token: string = token(1, "bearer");
const test_request = supertest(app);
const Userdata = new user_operations();
dotenv.config();
const { TOKENSECRET } = process.env;
let testToken = "";

describe("User [User Api]", () => {
  const userObj: user_details = {
    username: "Engnieer",
    firstname: "Maha",
    lastname: "Alharbi",
    user_password: "AM123",
  };
  beforeAll(async () => {
    const userObject = await Userdata.create(userObj);
    expect(userObject.username).toEqual("Engnieer");
  });

  it("Authinticate to get user token", async () => {
    const response = await test_request
      .post("/api/user/auth/")
      .set("Content-type", "application/json")
      .send({
        username: "Engnieer",
        user_password: "AM123",
      });
    expect(response.status).toBe(200);
    const { id, username } = response.body.data;
    expect(id).toBe(1);
    expect(username).toBe("Engnieer");
    testToken = response.body.data.token_value;
  });

  it("Create new User (/api/users/newuser/added) ", async () => {
    const response = await test_request
      .post("/api/users/newuser/added")
      .set("Content-type", "application/json")
      .send({
        username: "Web_Developer",
        firstname: "Nora",
        lastname: "Aldossari",
        user_password: "XX123",
      });
    expect(response.status).toBe(200);
    expect(response.body.data.id).toBe(2);
  });

  it("get all users (/api/all_users) ", async () => {
    const response = await test_request
      .get("/api/all_users/")
      .set("Content-type", "application/json")
      .set("Authorization", `Bearer ${testToken}`);

    expect(response.status).toBe(200);
  });

  it("get specific user (/api/userid/2) ", async () => {
    const response = await test_request
      .get("/api/userid/2")
      .set("Content-type", "application/json")
      .set("Authorization", `Bearer ${testToken}`);

    expect(response.status).toBe(200);
  });

  it("Update specific user (/api/update_user/2) ", async () => {
    const response = await test_request
      .put("/api/update_user/2")
      .set("Content-type", "application/json")
      .set("Authorization", `Bearer ${testToken}`)
      .send({
        id: 2,
        username: "IT Engnier",
        firstname: "Nouf",
        lastname: "Aldossari",
        user_password: "XX123",
      });

    expect(response.status).toBe(200);
  });

  it("Delet specific user () ", async () => {
    const response = await test_request
      .delete("/api/remove_user/2")
      .set("Content-type", "application/json")
      .set("Authorization", `Bearer ${testToken}`);

    expect(response.status).toBe(200);
  });
  afterAll(async () => {
    const connection = await db_parameters.connect();
    await connection.query("DELETE FROM Users;");
    await connection.query("DELETE FROM Orders;");
    await connection.query("DELETE FROM product;");

    await connection.query("ALTER SEQUENCE Users_id_seq RESTART WITH 1;");
    await connection.query("ALTER SEQUENCE Orders_id_seq RESTART WITH 1;");
    await connection.query("ALTER SEQUENCE product_id_seq RESTART WITH 1;");
    connection.release();
  });
});
