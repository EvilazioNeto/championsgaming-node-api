import * as create from './Create'
import * as getById from './GetById'
import * as deleteById from './DeleteById'
import * as updateById from './UpdateById'
import * as getAllByUserId from './GetAllByUserId'

export const CampeonatoController = {
    ...create,
    ...getById,
    ...deleteById,
    ...updateById,
    ...getAllByUserId
}