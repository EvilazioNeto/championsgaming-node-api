import * as create from './Create'
import * as deleteById from './DeleteById'
import * as getAllByCampeonatoId from './GetAllByCampeonatoId'
import * as updateById from './UpdateById'
import * as getById from './GetById'
import * as updateByIdById from './UpdateById'

export const ClubeCampeonatoProvider = {
    ...create,
    ...deleteById,
    ...getAllByCampeonatoId,
    ...updateById,
    ...getById,
    ...updateById
}