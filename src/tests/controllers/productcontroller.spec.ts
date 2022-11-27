import supertest from "supertest";
import app from "../../server";
import { validate_token } from "../../middelware/validtoken";
import { application, request, response } from "express";
import dotenv from "dotenv";
import { user_operations, user_details } from "../../models/user";
import jwt from "jsonwebtoken";
import db_parameters from "../../db";

const test_request = supertest(app);
const Userdata = new user_operations();
dotenv.config();
const { TOKENSECRET } = process.env;
let new_token = "";
describe("Product [Product Api] ---", () => {
  beforeAll(async () => {
    const userObj: user_details = {
      username: "Developer",
      firstname: "Sara",
      lastname: "aldossari",
      user_password: "M_N_987",
    };
    const createUser = new user_operations();
    const userObject = await createUser.create(userObj);
    expect(userObject.username).toEqual("Developer");
    new_token = jwt.sign(
      { user: { id: userObject.id, username: userObject.username } },
      TOKENSECRET as string
    );
  });

  it("Return a new product (/api/product/)", async () => {
    const res = await test_request
      .post("/api/product/")
      .set("Authorization", `Bearer ${new_token}`)
      .send({
        product_name: "Bag",
        price: 5000,
      });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: 1,
      product_name: "Bag",
      price: 5000,
    });
  });

  it("Get All Products (/api/all_products/)", async () => {
    const res = await test_request.get("/api/all_products/");

    expect(res.status).toBe(200);
    expect(res.body).toEqual([
      {
        id: 1,
        product_name: "Bag",
        price: 5000,
      },
    ]);
  });

  it("Get Specific Product ( /api/productid/1 ) ", async () => {
    const res = await test_request.get("/api/productid/1");

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: 1,
      product_name: "Bag",
      price: 5000,
    });
  });

  it("Update Product (/api/update_product/1)", async () => {
    const res = await test_request
      .put("/api/update_product/1")
      .set("Authorization", `Bearer ${new_token}`)
      .send({
        product_name: "Dress",
        price: 9000,
      });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: 1,
      product_name: "Dress",
      price: 9000,
    });
  });

  it("Delete Product (/api/remove_Product/1)", async () => {
    const response = await test_request
      .delete("/api/remove_Product/1")
      .set("Authorization", `Bearer ${new_token}`)
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });

  afterAll(async () => {
    const connection = await db_parameters.connect();
    await connection.query("DELETE FROM Users;");
    await connection.query("ALTER SEQUENCE Users_id_seq RESTART WITH 1;");
    await connection.query("DELETE FROM product;");
    await connection.query("ALTER SEQUENCE product_id_seq RESTART WITH 1;");
    connection.release();
  });
});
