import { AuthorServerModel } from 'legacy_src/models/author';
import { useMemo } from 'react';
import { Edge } from 'reactflow';

interface Params {
  authors: AuthorServerModel[];
}

export default function useInitialEdges({ authors = [] }: Params) {
  const initialEdges = useMemo(() => {
    return [];
    return (
      authors
        .map<Edge>(author => ({
          id: `${author.id}-2`,
          type: 'customEdge',
          source: author.id.toString(),
          target: Math.floor(Math.random() * 30).toString(),
          sourceHandle: 'bottom',
        }))
        .slice(0, 200) ?? []
    );
  }, [authors]);

  return initialEdges;
}
