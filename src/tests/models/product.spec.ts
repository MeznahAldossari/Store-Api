import { product_operations } from "../../models/product";
import db_parameters from "../../db";

const product_Model = new product_operations();

describe("Product", () => {
  it("should create a product", async () => {
    const newProduct = await product_Model.create_product({
      product_name: "New_Product",
      price: 1000,
    });
    expect(newProduct).toEqual({
      id: 1,
      product_name: "New_Product",
      price: 1000,
    });
  });

  it("Update a Product", async () => {
    const updateProduct = await product_Model.updata_product({
      id: 1,
      product_name: "New_Product",
      price: 1200,
    });
    expect(updateProduct).toEqual({
      id: 1,
      product_name: "New_Product",
      price: 1200,
    });
  });
  it("Retrive Specific Product", async () => {
    const productid = await product_Model.display_specific_product(1);
    expect(productid).toEqual({
      id: 1,
      product_name: "New_Product",
      price: 1200,
    });
  });

  it("Retrive All Products", async () => {
    const allproducts = await product_Model.display_all_products();
    expect(allproducts).toEqual([
      {
        id: 1,
        product_name: "New_Product",
        price: 1200,
      },
    ]);
  });
  it("Delete Specific product", async () => {
    await product_Model.delete_product(1);
    expect(await product_Model.display_all_products()).toEqual([]);
  });

  afterAll(async () => {
    const connection = await db_parameters.connect();

    await connection.query("DELETE FROM product;");
    await connection.query("ALTER SEQUENCE product_id_seq RESTART WITH 1;");
    connection.release();
  });
});
