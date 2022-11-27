import { request, Request, Response } from "express";
import { product_operations } from "../models/product";

const product = new product_operations();

const new_product = async (request: Request, response: Response) => {
  try {
    const product_name = request.body.product_name;
    const price = request.body.price;

    if (product_name === "undefined " || price === "undefined ") {
      response
        .status(400)
        .send("There are some paramaters that are missing in product function");
    }

    const product_parameters = { product_name, price };
    const creation = await product.create_product(product_parameters);
    response.json(creation);
  } catch (error) {
    response.status(400).json(error);
  }
};

const retrive_products = async (_request: Request, response: Response) => {
  try {
    const produts = await product.display_all_products();
    response.json(produts);
  } catch (error) {
    response.status(401).json(error);
  }
};

const retrivespecific_product = async (
  request: Request,
  response: Response
) => {
  try {
    const id = Number(request.params.id);

    if (!id) {
      response.status(400).send("This product does not Exists");
    }
    const produts = await product.display_specific_product(id);
    response.send(produts);
  } catch (error) {
    response.status(401).json(error);
  }
};

const DeleteProduct = async (request: Request, response: Response) => {
  try {
    const id = Number(request.params.id);

    if (!id) {
      response.status(400).send("This product does not Exists");
    }
    const produts = await product.delete_product(id);
    response.json("product deleted");
  } catch (error) {
    response.status(400).json(error);
  }
};

const update_product = async (request: Request, response: Response) => {
  try {
    const id = Number(request.params.id);
    const product_name = request.body.product_name;
    const price = request.body.price;
    if (!id) {
      response.status(400).send("This product does not Exists");
    }

    if (!product_name || !price) {
      response
        .status(400)
        .send("There are some paramaters that are missing in update product");
    }

    const productInfo = { id, product_name, price };
    const updataProduct = await product.updata_product(productInfo);
    response.json(updataProduct);
  } catch (error) {
    response.status(401).json(error);
  }
};
export {
  new_product,
  retrive_products,
  retrivespecific_product,
  DeleteProduct,
  update_product,
};
