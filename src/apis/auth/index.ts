import api from '@apis/config';
import base64 from 'base-64';

interface LoginEmailRequest {
  email: string;
  password: string;
}

interface LoginEmailResponse {
  accessToken: string;
  refreshToken: string;
}

export function loginEmail({ email, password }: LoginEmailRequest) {
  return api.post<LoginEmailResponse>(
    '/auth/login/email',
    { email, password },
    {
      headers: {
        Authorization: `Basic ${base64.encode(`${email}:${password}`)}`,
      },
    }
  );
}

interface RegisterEmailResponse {
  accessToken: string;
  refreshToken: string;
}

export function registerEmail({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  return api.post<RegisterEmailResponse>('/auth/register/email', {
    email,
    password,
  });
}

interface GetNewAccessTokenResponse {
  accessToken: string;
}

export function getNewAccessToken() {
  return api.post<GetNewAccessTokenResponse>('/auth/token/access');
}

interface GetNewRefreshTokenResponse {
  refreshToken: string;
}

export function getNewRefreshToken() {
  return api.post<GetNewRefreshTokenResponse>('/auth/token/refresh');
}
