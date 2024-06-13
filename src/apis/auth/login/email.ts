import base64 from 'base-64';
import api from 'src/apis/config';

export function loginEmail({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  return api.post(
    '/auth/login/email',
    { email, password },
    {
      headers: {
        Authorization: `Basic ${base64.encode(`${email}:${password}`)}`,
      },
    }
  );
}
