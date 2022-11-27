import query from "express";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import db_parameters from "../db";

export type order_details = {
  id?: number;
  userid: number;
  order_status: string;
};
export type order_product_details = {
  id?: number;
  order_id: number;
  product_id: number;
  quantity: number;
};

export class order_operations {
  async create_order(orderObj: order_details): Promise<order_details> {
    try {
      const connection = await db_parameters.connect();
      const insert_order = `INSERT INTO Orders (userid, order_status) VALUES($1,$2) RETURNING *`;
      const res = await connection.query(insert_order, [
        orderObj.userid,
        orderObj.order_status,
      ]);

      connection.release();
      return res.rows[0];
    } catch (error) {
      throw new Error("Cannot add new order");
    }
  }

  async retriveAll_orders(): Promise<order_details[]> {
    try {
      const connection = await db_parameters.connect();
      const retrive_query = "SELECT * FROM Orders";
      const res = await connection.query(retrive_query);
      //close connection
      connection.release();
      return res.rows;
    } catch (error) {
      throw new Error("Cannot display Orders");
    }
  }

  async retrive_specific_order(id: number): Promise<order_details> {
    try {
      const connection = await db_parameters.connect();
      const retrive_query = "SELECT * FROM Orders WHERE id=($1)";
      const res = await connection.query(retrive_query, [id]);
      //close connection
      connection.release();
      return res.rows[0];
    } catch (error) {
      throw new Error("Cannot display this order");
    }
  }

  async retrive_specific_userOrder(userid: number): Promise<order_details[]> {
    try {
      const connection = await db_parameters.connect();

      const retrive_query = "SELECT * FROM Orders WHERE userid=($1)";
      const res = await connection.query(retrive_query, [userid]);
      //close connection
      connection.release();
      return res.rows;
    } catch (error) {
      throw new Error("Cannot display orders for this user");
    }
  }

  async delete_order(id: number): Promise<order_details> {
    try {
      //query
      const connection = await db_parameters.connect();

      const deleteorder = "DELETE FROM Orders WHERE id=($1);";
      //connection

      const res = await connection.query(deleteorder, [id]);

      //close connection
      connection.release();
      return res.rows[0];
    } catch (error) {
      throw new Error("Cannot delete this order");
    }
  }

  async updata_order(updateUser: order_details): Promise<order_details> {
    try {
      const connection = await db_parameters.connect();
      const update_query =
        "UPDATE Orders SET userid = ($2), order_status = ($3) WHERE id=($1) RETURNING *";

      const res = await connection.query(update_query, [
        updateUser.id,
        updateUser.userid,
        updateUser.order_status,
      ]);

      //close connection
      connection.release();
      return res.rows[0];
    } catch (error) {
      throw new Error("Cannot Update this Order");
    }
  }

  async Addproduct_order(
    orderObj: order_product_details
  ): Promise<order_product_details> {
    try {
      const connection = await db_parameters.connect();
      const insert_prodcutorder = `INSERT INTO orderproduct (order_id, product_id, quantity) VALUES($1,$2, $3) RETURNING *`;
      const res = await connection.query(insert_prodcutorder, [
        orderObj.order_id,
        orderObj.product_id,
        orderObj.quantity,
      ]);

      connection.release();
      return res.rows[0];
    } catch (error) {
      throw new Error("Cannot add new product to order");
    }
  }

  async rertive_orderProducts(
    order_id: number
  ): Promise<order_product_details[]> {
    try {
      const connection = await db_parameters.connect();
      const retrive = "SELECT * FROM orderproduct WHERE order_id=($1)";
      const res = await connection.query(retrive, [order_id]);
      //close connection
      connection.release();
      return res.rows;
    } catch (error) {
      throw new Error("Cannot add display order products");
    }
  }
}
