import { order_operations } from "../../models/order";
import { user_operations } from "../../models/user";
import { product_operations } from "../../models/product";
import db_parameters from "../../db";

const user_Model = new user_operations();
const product_Model = new product_operations();
const Order_Model = new order_operations();

describe("Order", () => {
  beforeAll(async () => {
    const newProduct = await product_Model.create_product({
      product_name: "Bag",
      price: 2000,
    });

    const newUser = await user_Model.create({
      username: "Developer_Reem",
      firstname: "Reem",
      lastname: "aldossari",
      user_password: "M123",
    });
  });

  it("Create Order", async () => {
    const newOrder = await Order_Model.create_order({
      userid: 1,
      order_status: "active",
    });
    expect(newOrder).toEqual({
      id: 1,
      userid: 1,
      order_status: "active",
    });
  });

  it("Retrive Specific Order", async () => {
    const orderid = await Order_Model.retrive_specific_order(1);
    expect(orderid.id).toEqual(1);
  });

  it("Retrive All Orders", async () => {
    const allorder = await Order_Model.retriveAll_orders();
    expect(allorder).toEqual([
      {
        id: 1,
        userid: 1,
        order_status: "active",
      },
    ]);
  });

  it("Retrive All Orders for specific user", async () => {
    const allorder = await Order_Model.retrive_specific_userOrder(1);
    expect(allorder).toEqual([
      {
        id: 1,
        userid: 1,
        order_status: "active",
      },
    ]);
  });

  it("Update a Order", async () => {
    const updateProduct = await Order_Model.updata_order({
      id: 1,
      userid: 1,
      order_status: "completed",
    });
    expect(updateProduct).toEqual({
      id: 1,
      userid: 1,
      order_status: "completed",
    });
  });

  it("Add Product to Order", async () => {
    const newOrder = await Order_Model.Addproduct_order({
      order_id: 1,
      product_id: 1,
      quantity: 10,
    });
    expect(newOrder).toEqual({
      id: 1,
      order_id: 1,
      product_id: 1,
      quantity: 10,
    });
  });

  it("Retrive All orders product by order id", async () => {
    const allorder = await Order_Model.rertive_orderProducts(1);
    expect(allorder).toEqual([
      {
        id: 1,
        order_id: 1,
        product_id: 1,
        quantity: 10,
      },
    ]);
  });

  it("Delete Specific Order", async () => {
    await Order_Model.delete_order(1);
    expect(await Order_Model.retriveAll_orders()).toEqual([]);
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
