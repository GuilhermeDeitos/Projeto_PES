import { Pool } from "pg";
import { StorageEntity, StorageEntityDTO } from "../../../Entity/storageEntity";
import { connect } from "../../../db";
import { Request, Response } from "express";

export class StorageControllerClass {
  private StorageEntityCollection: StorageEntity[] | undefined;
  connection: Pool | undefined;
  constructor() {
    this.StorageEntityCollection = undefined;
    this.connection = undefined;
  }

  async connectDB(): Promise<void> {
    try {
      this.connection = await connect();
    } catch (error) {
      console.log(error);
    }
  }

  private async getStorageEntities(): Promise<StorageEntity[] | void> {
    if (this.connection === undefined) await this.connectDB();
    else {
      this.connection?.query("SELECT * FROM storage", (err, result) => {
        if (err) {
          console.log(err);
        }
        this.StorageEntityCollection = result.rows === null ? [] : result.rows;
      });
    }
  }

  async getAll(res: Response): Promise<StorageEntity[] | void> {
    if (this.StorageEntityCollection === undefined)
      await this.getStorageEntities();

    res.status(200).json({
      data: this.StorageEntityCollection,
      message: "All storage entities",
    });
  }

  async getOne(id: number, res: Response): Promise<StorageEntity | void> {
    if (this.StorageEntityCollection === undefined)
      await this.getStorageEntities();

    const entity = this.StorageEntityCollection?.find(
      (entity) => entity.id === id
    );
    if (entity === undefined) {
      res.status(404).json({
        message: "Entity not found",
      });
      return;
    } else {
      res.status(200).json({
        data: entity,
        message: "Entity found",
      });
    }
  }

  async addOne(entity: StorageEntityDTO, res: Response): Promise<void> {
    console.log(entity);
    if (this.connection === undefined) await this.connectDB();

    this.connection?.query(
      `
            INSERT INTO storage (name, status, description, quantity, price) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [
        entity.name,
        entity.status,
        entity.description,
        entity.quantity,
        entity.price,
      ],
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).json({
            message: "Error adding entity",
          });
        } else {
          res.status(200).json({
            data: result.rows[0],
            message: "Entity added",
          });
          this.StorageEntityCollection?.push(result.rows[0]);
        }
      }
    );
  }

  async updateOne(id: number, entity: StorageEntityDTO, res: Response): Promise<void> {
    const columns = Object.keys(entity as StorageEntityDTO).filter((key) => entity[key as keyof StorageEntityDTO] !== undefined);
    const values = columns.map((key) => entity[key as keyof StorageEntityDTO]);
    const query = `UPDATE storage SET ${columns.map((column, index) => `${column} = $${index + 1}`).join(", ")} WHERE id = ${id} RETURNING *`;  
    if (this.connection === undefined) await this.connectDB();
  
    this.connection?.query(query, values, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({
          message: "Error updating entity",
        });
      } else {
        res.status(200).json({
          updatedData: result.rows[0],
          message: "Entity updated",
        });
        const index = this.StorageEntityCollection?.findIndex((entity) => entity.id === id);
        if (index !== undefined) {
          this.StorageEntityCollection?.splice(index, 1, result.rows[0]);
        }
      }
    });
  }

  async deleteOne(id: number, res: Response): Promise<void> {
    if (this.connection === undefined) await this.connectDB();

    this.connection?.query(
      `
                  DELETE FROM storage
                  WHERE id = ${id}
              `,
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).json({
            message: "Error deleting entity",
          });
        } else {
          res.status(200).json({
            message: "Entity deleted",
          });
          const index = this.StorageEntityCollection?.findIndex(
            (entity) => entity.id === id
          );
          if (index !== undefined) {
            this.StorageEntityCollection?.splice(index, 1);
          }
        }
      }
    );
  }
}
