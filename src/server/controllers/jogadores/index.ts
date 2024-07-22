import * as create from './Create';
import * as getById from './GetById';
import * as getAllByClubId from './GetAllByClubId';
import * as deleteById from './DeleteById';
import * as updateById from './UpdateById';

export const JogadoresController = {
    ...create,
    ...getById,
    ...getAllByClubId,
    ...deleteById,
    ...updateById
}