import api from '@apis/config';
import { WritingServerModel } from '@models/writing';

type GetWritingResponse = WritingServerModel;

export function getWritingById({ id }: { id: number }) {
  return api.get<GetWritingResponse>(`/writing/${id}`);
}
