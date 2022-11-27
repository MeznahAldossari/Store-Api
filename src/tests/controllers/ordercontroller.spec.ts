import supertest from "supertest";
import app from "../../server";
import { validate_token } from "../../middelware/validtoken";
import { application, request, response } from "express";
import dotenv from "dotenv";
import { order_operations, order_details } from "../../models/order";
import { user_operations, user_details } from "../../models/user";
import { product_operations, product_details } from "../../models/product";
import jwt from "jsonwebtoken";
import { Connection } from "pg";
import query from "express";
import db_parameters from "../../db";

const { TOKENSECRET } = process.env;
const test_request = supertest(app);

let new_token = "";
describe("order [Order Api]", () => {
  beforeAll(async () => {
    const userObj: user_details = {
      username: "Programmer",
      firstname: "meznah",
      lastname: "aldossari",
      user_password: "123",
    };

    const product_Obj: product_details = {
      product_name: "House",
      price: 920,
    };
    const createUser = new user_operations();
    const userObject = await createUser.create(userObj);
    expect(userObject.username).toEqual("Programmer");
    new_token = jwt.sign(
      { user: { id: userObject.id, username: userObject.username } },
      TOKENSECRET as string
    );

    const newproduct = new product_operations();
    const Object = await newproduct.create_product(product_Obj);
  });

  it("Create Order", async () => {
    const res = await test_request
      .post("/api/order/")
      .set("Authorization", `Bearer ${new_token}`)
      .send({
        userid: 1,
        order_status: "active",
      });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: 1,
      userid: 1,
      order_status: "active",
    });
  });

  it("Get All Orders (/api/all_orders/)", async () => {
    const res = await test_request
      .get("/api/all_orders/")
      .set("Authorization", `Bearer ${new_token}`);

    expect(res.status).toBe(200);
    expect(res.body).toEqual([
      {
        id: 1,
        userid: 1,
        order_status: "active",
      },
    ]);
  });

  it("Get Specific Order ( /api/orderid/1 ) ", async () => {
    const res = await test_request
      .get("/api/orderid/1")
      .set("Authorization", `Bearer ${new_token}`);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: 1,
      userid: 1,
      order_status: "active",
    });
  });

  it("Get All Orders for specific User ( /api/user_orderid/userOrders/1 ) ", async () => {
    const res = await test_request
      .get("/api/user_orderid/userOrders/1")
      .set("Authorization", `Bearer ${new_token}`);

    expect(res.status).toBe(200);
    expect(res.body).toEqual([
      {
        id: 1,
        userid: 1,
        order_status: "active",
      },
    ]);
  });

  it("Update Order (/api/update_order/1)", async () => {
    const res = await test_request
      .put("/api/update_order/1")
      .set("Authorization", `Bearer ${new_token}`)
      .send({
        id: 1,
        userid: 1,
        order_status: "completed",
      });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: 1,
      userid: 1,
      order_status: "completed",
    });
  });

  it("Add poducts to Order (/api/product_order/addProduct)", async () => {
    const res = await test_request
      .post("/api/product_order/addProduct")
      .set("Authorization", `Bearer ${new_token}`)
      .send({
        order_id: 1,
        product_id: 1,
        quantity: 5,
      });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: 1,
      order_id: 1,
      product_id: 1,
      quantity: 5,
    });
  });

  it("Get All products for specific Order ( /api/user_orderid/userOrders/1 ) ", async () => {
    const res = await test_request
      .get("/api/order_products/orderProduct/1")
      .set("Authorization", `Bearer ${new_token}`);

    expect(res.status).toBe(200);
    expect(res.body).toEqual([
      {
        id: 1,
        order_id: 1,
        product_id: 1,
        quantity: 5,
      },
    ]);
  });

  it("Delet specific Order (/api/remove_order/1) ", async () => {
    const response = await test_request
      .delete("/api/remove_order/1")
      .set("Authorization", `Bearer ${new_token}`)
      .then((res) => {
        expect(res.status).toBe(200);
      });

    //i have to delete User and product using query method
  });

  afterAll(async () => {
    const connection = await db_parameters.connect();
    await connection.query("DELETE FROM Users;");
    await connection.query("ALTER SEQUENCE Users_id_seq RESTART WITH 1;");
    await connection.query("DELETE FROM product;");
    await connection.query("ALTER SEQUENCE product_id_seq RESTART WITH 1;");
    await connection.query("ALTER SEQUENCE Orders_id_seq RESTART WITH 1;");
    await connection.query("DELETE FROM orderproduct;");

    await connection.query(
      "ALTER SEQUENCE orderproduct_id_seq RESTART WITH 1;"
    );

    connection.release();
  });
});
