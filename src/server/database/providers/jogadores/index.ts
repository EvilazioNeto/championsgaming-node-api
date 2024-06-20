import * as create from './Create'
import * as getById from './GetById'
import * as deleteById from './DeleteById'
import * as updateById from './UpdateById'
import * as getAllByClubId from './getAllByClubId'

export const JogadoresProvider = {
    ...create,
    ...getById,
    ...deleteById,
    ...updateById,
    ...getAllByClubId
}