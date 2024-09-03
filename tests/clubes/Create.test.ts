import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup"

describe('Clube - Create', () => {
    let accessToken = '';
    let usuarioId: number;

    const criarUsuarioEObterToken = async () => {
        const email = 'teste@gmail.com';
        const usuarioRes = await testServer.post('/cadastrar').send({
            nome: 'Teste',
            email,
            senha: '12345678'
        });
        
        const signInRes = await testServer.post('/entrar').send({ email, senha: '12345678' });
        accessToken = signInRes.body.accessToken;
        usuarioId = usuarioRes.body; 
    };

    beforeAll(async () => {
        await criarUsuarioEObterToken();
    });

    it('Criar clube com sucesso', async () => {
        const res = await testServer
            .post('/clubes')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({
                nome: "Benfica",
                mascote: "Águia",
                cor_principal: "Vermelho",
                cor_secundaria: "branco",
                usuarioId,
                fotoUrl: "https://firebasestorage.googleapis.com/v0/b/reactuploads-92499.appspot.com/o/users%2F1%2Ffiles%2FCampeonato_Brasileiro_de_Futebol_de_2022_-_S%C3%A9rie_A.png?alt=media&token=8e06489a-8a63-4499-803d-f5c6cbb2634b"
            });

        expect(res.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res.body).toEqual('number'); 
    });

    it('Tenta criar um clube com um atributo que não é permitido', async () => {
        const res = await testServer
            .post('/clubes')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({
                nome: "Benfica",
                mascote: "Águia",
                cor_principal: "Vermelho",
                cor_secundaria: "branco",
                usuarioId,
                fotoUrl: "https://firebasestorage.googleapis.com/v0/b/reactuploads-92499.appspot.com/o/users%2F1%2Ffiles%2FCampeonato_Brasileiro_de_Futebol_de_2022_-_S%C3%A9rie_A.png?alt=media&token=8e06489a-8a63-4499-803d-f5c6cbb2634b",
                treinador: "JJ" 
            });

        expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    });

    it('Tenta criar um clube sem o token de autenticação', async () => {
        const res = await testServer
            .post('/clubes')
            .send({
                nome: "Benfica",
                mascote: "Águia",
                cor_principal: "Vermelho",
                cor_secundaria: "branco", 
                usuarioId,
                fotoUrl: "https://firebasestorage.googleapis.com/v0/b/reactuploads-92499.appspot.com/o/users%2F1%2Ffiles%2FCampeonato_Brasileiro_de_Futebol_de_2022_-_S%C3%A9rie_A.png?alt=media&token=8e06489a-8a63-4499-803d-f5c6cbb2634b",
            });

        expect(res.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    });

    it('Tenta criar um clube com dados faltando', async () => {
        const res = await testServer
            .post('/clubes')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({
                mascote: "Águia",
                cor_principal: "Vermelho",
                cor_secundaria: "branco",
                usuarioId
                
            });

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    });
});
