import api from '@apis/config';

export function getNewAccessToken() {
  return api.post('/auth/token/access');
}
