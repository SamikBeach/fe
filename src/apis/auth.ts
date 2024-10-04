import api from '@apis/config';
import { UserServerModel } from '@models/user';
import base64 from 'base-64';

interface SignUpWithGoogleResponse {
  accessToken: string;
  refreshToken: string;
  user: UserServerModel;
}

export function signUpWithGoogle({ code }: { code: string }) {
  return api.post<SignUpWithGoogleResponse>('/auth/sign-up/google', { code });
}

interface LoginWithGoogleResponse {
  accessToken: string;
  refreshToken: string;
  user: UserServerModel;
}

export function loginWithGoogle({ code }: { code: string }) {
  return api.post<LoginWithGoogleResponse>('/auth/login/google', { code });
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
  user: UserServerModel;
}

export function loginEmail({ email, password }: LoginEmailRequest) {
  return api.post<LoginEmailResponse>(
    '/auth/login/email',
    { email },
    {
      headers: {
        Authorization: `Basic ${base64.encode(`${email}:${password}`)}`,
      },
    }
  );
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

interface VerifyCodeRequest {
  email: string;
  verificationCode: number;
}

interface VerifyCodeResponse {
  accessToken: string;
  refreshToken: string;
  user: UserServerModel;
}

export function verifyCode({ email, verificationCode }: VerifyCodeRequest) {
  return api.post<VerifyCodeResponse>('/auth/verify-code', {
    email,
    verification_code: verificationCode,
  });
}

export function verifyCodeAndLogin({
  email,
  verificationCode,
}: VerifyCodeRequest) {
  return api.post<VerifyCodeResponse>('/auth/verify-code-and-login', {
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
  return api.post(
    '/auth/register-user-info',
    { email, nickname },
    {
      headers: {
        Authorization: `Basic ${base64.encode(`${email}:${password}`)}`,
      },
    }
  );
}

interface UpdateUserInfoRequest {
  email: string;
  password?: string;
  nickname?: string;
  name?: string;
}

export function updateUserInfo({
  email,
  name,
  nickname,
  password,
}: UpdateUserInfoRequest) {
  return api.put(
    '/auth/update-user-info',
    { email, name, nickname, password },
    {
      ...(password && {
        headers: {
          Authorization: `Basic ${base64.encode(`${email}:${password}`)}`,
        },
      }),
    }
  );
}

export function sendPasswordResetEmail({ email }: { email: string }) {
  return api.post('/auth/send-password-reset-email', { email });
}
