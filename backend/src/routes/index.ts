import express, {Request, Response} from 'express';
import StorageRouter from './Controllers/storageController';
import UserRouter from './Controllers/userController';
import JobsRouter from './Controllers/jobsController';
const router = express.Router();

router.use("/storage", StorageRouter);
router.use("/users", UserRouter);
router.use("/jobs", JobsRouter);

export default router;