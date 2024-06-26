import { PasswordCrypto } from "../../../shared/services";
import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IUsuario } from "../../models/Usuario";

export const create = async (usuario: Omit<IUsuario, 'id'>): Promise<number | Error> => {
    try {
        const existingUser = await Knex(ETableNames.usuario)
            .select('id')
            .where('email', usuario.email)
            .first();

        if (existingUser) {
            return new Error('Email já cadastrado');
        }

        const hashedPassword = await PasswordCrypto.hashPassword(usuario.senha);

        const [result] = await Knex(ETableNames.usuario).insert({ ...usuario, senha: hashedPassword }).returning('id');

        if (typeof result === 'object') {
            return result.id
        } else if (typeof result === 'number') {
            return result;
        }

        return new Error('Erro ao cadastrar o registro')
    } catch (error) {
        console.log(error)
        return new Error('Erro ao cadastrar o registro')
    }
}