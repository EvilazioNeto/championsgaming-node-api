import * as getAll from './GetAll';
import * as getById from './GetById'

export const PosicoesProvider = {
  ...getAll,
  ...getById,
};