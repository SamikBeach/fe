import { AuthorServerModel } from '@models/author';
import { OriginalWorkServerModel } from '@models/original-work';

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
  original_works: [],
};
export const MOCK_AUTHOR2: AuthorServerModel = {
  id: 2,
  name: 'Immanuel Kant',
  name_in_kor: '임마누엘 칸트',
  born_date: '1844-10-15',
  born_date_is_bc: null,
  died_date: '1900-08-25',
  died_date_is_bc: null,
  image_url:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Immanuel_Kant_-_Gemaelde_1.jpg/440px-Immanuel_Kant_-_Gemaelde_1.jpg',
  original_works: [],
};
export const MOCK_AUTHOR3: AuthorServerModel = {
  id: 3,
  name: 'Ludwig Wittgenstein',
  name_in_kor: '루드비히 비트겐슈타인',
  born_date: '1844-10-15',
  born_date_is_bc: null,
  died_date: '1900-08-25',
  died_date_is_bc: null,
  image_url:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Ludwig_Wittgenstein_1929.jpg/220px-Ludwig_Wittgenstein_1929.jpg',
  original_works: [],
};
export const MOCK_AUTHOR4: AuthorServerModel = {
  id: 4,
  name: 'Arthur Schopenhauer',
  name_in_kor: '아르투어 쇼펜하우어',
  born_date: '1844-10-15',
  born_date_is_bc: null,
  died_date: '1900-08-25',
  died_date_is_bc: null,
  image_url:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Arthur_Schopenhauer_by_J_Sch%C3%A4fer%2C_1859b.jpg/220px-Arthur_Schopenhauer_by_J_Sch%C3%A4fer%2C_1859b.jpg',
  original_works: [],
};
export const MOCK_AUTHOR5: AuthorServerModel = {
  id: 1,
  name: 'Plato',
  name_in_kor: '플라톤',
  born_date: '1844-10-15',
  born_date_is_bc: null,
  died_date: '1900-08-25',
  died_date_is_bc: null,
  image_url:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Plato_Silanion_Musei_Capitolini_MC1377.jpg/220px-Plato_Silanion_Musei_Capitolini_MC1377.jpg',
  original_works: [],
};

export const MOCK_ORIGINAL_WORK1: OriginalWorkServerModel = {
  id: 1,
  author_id: 1,
  title: 'Der Wille zur Macht',
  title_in_kor: '차라투스트라는 이렇게 말했다',
  title_in_eng: 'The Will to Power',
  publication_date: '1999',
  publication_date_is_bc: null,
  author: MOCK_AUTHOR,
};
export const MOCK_ORIGINAL_WORK2: OriginalWorkServerModel = {
  id: 2,
  author_id: 1,
  title: 'Physische Geographie',
  title_in_kor: '차라투스트라는 이렇게 말했다',
  title_in_eng: 'Physical Geography',
  publication_date: '1999',
  publication_date_is_bc: null,
  author: MOCK_AUTHOR,
};
export const MOCK_ORIGINAL_WORK3: OriginalWorkServerModel = {
  id: 3,
  author_id: 1,
  title: 'Philosophische Untersuchungen',
  title_in_kor: 'Philosophical Investigations',
  title_in_eng: 'Also spoke zarathustra',
  publication_date: '1999',
  publication_date_is_bc: null,
  author: MOCK_AUTHOR,
};
export const MOCK_ORIGINAL_WORK4: OriginalWorkServerModel = {
  id: 4,
  author_id: 1,
  title: 'Νόμοι',
  title_in_kor: 'Laws',
  title_in_eng: 'Laws',
  publication_date: '1999',
  publication_date_is_bc: null,
  author: MOCK_AUTHOR,
};
export const MOCK_ORIGINAL_WORK5: OriginalWorkServerModel = {
  id: 5,
  author_id: 1,
  title: 'Séminaire: La bête et le souverain',
  title_in_kor: '차라투스트라는 이렇게 말했다',
  title_in_eng: 'The Beast and the Sovereign',
  publication_date: '1999',
  publication_date_is_bc: null,
  author: MOCK_AUTHOR,
};

export const MOCK_FEEDS = [
  {
    id: 1,
    username: 'Bonggeun Jeong',
    type: 'comment' as const,
    target: 'author' as const,
    comment: 'sadlfjlkajdslkfjlkajlfjalk',
  },
];
