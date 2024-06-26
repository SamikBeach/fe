import ReactFlow, {
  Controls,
  Edge,
  MiniMap,
  Node,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
} from 'reactflow';
import AuthorNode from './AuthorNode';
import { css } from 'styled-system/css';
import CustomEdge from './CustomEdge';
import { useQuery } from '@tanstack/react-query';
import { searchAuthors } from '@apis/author';
import { AuthorServerModel } from '@models/author';
import { useAtomValue } from 'jotai';
import {
  selectedEraIdAtom,
  selectedNationalityIdAtom,
  selectedRegionIdAtom,
} from '@atoms/filter';

const nodeTypes = { authorNode: AuthorNode };
const edgeTypes = { customEdge: CustomEdge };

export default function RelationDiagram() {
  const selectedNationalityId = useAtomValue(selectedNationalityIdAtom);
  const selectedEraId = useAtomValue(selectedEraIdAtom);
  const selectedRegionId = useAtomValue(selectedRegionIdAtom);

  const { data: authors = [] } = useQuery({
    queryKey: ['author'],
    queryFn: () =>
      searchAuthors({
        nationalityId: selectedNationalityId,
        eraId: selectedEraId,
        regionId: selectedRegionId,
      }),
    select: response => response.data,
  });

  const initialNodes =
    authors
      .map<Node<AuthorServerModel>>((author, index) => {
        const bornYear =
          author.born_date?.split('-')[0] === undefined
            ? 0
            : Number(author.born_date?.split('-')[0]);

        const bornCentury = Math.floor(Number(bornYear) / 100) + 1;

        const authorIndex = authors
          .filter(_author => {
            if (bornCentury < 17) {
              return (
                Math.floor(Number(_author.born_date?.split('-')[0]) / 100) +
                  1 ===
                bornCentury
              );
            }

            return (
              Math.floor(Number(_author.born_date?.split('-')[0]) / 10) * 10 ===
              Math.floor(bornYear / 10) * 10
            );
          })
          .findIndex(_author => _author.id === author.id);

        return {
          id: author.id.toString(),
          type: 'authorNode',
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
      })
      .slice(0, 60) ?? [];

  const initialEdges =
    authors
      .map<Edge>(author => ({
        id: `e${author.id}-2`,
        type: 'customEdge',
        source: author.id.toString(),
        target: Math.floor(Math.random() * 30).toString(),
        sourceHandle: 'bottom',
        animated: true,
      }))
      .slice(0, 60) ?? [];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  return (
    <ReactFlowProvider>
      <ReactFlow
        nodes={initialNodes}
        edges={initialEdges}
        // onNodesChange={onNodesChange}
        // onEdgesChange={onEdgesChange}
        fitView
        draggable={false}
        zoomOnScroll={false}
        panOnScroll
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        className={css({
          height: 'calc(100vh - 64px) !important',

          '& .react-flow__attribution': {
            display: 'none',
          },
        })}
      >
        <MiniMap nodeColor="gray" nodeStrokeWidth={3} zoomable pannable />
        {/* <Background variant={BackgroundVariant.Dots} /> */}
        <Controls showFitView showZoom showInteractive position="bottom-left" />
      </ReactFlow>
    </ReactFlowProvider>
  );
}
