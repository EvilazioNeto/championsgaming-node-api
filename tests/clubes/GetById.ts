import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe('Clube - GetById', () =>{
    it('Recuperar clube por id', async () => {
        const email = 'teste@gmail.com';
        const usuario = await testServer.post('/cadastrar').send({
            nome: 'Teste',
            email,
            senha: '12345678'
        })

        const signInRes = await testServer.post('/entrar').send({ email, senha: '12345678' })

        const createRes = await testServer
        .post('/clubes')
        .set({ Authorization: `Bearer ${signInRes.body.accessToken}` })
        .send({
            nome: "Benfica",
            mascote: "Águia",
            cor_principal: "Vermelho",
            cor_secundaria: "branco",
            usuarioId: usuario.body
        })

        const res = await testServer
            .get(`/clubes/${createRes}`)
            .set({ Authorization: `Bearer ${signInRes.body.accessToken}` })

        expect(res.statusCode).toEqual(StatusCodes.OK)
        expect(typeof res.body).toEqual('number')
    })
})