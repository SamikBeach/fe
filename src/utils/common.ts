export function getTypeIdByType(type: 'author' | 'original-work' | 'edition') {
  switch (type) {
    case 'author':
      return 1;
    case 'original-work':
      return 2;
    case 'edition':
      return 3;
    default:
      return 1;
  }
}

export const getIsValidEmail = (string: string) => {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(string);
};
