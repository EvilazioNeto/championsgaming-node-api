import { Router } from "express";
import { PosicoesController } from "../controllers/posicoes";
import { UsuariosController } from "../controllers/usuarios";
import { ensureAuthenticated } from "../shared/middlewares";
import { ClubeController } from "../controllers/clube";
import { JogadoresController } from "../controllers/jogadores";
import { CampeonatoController } from "../controllers/campeonatos";
import { ClubesCampeonatosController } from "../controllers/clubesCampeonatos";

const router = Router();

router.get('/', (_, res) => {
    return res.json('Running');
})

router.get('/posicoes', ensureAuthenticated, PosicoesController.getAll)
router.get('/posicoes/:id', ensureAuthenticated, PosicoesController.getByIdValidation, PosicoesController.getById)

router.post('/clubes', ensureAuthenticated, ClubeController.createValidation, ClubeController.create)
router.delete('/clubes/:id', ensureAuthenticated, ClubeController.deleteByIdValidation, ClubeController.deleteById)
router.get('/clubes', ensureAuthenticated, ClubeController.getAllValidation, ClubeController.getAll)
router.get('/clubes/:id', ensureAuthenticated, ClubeController.getByIdValidation, ClubeController.getById)
router.put('/clubes/:id', ensureAuthenticated, ClubeController.updateByIdValidation, ClubeController.updateById)
router.get('/clubes/:id/jogadores', ensureAuthenticated, JogadoresController.getAllByClubIdValidation, JogadoresController.getAllByClubId)

router.post('/jogadores', ensureAuthenticated, JogadoresController.createValidation, JogadoresController.create)
router.get('/jogadores/:id', ensureAuthenticated, JogadoresController.getByIdValidation, JogadoresController.getById)
router.delete('/jogadores/:id', ensureAuthenticated, JogadoresController.deleteByIdValidation, JogadoresController.deleteById)
router.put('/jogadores/:id', ensureAuthenticated, JogadoresController.updateByIdValidation, JogadoresController.updateById)

router.post('/campeonatos', ensureAuthenticated, CampeonatoController.createValidation, CampeonatoController.create)
router.get('/campeonatos/:id', ensureAuthenticated, CampeonatoController.getByIdValidation, CampeonatoController.getById)
router.delete('/campeonatos/:id', ensureAuthenticated, CampeonatoController.deleteByIdValidation, CampeonatoController.deleteById)
router.put('/campeonatos/:id', ensureAuthenticated, CampeonatoController.updateByIdValidation, CampeonatoController.updateById)
router.get('/usuario/:id/campeonatos', ensureAuthenticated, CampeonatoController.getAllByUserIdValidation, CampeonatoController.getAllByUserId)

router.post('/clubes-campeonatos', ensureAuthenticated, ClubesCampeonatosController.createValidation, ClubesCampeonatosController.create);
router.get('/clubes-campeonatos/:id', ensureAuthenticated, ClubesCampeonatosController.getByIdValidation, ClubesCampeonatosController.getById)
router.delete('/clubes-campeonatos/:id', ensureAuthenticated, ClubesCampeonatosController.deleteByIdValidation, ClubesCampeonatosController.deleteById);
router.put('/clubes-campeonatos/:id', ensureAuthenticated, ClubesCampeonatosController.updateByIdValidation, ClubesCampeonatosController.updateById)
router.get('/campeonatos/:id/clubes', ensureAuthenticated, ClubesCampeonatosController.getAllByCampeonatoIdValidation, ClubesCampeonatosController.getAllByCampeonatoId)

router.post('/entrar', UsuariosController.signInValidation, UsuariosController.signIn)
router.post('/cadastrar', UsuariosController.signUpValidation, UsuariosController.signUp)

export { router }