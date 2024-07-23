import { AuthorServerModel } from '@models/author';
import { useMemo } from 'react';
import { Node } from 'reactflow';

interface Params {
  authors: AuthorServerModel[];
}

export default function useInitialNodes({ authors = [] }: Params) {
  const initialNodes = useMemo<Node<AuthorServerModel>[]>(() => {
    return authors.reduce<Node<AuthorServerModel>[]>((acc, author) => {
      if (author.born_date?.split('-')[0] === undefined) {
        return acc;
      }

      const bornYear = Number(author.born_date.split('-')[0]);

      const bornCentury = Math.floor(Number(bornYear) / 100) + 1;

      const authorIndex = authors
        .filter(
          _author =>
            Math.floor(Number(_author.born_date?.split('-')[0]) / 100) + 1 ===
            bornCentury
        )
        .findIndex(_author => _author.id === author.id);

      if (authorIndex > 1) {
        return acc;
      }

      return [
        ...acc,
        {
          id: author.id.toString(),
          type: 'authorNode',
          draggable: false,
          position: {
            x: authorIndex * 250,
            y: bornCentury * 100,
          },
          data: {
            label: author.id.toString(),
            ...author,
          },
        },
      ];
    }, []);
  }, [authors]);

  return initialNodes;
}
