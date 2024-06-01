import { Pool } from "pg";
import { JobsEntity, JobsEntityDTO } from "../../../Entity/jobsEntity";
import { UserControllerClass } from "./userHelpers";
import { connect } from "../../../db";
import { Response } from "express";

export class JobsControllerClass {
  private jobEntityCollection: JobsEntity[] | undefined;
  connection: Pool | undefined;
  constructor() {
    this.jobEntityCollection = undefined;
    this.connection = undefined;
  }

  async connectDB(): Promise<void> {
    try {
      this.connection = await connect();
    } catch (error) {
      console.log(error);
    }
  }

  private async getJobEntities(): Promise<JobsEntity[] | void> {
    if (this.connection === undefined) await this.connectDB();
    else {
      this.connection?.query("SELECT * FROM jobs", (err, result) => {
        if (err) {
          console.log(err);
        }
        this.jobEntityCollection = result.rows === null ? [] : result.rows;
      });
    }
  }

  async getAll(res: Response): Promise<JobsEntity[] | void> {
    if (this.jobEntityCollection === undefined) await this.getJobEntities();

    res.status(200).json({
      data: this.jobEntityCollection,
      message: "All job entities",
    });
  }

  async getOne(id: number, res: Response): Promise<JobsEntity | void> {
    if (this.jobEntityCollection === undefined) await this.getJobEntities();

    const entity = this.jobEntityCollection?.find((entity) => entity.id === id);
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

  async addOne(job: JobsEntityDTO, res: Response): Promise<void> {
    if (this.connection === undefined) await this.connectDB();
    const { title, description, value, progress, status, workers_id } = job;
    this.connection?.query(
      `
            INSERT INTO jobs (title, description, value, progress, status, workers_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *
            `,
      [title, description, value, progress,status ? status : 0, workers_id],
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).json({
            message: "Error adding job",
          });
        } else {
          res.status(200).json({
            message: "Job added successfully",
          });
          this.jobEntityCollection?.push(result.rows[0]);
        }
      }
    );
    
    
  }

  async updateOne(id: number, job: JobsEntityDTO, res: Response): Promise<void> {
    const columns = Object.keys(job as JobsEntityDTO).filter((key) => job[key as keyof JobsEntityDTO] !== undefined);
    const values = columns.map((key) => job[key as keyof JobsEntityDTO]);
    const query = `UPDATE jobs SET ${columns.map((column, index) => `${column} = $${index + 1}`)} WHERE id = ${id} RETURNING *`;
    if (this.connection === undefined) await this.connectDB();
    
    this.connection?.query(query, values, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({
          message: "Error updating job",
        });
      } else {
        res.status(200).json({
          message: "Job updated successfully",
        });
        const index = this.jobEntityCollection?.findIndex((job) => job.id === id);
        if (index !== undefined) {
          this.jobEntityCollection?.splice(index, 1, result.rows[0]);
        }
      }
    });
  }

  async deleteOne(id: number, res: Response): Promise<void> {
    if (this.connection === undefined) await this.connectDB();
    this.connection?.query(
      `DELETE FROM jobs WHERE id = ${id} RETURNING *`,
      (err, result) => {
        if (err) {
          console.log(err);
        }
        res.status(200).json({
          message: "Job deleted successfully",
        });
        const index = this.jobEntityCollection?.findIndex(
          (job) => job.id === id
        );
        if (index !== undefined) {
          this.jobEntityCollection?.splice(index, 1);
        }
      }
    );
  }
}
