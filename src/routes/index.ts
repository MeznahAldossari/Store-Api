import { Router } from "express";
import product_router from "./api/product-api";
import user_router from "./api/user-api";
import order_router from "./api/order-api";

const Routers = Router();

Routers.use("/product", product_router);
Routers.use("/all_products", product_router);
Routers.use("/productid", product_router);
Routers.use("/remove_Product", product_router);
Routers.use("/update_product", product_router);

//create
Routers.use("/users/newuser", user_router);
//retrive all users
Routers.use("/all_users", user_router);
//retrive specific user
Routers.use("/userid", user_router);
//delete user
Routers.use("/remove_user", user_router);
//update user
Routers.use("/update_user", user_router);

//Order
Routers.use("/order", order_router);
Routers.use("/all_orders", order_router);
Routers.use("/orderid", order_router);
Routers.use("/user_orderid", order_router);
Routers.use("/remove_order", order_router);
Routers.use("/update_order", order_router);
Routers.use("/product_order", order_router);
//Routers.use("/order_products", order_router);
Routers.use("/order_products", order_router);

Routers.use("/user/auth", user_router);

export default Routers;
