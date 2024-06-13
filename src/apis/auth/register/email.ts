import api from 'src/apis/config';

export function registerEmail({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  return api.post('/auth/register/email', { email, password });
}
