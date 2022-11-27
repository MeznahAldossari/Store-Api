import query from "express";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import db_parameters from "../db";

export type user_details = {
  id?: number;
  username: string;
  firstname: string;
  lastname: string;
  user_password: string;
};

dotenv.config();
const { BCRYPTPASSWORD, SLART_ROUNDS, TOKENSECRET } = process.env;

export class user_operations {
  async userAuthentication(
    username: string,
    user_password: string
  ): Promise<null | user_details> {
    try {
      const connection = await db_parameters.connect();
      const last_query = "SELECT * FROM Users WHERE username=($1)";

      const query_res = await connection.query(last_query, [username]);
      const row_length = query_res.rows.length;
      if (row_length > 0) {
        const user_object = query_res.rows[0];
        const checkpass = bcrypt.compareSync(
          user_password + BCRYPTPASSWORD,
          user_object.user_password
        );

        if (checkpass) {
          return user_object;
        }
      }
      connection.release();
      return null;
    } catch (error) {
      throw new Error("Some Error Accured ");
    }
  }

  async create(userinformation: user_details): Promise<user_details> {
    try {
      const connection = await db_parameters.connect();
      const insert_query =
        "INSERT INTO Users (username,firstname,lastname,user_password) VALUES ($1,$2,$3,$4) RETURNING *";
      const encrypt_password = parseInt(SLART_ROUNDS as string, 10);
      const bcrypt_value = bcrypt.hashSync(
        userinformation.user_password + BCRYPTPASSWORD,
        encrypt_password
      );
      const query_result = await connection.query(insert_query, [
        userinformation.username,
        userinformation.firstname,
        userinformation.lastname,
        bcrypt_value,
      ]);
      connection.release();
      return query_result.rows[0];
    } catch (error) {
      throw new Error("Cannot add User");
    }
  }
  //Display All Products
  async display_all_users(): Promise<user_details[]> {
    try {
      //connection
      const connection = await db_parameters.connect();
      //query
      const retrive_query = "SELECT * FROM Users";
      const res = await connection.query(retrive_query);
      //close connection
      connection.release();
      return res.rows;
    } catch (error) {
      throw new Error("Cannot display users");
    }
  }

  async display_specific_user(id: number): Promise<user_details> {
    try {
      //query
      const connection = await db_parameters.connect();

      const specific_user = "SELECT * FROM Users WHERE id=($1);";
      //connection

      const res = await connection.query(specific_user, [id]);

      //close connection
      connection.release();
      return res.rows[0];
    } catch (error) {
      throw new Error("Cannot display this user");
    }
  }

  async delete_user(id: number): Promise<user_details> {
    try {
      //query
      const connection = await db_parameters.connect();

      const deleteuser = "DELETE FROM Users WHERE id=($1);";
      //connection

      const res = await connection.query(deleteuser, [id]);

      //close connection
      connection.release();
      return res.rows[0];
    } catch (error) {
      throw new Error("Cannot delete this user");
    }
  }

  async updata_user(updateUser: user_details): Promise<user_details> {
    try {
      const connection = await db_parameters.connect();
      const update_query =
        "UPDATE Users SET username = ($2), firstname = ($3), lastname = ($4), user_password= ($5) WHERE id=($1) RETURNING *";

      const rounds_number = parseInt(SLART_ROUNDS as string, 10);
      const bcrypt_password = bcrypt.hashSync(
        updateUser.user_password + BCRYPTPASSWORD,
        rounds_number
      );

      const res = await connection.query(update_query, [
        updateUser.id,
        updateUser.username,
        updateUser.firstname,
        updateUser.lastname,
        bcrypt_password,
      ]);

      //close connection
      connection.release();
      return res.rows[0];
    } catch (error) {
      throw new Error("Cannot Update this product");
    }
  }

  /*async user_authentication(
    username: string,
    user_password: string
  ): Promise<user_details | null> {
    try {
      const connection = await db_parameters.connect();
      const retrive_query = "SELECT user_password FROM Users WHERE username=($1)";
      const res = await connection.query(retrive_query, [username]);
      const user_lenght = res.rows.length;

      if (user_lenght > 0) {
        const {user_password: hashpass} = res.rows[0];
        console.log("i am inside user length condition");

        const checkpassword = bcrypt.compareSync(
          user_password + BCRYPTPASSWORD,
          hashpass
        );

        if (checkpassword) {
          console.log("i am inside checkpassord condition");

          return userdata;
        }
      }
      connection.release();
      return null;
    } catch (error) {
      throw new Error("Some Error Accured ");
    }
  }*/
}
