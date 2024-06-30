import { AuthorServerModel } from '@models/author';

export const MOCK_AUTHOR: AuthorServerModel = {
  id: 1,
  name: 'Friedrich Nietzsche',
  name_in_kor: '프리드리히 니체',
  born_date: '1844-10-15',
  born_date_is_bc: null,
  died_date: '1900-08-25',
  died_date_is_bc: null,
  image_url:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Nietzsche187a.jpg/472px-Nietzsche187a.jpg',
  influenceds: [],
  influenced_bys: [],
  writings: [],
  books: [],
};
