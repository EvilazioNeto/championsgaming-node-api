import * as create from './Create'
import * as deleteById from './DeleteById'
import * as getAllByCampeonatoId from './GetAllByCampeonatoId'
import * as getById from './GetById'
import * as updateById from './UpdateById'

export const JogosProvider = {
    ...create,
    ...deleteById,
    ...getAllByCampeonatoId,
    ...getById,
    ...updateById
}