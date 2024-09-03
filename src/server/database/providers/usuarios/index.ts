import * as getByEmail from './GetByEmail';
import * as create from './Create';
import * as updateById from './updateById';
import * as getById from './getById';

export const UsuariosProvider = {
  ...getByEmail,
  ...create,
  ...updateById,
  ...getById
};