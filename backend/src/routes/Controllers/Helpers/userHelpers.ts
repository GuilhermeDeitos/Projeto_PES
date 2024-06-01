import { Pool } from "pg";
import { UserEntity, UserEntityDTO } from "../../../Entity/userEntity";
import { connect } from "../../../db";
import { Request, Response } from "express";

export class UserControllerClass {
  private userEntityCollection: UserEntity[] | undefined;
  connection: Pool | undefined;
  constructor() {
    this.userEntityCollection = undefined;
    this.connection = undefined;
  }

  async connectDB(): Promise<void> {
    try {
      this.connection = await connect();
    } catch (error) {
      console.log(error);
    }
  }

  async getUserEntities(): Promise<UserEntity[] | void> {
    const client = await connect();
    client.query("SELECT * FROM users", (err, res) => {
      if (err) {
        console.log(err);
      }
      this.userEntityCollection = res.rows === null ? [] : res.rows;
    });

    return this.userEntityCollection;
  }

  public async getAll(res: Response): Promise<UserEntity[] | void> {
    if (this.userEntityCollection === undefined) await this.getUserEntities();

    res.status(200).json({
      data: this.userEntityCollection,
      message: "All users fetched successfully",
    });
    return this.userEntityCollection;
  }

  async getOne(id: number, res: Response): Promise<UserEntity | void> {
    if (this.userEntityCollection === undefined) await this.getUserEntities();

    const user = this.userEntityCollection?.find((user) => user.id === id);
    if (user === undefined) {
      res.status(404).json({
        message: "User not found",
      });
      return;
    } else {
      res.status(200).json({
        data: user,
        message: "User fetched successfully",
      });
    }
  }

  async addOne(user: UserEntityDTO, res: Response): Promise<void> {
    if (this.connection === undefined) await this.connectDB();

    this.connection?.query(
      `INSERT INTO users (name, email, password, role, hours) VALUES($1, $2, $3, $4, $5)RETURNING *`,
      [user.name, user.email, user.password, user.role, user.hours],
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).json({
            message: "Error adding user",
          });
        } else {
          res.status(200).json({
            data: result.rows[0],
            message: "User added successfully",
          });
          this.userEntityCollection?.push(result.rows[0]);
        }
      }
    );
  }

  async updateOne(id: Number, entity: UserEntityDTO, res: Response): Promise<void> {
    if (this.connection === undefined) await this.connectDB();
  
    // Cria uma lista de colunas para atualizar com base nos campos presentes em 'entity'
    const columns = Object.keys(entity).filter(key => entity[key as keyof UserEntityDTO] !== undefined);
    const values = columns.map(key => entity[key as keyof UserEntityDTO]);
      
    // Cria a string de consulta SQL
    const query = `UPDATE users SET ${columns.map((column, index) => `${column} = $${index + 1}`)} WHERE id = ${id} RETURNING *`;
  
    this.connection?.query(query, values, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({
          message: "Error updating user",
        });
      } else {
        res.status(200).json({
          data: result.rows[0],
          message: "User updated successfully",
        });
        const index = this.userEntityCollection?.findIndex((user) => user.id === id);
        if (index !== undefined) {
          this.userEntityCollection?.splice(index, 1, result.rows[0]);
        }
      }
    });
  }

  async deleteOne(id: Number, res: Response): Promise<void> {
    if (this.connection === undefined) await this.connectDB();

    this.connection?.query(
      `DELETE FROM users WHERE id = ${id} RETURNING *`,
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).json({
            message: "Error deleting user",
          });
        } else {
          res.status(200).json({
            message: "User deleted successfully",
          });
          const index = this.userEntityCollection?.findIndex(
            (user) => user.id === id
          );
          if (index !== undefined) {
            this.userEntityCollection?.splice(index, 1);
          }
        }
      }
    );
  }
}
