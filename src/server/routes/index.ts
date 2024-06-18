import { Router } from "express";
import { PosicoesController } from "../controllers/posicoes";

const router = Router();

router.get('/', (_, res) => {
    return res.json('Olá, DEV!');
})

router.get('/posicoes', PosicoesController.getAll)
router.get('/posicoes/:id', PosicoesController.getByIdValidation, PosicoesController.getById)

export { router }