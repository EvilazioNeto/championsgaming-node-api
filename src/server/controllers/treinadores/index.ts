import * as create from './create';
import * as getById from './getById';
import * as getAllByCoachId from './getAllByCoachId';
import * as deleteById from './deleteById';
import * as updateById from './updateById';


export const TreinadoresController = {
    ...create,
    ...getById,
    ...getAllByCoachId,
    ...deleteById,
    ...updateById
}