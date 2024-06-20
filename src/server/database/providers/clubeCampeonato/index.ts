import * as create from './Create'
import * as deleteById from './DeleteById'
import * as getAllByCampeonatoId from './GetAllByCampeonatoId'
import * as updateById from './UpdateById'
import * as getById from './GetById'

export const ClubeCampeonatoProvider = {
    ...create,
    ...deleteById,
    ...getAllByCampeonatoId,
    ...updateById,
    ...getById
}