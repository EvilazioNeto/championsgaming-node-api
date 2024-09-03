import * as signIn from './SignIn';
import * as signUp from './SignUp';
import * as forgotPassword from './ForgotPassword';
import * as resetPassword from './resetPassword'

export const UsuariosController = {
  ...signIn,
  ...signUp,
  ...forgotPassword,
  ...resetPassword
};