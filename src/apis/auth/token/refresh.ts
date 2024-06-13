import api from '@apis/config';

export function getNewRefreshToken() {
  return api.post('/auth/token/refresh');
}
