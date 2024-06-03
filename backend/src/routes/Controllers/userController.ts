import express, {Request, Response} from "express";
import { UserControllerClass } from "./Helpers/userHelpers";
import { UserEntityDTO } from "../../Entity/userEntity";
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
    //Criptografando a senha do usuário com cifra de cezar
    const passwordEncryped = user.password.split("").map((char) => {
        return String.fromCharCode(char.charCodeAt(0) - 5);
    }).join("");

    user.password = passwordEncryped;
    console.log(passwordEncryped)
    
    userController.addOne(user, res);
});

//Corrigir
router.post("/login", async(req: Request, res: Response) => {
    const user: UserEntityDTO = req.body;
    //Criptografando a senha
    console.log(user)

    connect().then((client) => {
        client.query("SELECT * FROM users WHERE email = $1", [user.email], async (err, result) => {
            if (err) {
                console.log(err);
            }
            if (result.rows.length === 0) {
                
                res.status(404).json({
                    message: "User not found",
                });
                return;
            }
            const userDB = result.rows[0];
            const passwordDecrypted = userDB.password.split("").map((char:string) => {
                return String.fromCharCode(char.charCodeAt(0) + 5);
            }).join("");
            if (passwordDecrypted === user.password) {
                res.status(200).json({
                    message: "Login successfully",
                });
            } else {
                res.status(401).json({
                    message: "Incorrect password",
                });
            }
        });
    });
   
})

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