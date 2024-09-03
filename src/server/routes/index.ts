import { Router } from "express";
import { PosicoesController } from "../controllers/posicoes";
import { UsuariosController } from "../controllers/usuarios";
import { ensureAuthenticated } from "../shared/middlewares";
import { ClubeController } from "../controllers/clube";
import { JogadoresController } from "../controllers/jogadores";
import { CampeonatoController } from "../controllers/campeonatos";
import { ClubesCampeonatosController } from "../controllers/clubesCampeonatos";
import { JogosController } from "../controllers/jogos";
import { JogadoresJogosController } from "../controllers/jogadoresJogos";
import { TreinadoresController } from "../controllers/treinadores";

const router = Router();

router.get('/', (_, res) => {
    return res.json('Running');
})

router.get('/posicoes', ensureAuthenticated, PosicoesController.getAll)
router.get('/posicoes/:id', ensureAuthenticated, PosicoesController.getByIdValidation, PosicoesController.getById)

router.post('/clubes', ensureAuthenticated, ClubeController.createValidation, ClubeController.create)
router.delete('/clubes/:id', ensureAuthenticated, ClubeController.deleteByIdValidation, ClubeController.deleteById)
router.get('/usuario/:id/clubes',ensureAuthenticated, ClubeController.getAllByUserIdValidation, ClubeController.getAllByUserId)
router.get('/clubes/:id', ClubeController.getByIdValidation, ClubeController.getById)
router.put('/clubes/:id', ensureAuthenticated, ClubeController.updateByIdValidation, ClubeController.updateById)
router.get('/clubes/:id/jogadores', ensureAuthenticated, JogadoresController.getAllByClubIdValidation, JogadoresController.getAllByClubId)

router.post('/jogadores', ensureAuthenticated, JogadoresController.createValidation, JogadoresController.create)
router.get('/jogadores/:id', ensureAuthenticated, JogadoresController.getByIdValidation, JogadoresController.getById)
router.delete('/jogadores/:id', ensureAuthenticated, JogadoresController.deleteByIdValidation, JogadoresController.deleteById)
router.put('/jogadores/:id', ensureAuthenticated, JogadoresController.updateByIdValidation, JogadoresController.updateById)

router.post('/campeonatos', ensureAuthenticated, CampeonatoController.createValidation, CampeonatoController.create)
router.get('/campeonatos/:id', CampeonatoController.getByIdValidation, CampeonatoController.getById)
router.delete('/campeonatos/:id', ensureAuthenticated, CampeonatoController.deleteByIdValidation, CampeonatoController.deleteById)
router.put('/campeonatos/:id', ensureAuthenticated, CampeonatoController.updateByIdValidation, CampeonatoController.updateById)
router.get('/usuario/:id/campeonatos',ensureAuthenticated, CampeonatoController.getAllByUserIdValidation, CampeonatoController.getAllByUserId)

router.post('/clubes-campeonatos', ensureAuthenticated, ClubesCampeonatosController.createValidation, ClubesCampeonatosController.create);
router.get('/clubes-campeonatos/:id', ClubesCampeonatosController.getByIdValidation, ClubesCampeonatosController.getById)
router.delete('/clubes-campeonatos/:id', ensureAuthenticated, ClubesCampeonatosController.deleteByIdValidation, ClubesCampeonatosController.deleteById);
router.put('/clubes-campeonatos/:id', ensureAuthenticated, ClubesCampeonatosController.updateByIdValidation, ClubesCampeonatosController.updateById)
router.get('/campeonatos/:id/clubes', ClubesCampeonatosController.getAllByCampeonatoIdValidation, ClubesCampeonatosController.getAllByCampeonatoId)

router.post('/jogos', ensureAuthenticated, JogosController.createValidation, JogosController.create)
router.delete('/jogos/:id', ensureAuthenticated, JogosController.deleteByIdValidation, JogosController.deleteById)
router.get('/campeonatos/:id/jogos', JogosController.getAllByCampeonatoIdValidation, JogosController.getAllByCampeonatoId)
router.get('/jogos/:id', JogosController.getByIdValidation, JogosController.getById)
router.put('/jogos/:id', ensureAuthenticated, JogosController.updateByIdValidation, JogosController.updateById)

router.post('/jogadores-jogos', ensureAuthenticated, JogadoresJogosController.createValidation, JogadoresJogosController.create)
router.get('/jogadores-jogos/:id', ensureAuthenticated, JogadoresJogosController.getByIdValidation, JogadoresJogosController.getById)
router.delete('/jogadores-jogos/:id', ensureAuthenticated, JogadoresJogosController.deleteByIdValidation, JogadoresJogosController.deleteById)
router.put('/jogadores-jogos/:id', ensureAuthenticated, JogadoresJogosController.updateByIdValidation, JogadoresJogosController.updateById)
router.get('/jogadores/:id/jogos', ensureAuthenticated, JogadoresJogosController.getAllByJogadorIdValidation, JogadoresJogosController.getAllByJogadorId)

router.post('/treinadores', ensureAuthenticated, TreinadoresController.createValidation, TreinadoresController.create)
router.get('/treinadores/:id', ensureAuthenticated, TreinadoresController.getByIdValidation, TreinadoresController.getById)
router.delete('/treinadores/:id', ensureAuthenticated, TreinadoresController.deleteByIdValidation, TreinadoresController.deleteById)
router.put('/treinadores/:id', ensureAuthenticated, TreinadoresController.updateByIdValidation, TreinadoresController.updateById)
router.get('/clubes/:id/treinador', ensureAuthenticated, TreinadoresController.getAllByClubIdValidation, TreinadoresController.getAllByClubId)

router.post('/entrar', UsuariosController.signInValidation, UsuariosController.signIn)
router.post('/cadastrar', UsuariosController.signUpValidation, UsuariosController.signUp)
router.post('/forgot-password', UsuariosController.forgotPasswordInValidation, UsuariosController.forgotPassword)
router.post('/reset-password', UsuariosController.resetPasswordValidation, UsuariosController.resetPassword)

export { router }