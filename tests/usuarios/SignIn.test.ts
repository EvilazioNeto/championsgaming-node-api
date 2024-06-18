import { StatusCodes } from "http-status-codes"
import { testServer } from "../jest.setup"

describe('Usuario - SignIn', () => {
    it('SignIn com sucesso', async () => {
        const cadastrarRes = await testServer
            .post('/cadastrar')
            .send({
                email: "teste@gmail.com",
                senha: "12345678",
                nome: "teste"
            })

        expect(cadastrarRes.statusCode).toEqual(StatusCodes.CREATED)

        const res = await testServer
            .post('/entrar')
            .send({
                email: "teste@gmail.com",
                senha: "12345678"
            })

        expect(res.statusCode).toEqual(StatusCodes.OK);
        expect(res.body).toHaveProperty('accessToken')
    });
    it('Não pode fazer login com email inválido', async () => {
        const res = await testServer
            .post('/entrar')
            .send({
                email: "evilaziogmailcom",
                senha: "12345678"
            })

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res.body).toHaveProperty('errors.body.email')
    });
    it('Não pode fazer login com email muito curto', async () => {
        const res = await testServer
            .post('/entrar')
            .send({
                email: "e@",
                senha: "12345678"
            })

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res.body).toHaveProperty('errors.body.email')
    });
    it('Não pode fazer login sem email', async () => {
        const res = await testServer
            .post('/entrar')
            .send({
                senha: "12345678"
            })

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res.body).toHaveProperty('errors.body.email')
    });
    it('Não pode fazer login com uma senha muito curta', async () => {
        const res = await testServer
            .post('/entrar')
            .send({
                email: "evilazio@gmail.com",
                senha: "12345"
            })

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res.body).toHaveProperty('errors.body.senha')
    });
    it('Não pode fazer login sem uma senha', async () => {
        const res = await testServer
            .post('/entrar')
            .send({
                email: "evilazio@gmail.com",
            })

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res.body).toHaveProperty('errors.body.senha')
    });
    it('Senha errada', async () => {
        const cadastrarRes = await testServer
            .post('/cadastrar')
            .send({
                email: "maria@gmail.com",
                senha: "12345678",
                nome: "maria"
            })

        expect(cadastrarRes.statusCode).toEqual(StatusCodes.CREATED)

        const res1 = await testServer
            .post('/entrar')
            .send({
                email: 'maria@gmail.com',
                senha: '12345678910'
            });
        expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(res1.body).toHaveProperty('errors.default');
    });
    it('Email errado', async () => {
        const cadastrarRes = await testServer
            .post('/cadastrar')
            .send({
                email: "pedro@gmail.com",
                senha: "12345678",
                nome: "Pedro"
            })

        expect(cadastrarRes.statusCode).toEqual(StatusCodes.CREATED)

        const res1 = await testServer
            .post('/entrar')
            .send({
                senha: '12345678',
                email: 'p@gmail.com',
            });
        expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(res1.body).toHaveProperty('errors.default');
    });
})