import * as create from './Create';
import * as deleteById from './DeleteById';
import * as getAll from './GetAll';
import * as getById from './getById';
import * as updateById from './updateById';

export const ClubeController = {
    ...create,
    ...deleteById,
    ...getAll,
    ...getById,
    ...updateById
}