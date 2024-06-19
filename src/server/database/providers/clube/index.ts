import * as create from './Create'
import * as deleteById from './DeleteById'
import * as getAll from './GetAll'
import * as count from './Count'
import * as getById from './getById'
import * as updateById from './updateById'

export const ClubeProvider = {
    ...create,
    ...deleteById,
    ...getAll,
    ...count,
    ...getById,
    ...updateById
}