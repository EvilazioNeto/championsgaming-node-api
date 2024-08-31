import * as create from './Create'
import * as deleteById from './DeleteById'
import * as getAllByUserId  from './GetAllByUserId'
import * as getById from './GetById'
import * as updateById from './UpdateById'

export const CampeonatoProvider = {
    ...create,
    ...deleteById,
    ...getById,
    ...updateById,
    ...getAllByUserId
}