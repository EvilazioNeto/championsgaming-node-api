import * as create from './Create'
import * as getById from './GetById'
import * as deleteById from './DeleteById'
import * as updateById from './UpdateById'
import * as getAllByJogadorId from './GetAllByJogadorId'

export const JogadorJogoProvider = {
    ...create,
    ...getById,
    ...deleteById,
    ...updateById,
    ...getAllByJogadorId
}