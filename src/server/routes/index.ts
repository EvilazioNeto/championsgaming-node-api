import { Router } from "express";
import { PosicoesController } from "../controllers/posicoes";
import { UsuariosController } from "../controllers/usuarios";
import { ensureAuthenticated } from "../shared/middlewares";
import { ClubeController } from "../controllers/clube";

const router = Router();

router.get('/', (_, res) => {
    return res.json('teste');
})

router.get('/posicoes', ensureAuthenticated, PosicoesController.getAll)
router.get('/posicoes/:id', ensureAuthenticated, PosicoesController.getByIdValidation, PosicoesController.getById)

router.post('/clubes', ensureAuthenticated, ClubeController.createValidation, ClubeController.create)
router.delete('/clubes/:id', ensureAuthenticated, ClubeController.deleteByIdValidation, ClubeController.deleteById)
router.get('/clubes', ensureAuthenticated, ClubeController.getAllValidation, ClubeController.getAll)
router.get('/clubes/:id', ensureAuthenticated, ClubeController.getByIdValidation, ClubeController.getById)
router.put('/clubes/:id', ensureAuthenticated, ClubeController.updateByIdValidation, ClubeController.updateById)

router.post('/entrar', UsuariosController.signInValidation, UsuariosController.signIn)
router.post('/cadastrar', UsuariosController.signUpValidation, UsuariosController.signUp)

export { router }