import Router from "express";
import {
  createOrder,
  getAll_orders,
  getorder,
  getuser_order,
  DeleteOrder,
  updateOrder,
  AddProduct_ToOrder,
  getorder_products,
} from "../../all-controllers/order-controller";
import { validate_token } from "../../middelware/validtoken";

const order_router = Router();

order_router.post("/", validate_token, createOrder);
order_router.get("/", validate_token, getAll_orders);
order_router.get("/:id", validate_token, getorder);
order_router.get("/userOrders/:id", validate_token, getuser_order);
order_router.delete("/:id", validate_token, DeleteOrder);
order_router.put("/:id", validate_token, updateOrder);
order_router.post("/addProduct", validate_token, AddProduct_ToOrder);
//order_router.get("/orderProducts/:id", getAll_orderproducts);
order_router.get("/orderProduct/:id", validate_token, getorder_products);

export default order_router;
