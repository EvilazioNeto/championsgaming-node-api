import * as create from './Create'
import * as deleteById from './DeleteById'
import * as getById from './GetById'
import * as updateById from './UpdateById'
import * as getAllByJogadorId from './GetAllByJogadorId'

export const JogadoresJogosController = {
    ...create,
    ...deleteById,
    ...getById,
    ...updateById,
    ...getAllByJogadorId
}