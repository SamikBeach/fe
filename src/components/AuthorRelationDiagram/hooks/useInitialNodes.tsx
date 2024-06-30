import { AuthorServerModel } from '@models/author';
import { useMemo } from 'react';
import { Node } from 'reactflow';

interface Params {
  authors: AuthorServerModel[];
}

export default function useInitialNodes({ authors = [] }: Params) {
  const initialNodes = useMemo(() => {
    return (
      authors
        .filter(
          author =>
            author.influenceds !== undefined &&
            author.influenced_bys !== undefined &&
            (author.influenceds.length > 0 || author.influenced_bys.length > 0)
        )
        .map<Node<AuthorServerModel>>(author => {
          const bornYear =
            author.born_date?.split('-')[0] === undefined
              ? 0
              : Number(author.born_date?.split('-')[0]);

          const bornCentury = Math.floor(Number(bornYear) / 100) + 1;

          const authorIndex = authors
            .filter(
              _author =>
                _author.influenceds !== undefined &&
                _author.influenced_bys !== undefined &&
                (_author.influenceds.length > 0 ||
                  _author.influenced_bys.length > 0)
            )
            .filter(_author => {
              if (bornCentury < 17) {
                return (
                  Math.floor(Number(_author.born_date?.split('-')[0]) / 100) +
                    1 ===
                  bornCentury
                );
              }

              return (
                Math.floor(Number(_author.born_date?.split('-')[0]) / 10) *
                  10 ===
                Math.floor(bornYear / 10) * 10
              );
            })
            .findIndex(_author => _author.id === author.id);

          return {
            id: author.id.toString(),
            type: 'authorNode',
            draggable: false,
            position: {
              x: authorIndex * 250,
              y:
                bornCentury < 17
                  ? bornCentury * 100
                  : 1600 + (Math.floor(bornYear / 10) * 10 - 1600) * 10,
            },
            data: {
              label: author.id.toString(),

              ...author,
            },
          };
        }) ?? []
    );
  }, [authors]);

  return initialNodes;
}
