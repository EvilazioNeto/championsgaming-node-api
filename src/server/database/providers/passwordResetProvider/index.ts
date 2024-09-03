import * as create from './create';
import * as deleteById from './deleteById';
import * as getByToken from './getByToken'
import * as getActiveTokenByUserId from './getActiveTokenByUserId'

export const PasswordResetProvider = {
  ...deleteById,
  ...create,
  ...getByToken,
  ...getActiveTokenByUserId
};