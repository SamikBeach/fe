import api from '@apis/config';
import { WritingServerModel } from '@models/writing';

type GetWritingByIdResponse = WritingServerModel;

export function getWritingById({ id }: { id: number }) {
  return api.get<GetWritingByIdResponse>(`/writing/${id}`);
}
