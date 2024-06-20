import * as create from './Create'
import * as deleteById from './DeleteById'
import * as getById from './GetById'
import * as updateById from './UpdateById'
import * as getAllByCampeonatoId from './GetAllByCampeonatoId'

export const ClubesCampeonatosController = {
    ...create,
    ...deleteById,
    ...getById,
    ...updateById,
    ...getAllByCampeonatoId
}