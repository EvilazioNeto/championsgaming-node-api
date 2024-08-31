import * as create from './create';
import * as getById from './getById';
import * as getAllByClubId from './getAllByClubId';
import * as deleteById from './deleteById';
import * as updateById from './updateById';


export const TreinadoresController = {
    ...create,
    ...getById,
    ...getAllByClubId,
    ...deleteById,
    ...updateById
}