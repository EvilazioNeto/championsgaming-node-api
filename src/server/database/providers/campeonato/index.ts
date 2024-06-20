import * as create from './Create'
import * as deleteById from './DeleteById'
import * as getById from './GetById'
import * as updateById from './UpdateById'
import * as getAllByUserId from './getAllByUserId'

export const CampeonatoProvider = {
    ...create,
    ...deleteById,
    ...getById,
    ...updateById,
    ...getAllByUserId
}