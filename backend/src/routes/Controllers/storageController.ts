import express, {Request, Response} from "express";
import { StorageControllerClass } from "./Helpers/storageHelper";
import { StorageEntityDTO } from "../../Entity/storageEntity";

const router = express.Router();
const StorageController = new StorageControllerClass();
router.get("/", (req: Request, res: Response) => {
    StorageController.getAll(res);
});

router.get("/:id", (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    StorageController.getOne(id, res);
});

router.post("/", (req: Request, res: Response) =>{
    const entity: StorageEntityDTO = req.body;
    StorageController.addOne(entity, res);
})

router.put("/:id", (req: Request, res: Response) =>{
    const id = parseInt(req.params.id);
    const entity: StorageEntityDTO = req.body;
    StorageController.updateOne(id,entity, res);
})

router.delete("/:id", (req: Request, res: Response) =>{
    const id = parseInt(req.params.id);
    StorageController.deleteOne(id, res);
})

export default router;