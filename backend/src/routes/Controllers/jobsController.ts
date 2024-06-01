import express, { Request, Response } from "express";
import { JobsControllerClass } from "./Helpers/jobsHelper";
import { JobsEntityDTO } from "../../Entity/jobsEntity";

const router = express.Router();
const jobsController = new JobsControllerClass();

router.get("/", (req: Request, res: Response) => {
  jobsController.getAll(res);
});

router.get("/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  jobsController.getOne(id, res);
});

router.post("/", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const job: JobsEntityDTO = req.body;
  jobsController.addOne(job, res);
});

router.put("/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const job: JobsEntityDTO = req.body;
  jobsController.updateOne(id, job, res);
});

router.delete("/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  jobsController.deleteOne(id, res);
});

export default router;