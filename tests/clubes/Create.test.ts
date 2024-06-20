import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup"

describe('Clube - Create', () => {
    it('Criar clube com sucesso', async () => {
        const email = 'teste@gmail.com';
        const usuario = await testServer.post('/cadastrar').send({
            nome: 'Teste',
            email,
            senha: '12345678'
        })

        const signInRes = await testServer.post('/entrar').send({ email, senha: '12345678' })

        const res = await testServer
            .post('/clubes')
            .set({ Authorization: `Bearer ${signInRes.body.accessToken}` })
            .send({
                nome: "Benfica",
                mascote: "Águia",
                cor_principal: "Vermelho",
                cor_secundaria: "branco",
                usuarioId: usuario.body
            })

        expect(res.statusCode).toEqual(StatusCodes.CREATED)
        expect(typeof res.body).toEqual('number');
    })

    it('Tenta criar um clube com um atributo que não é permitido', async () => {
        const email = 'teste@gmail.com';
        const usuario = await testServer.post('/cadastrar').send({
            nome: 'Teste',
            email,
            senha: '12345678'
        })

        const signInRes = await testServer.post('/entrar').send({ email, senha: '12345678' })

        const res = await testServer
            .post('/clubes')
            .set({ Authorization: `Bearer ${signInRes.body.accessToken}` })
            .send({
                nome: "Benfica",
                mascote: "Águia",
                cor_principal: "Vermelho",
                cor_secundaria: "branco",
                usuarioId: usuario.body,
                treinador: "JJ"
            })

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST)
    })

    it('Tenta criar um clube sem o token de autenticação', async () => {
        const email = 'teste@gmail.com';
        await testServer.post('/cadastrar').send({
            nome: 'Teste',
            email,
            senha: '12345678'
        })

        const res = await testServer
            .post('/clubes')
            .send({
                nome: "Benfica",
                mascote: "Águia",
                cor_principal: "Vermelho",
                cor_secundaria: "branco"
            })

        expect(res.statusCode).toEqual(StatusCodes.UNAUTHORIZED)
    })

    it('Tenta criar um clube com dados faltando', async () => {
        const email = 'teste@gmail.com';
        const usuario = await testServer.post('/cadastrar').send({
            nome: 'Teste',
            email,
            senha: '12345678'
        })

        const signInRes = await testServer.post('/entrar').send({ email, senha: '12345678' })

        const res = await testServer
            .post('/clubes')
            .set({ Authorization: `Bearer ${signInRes.body.accessToken}` })
            .send({
                mascote: "Águia",
                cor_principal: "Vermelho",
                cor_secundaria: "branco",
                usuarioId: usuario.body
            })

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST)
    })
})
