import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup"

describe('Posição - GetAll', () => {
    let accessToken = '';
    beforeAll(async () => {
        const email = 'teste@gmail.com';
        await testServer.post('/cadastrar').send({
            nome: 'Teste',
            email,
            senha: '12345678'
        })
        const signInRes = await testServer.post('/entrar').send({ email, senha: '12345678' })

        accessToken = signInRes.body.accessToken;
    });

    it('Recuperar todas as posições', async () => {
        const res = await testServer
            .get('/posicoes')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send()

        expect(res.statusCode).toEqual(StatusCodes.OK);
        expect(res.body.length).toBeGreaterThan(0);
    })
})