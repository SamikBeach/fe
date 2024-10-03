import api from '@apis/config';
import base64 from 'base-64';

export function loginWithGoogle({ code }: { code: string }) {
  return api.post('/auth/login/google', { code });
}

export function logout() {
  return api.post('/auth/logout');
}

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

interface CheckEmailDuplicationRequest {
  email: string;
}

export function checkEmailDuplication({ email }: CheckEmailDuplicationRequest) {
  return api.post('/auth/check-email-duplication', { email });
}

interface SendEmailVerificationCodeRequest {
  email: string;
}

export function sendEmailVerificationCode({
  email,
}: SendEmailVerificationCodeRequest) {
  return api.post('/auth/send-email-verification-code', { email });
}

interface VerifyCodeRequest {
  email: string;
  verificationCode: number;
}

export function verifyCode({ email, verificationCode }: VerifyCodeRequest) {
  return api.post('/auth/verify-code', {
    email,
    verification_code: verificationCode,
  });
}

interface RegisterUserInfoRequest {
  email: string;
  nickname: string;
  password: string;
}

export function registerUserInfo({
  email,
  nickname,
  password,
}: RegisterUserInfoRequest) {
  return api.post('/auth/register-user-info', { email, nickname, password });
}
