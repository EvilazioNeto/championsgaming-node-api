import { Router } from "express";
import { PosicoesController } from "../controllers/posicoes";
import { UsuariosController } from "../controllers/usuarios";
import { ensureAuthenticated } from "../shared/middlewares";

const router = Router();

router.get('/', (_, res) => {
    return res.json('Olá, DEV!');
})

router.get('/posicoes', ensureAuthenticated, PosicoesController.getAll)
router.get('/posicoes/:id', ensureAuthenticated, PosicoesController.getByIdValidation, PosicoesController.getById)

router.post('/entrar', UsuariosController.signInValidation, UsuariosController.signIn)
router.post('/cadastrar', UsuariosController.signUpValidation, UsuariosController.signUp)

export { router }