import express, {Request, Response} from "express";
import { UserControllerClass } from "./Helpers/userHelpers";
import { UserEntityDTO } from "../../Entity/userEntity";
import bcrypt from "bcrypt";
import { connect } from "../../db";

const router = express.Router();
const userController = new UserControllerClass();

router.get("/", (req: Request, res: Response) => {
    userController.getAll(res);
});

router.get("/:id", (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    userController.getOne(id, res);
});

router.post("/", async (req: Request, res: Response) => {
    const user: UserEntityDTO = req.body;
    //Criptografando a senha
    await bcrypt.hash(user.password, 5).then((password) => {
        user.password = password;
    });
    userController.addOne(user, res);
});

// //Corrigir
// router.post("/login", async(req: Request, res: Response) => {
//     const user: UserEntityDTO = req.body;
//     //Criptografando a senha

//     connect().then((client) => {
//         client.query("SELECT * FROM users WHERE email = $1", [user.email], async (err, result) => {
//             if (err) {
//                 console.log(err);
//             }
//             if (result.rows.length === 0) {
//                 res.status(404).json({
//                     message: "User not found",
//                 });
//                 return;
//             }
//             await bcrypt.hash(user.password, 5).then((result) => {
//                 user.password = result;
//             })
//             console.log(result.rows[0].password, user.password);
//             await bcrypt.compare(result.rows[0].password, user.password).then((result) => {
//                 if (result) {
//                     res.status(200).json({
//                         message: "User logged in",
//                     });
//                 } else {
//                     res.status(401).json({
//                         message: "Invalid password",
//                     });
//                 }
//             }
//             );
//         });
//     });
   
// })

router.put("/:id", (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const user: UserEntityDTO = req.body;
    userController.updateOne(id, user, res);
})

router.delete("/:id", (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    userController.deleteOne(id, res);
})

export default router;