import query from "express";
import db_parameters from "../db";

export type product_details = {
  id?: number;
  product_name: string;
  price: number;
};

export class product_operations {
  //Create a New Product
  async create_product(product: product_details): Promise<product_details> {
    try {
      //connection
      const connection = await db_parameters.connect();
      //INSERT QUERY
      const insert_query = `INSERT INTO product (product_name, price) VALUES ($1,$2) RETURNING *`;
      const res = await connection.query(insert_query, [
        product.product_name,
        product.price,
      ]);

      connection.release();
      return res.rows[0];
    } catch (error) {
      //modify this sentence
      throw new Error(`Cannot add Product ${product.product_name}`);
    }
  }

  //Display All Products
  async display_all_products(): Promise<product_details[]> {
    try {
      //connection
      const connection = await db_parameters.connect();
      //query
      const retrive_query = "SELECT * FROM product";
      const res = await connection.query(retrive_query);
      //close connection
      connection.release();
      return res.rows;
    } catch (error) {
      throw new Error("Cannot display products");
    }
  }

  async display_specific_product(id: number): Promise<product_details> {
    try {
      //query
      const connection = await db_parameters.connect();

      const specific_product = "SELECT * FROM product WHERE id=($1);";
      //connection

      const res = await connection.query(specific_product, [id]);

      //close connection
      connection.release();
      return res.rows[0];
    } catch (error) {
      throw new Error("Cannot display this product");
    }
  }

  async delete_product(id: number): Promise<product_details> {
    try {
      //connection
      const connection = await db_parameters.connect();
      //query

      const delete_product = "DELETE FROM product WHERE id=($1);";

      const res = await connection.query(delete_product, [id]);

      //close connection
      connection.release();
      return res.rows[0];
    } catch (error) {
      throw new Error("Cannot delete this product");
    }
  }

  async updata_product(
    updateProduct: product_details
  ): Promise<product_details> {
    try {
      const connection = await db_parameters.connect();
      const update_query =
        "UPDATE product SET product_name = ($2), price = ($3) WHERE id=($1) RETURNING *";
      const res = await connection.query(update_query, [
        updateProduct.id,
        updateProduct.product_name,
        updateProduct.price,
      ]);

      //close connection
      connection.release();
      return res.rows[0];
    } catch (error) {
      throw new Error("Cannot Update this product");
    }
  }
}
