import { request, Request, Response } from "express";
import { order_details, order_operations } from "../models/order";
import jwt from "jsonwebtoken";
import dotenv, { config } from "dotenv";

const order_info = new order_operations();

const createOrder = async (request: Request, response: Response) => {
  try {
    const userid = request.body.userid;
    const order_status = request.body.order_status;

    if (!userid || !order_status) {
      response.status(401).json("There are missing parameters in create Order");
    }

    const orderdata = { userid, order_status };
    const order_data = await order_info.create_order(orderdata);
    response.json(order_data);
  } catch (error) {
    response.status(400).json(error);
  }
};

const getAll_orders = async (request: Request, response: Response) => {
  try {
    const Orders = await order_info.retriveAll_orders();
    response.json(Orders);
  } catch (error) {
    response.status(401).json(error);
  }
};

const getorder = async (request: Request, response: Response) => {
  try {
    const id = Number(request.params.id);

    if (!id) {
      response.status(400).send("This order does not Exists");
    }

    const orders = await order_info.retrive_specific_order(id);
    response.send(orders);
  } catch (error) {
    response.status(401).json(error);
  }
};

const getuser_order = async (request: Request, response: Response) => {
  try {
    const userid = Number(request.params.id);
    const Userorders = await order_info.retrive_specific_userOrder(userid);
    response.send(Userorders);
  } catch (error) {
    response.status(401).json(error);
  }
};

const DeleteOrder = async (request: Request, response: Response) => {
  try {
    const id = Number(request.params.id);

    if (!id) {
      response.status(400).send("This Order does not Exists");
    }
    const orderid = await order_info.delete_order(id);

    response.json("Order deleted");
  } catch (error) {
    response.status(400).json(error);
  }
};

const updateOrder = async (request: Request, response: Response) => {
  try {
    const id = Number(request.params.id);
    const userid = request.body.userid;
    const order_status = request.body.order_status;

    if (!id) {
      response.status(400).send("This order does not Exists");
    }

    if (!userid || !order_status) {
      response
        .status(400)
        .send("There are some paramaters that are missing in update order");
    }

    const orderInfo = { id, userid, order_status };
    const updataOrder = await order_info.updata_order(orderInfo);
    response.json(updataOrder);
  } catch (error) {
    response.status(401).json(error);
  }
};

const AddProduct_ToOrder = async (request: Request, response: Response) => {
  try {
    const order_id = request.body.order_id;
    const product_id = request.body.product_id;
    const quantity = request.body.quantity;

    if (!order_id || !product_id || !quantity) {
      response
        .status(401)
        .json("There are missing parameters in create productOrder");
    } else {
      const productdata = { order_id, product_id, quantity };
      const product_data = await order_info.Addproduct_order(productdata);
      response.json(product_data);
    }
  } catch (error) {
    response.status(400).json(error);
  }
};

const getorder_products = async (request: Request, response: Response) => {
  try {
    const order_id = Number(request.params.id);
    const orderProducts = await order_info.rertive_orderProducts(order_id);
    response.send(orderProducts);
  } catch (error) {
    response.status(401).json(error);
  }
};

export {
  createOrder,
  getAll_orders,
  getorder,
  getuser_order,
  DeleteOrder,
  updateOrder,
  AddProduct_ToOrder,
  getorder_products,
};
