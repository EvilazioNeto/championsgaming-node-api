import * as create from './Create'
import * as deleteById from './DeleteById'
import * as getAllByUserId from './GetAllByUserId'
import * as count from './Count'
import * as getById from './getById'
import * as updateById from './updateById'

export const ClubeProvider = {
    ...create,
    ...deleteById,
    ...getAllByUserId,
    ...count,
    ...getById,
    ...updateById
}