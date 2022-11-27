import { Router } from "express";
import {
  new_product,
  retrive_products,
  retrivespecific_product,
  DeleteProduct,
  update_product,
} from "../../all-controllers/product-controller";
import { validate_token } from "../../middelware/validtoken";

const product_router = Router();

product_router.post("/", validate_token, new_product);
product_router.get("/", retrive_products);
product_router.get("/:id", retrivespecific_product);
product_router.delete("/:id", validate_token, DeleteProduct);
product_router.put("/:id", validate_token, update_product);

export default product_router;
