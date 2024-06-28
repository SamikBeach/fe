import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  Edge,
  MiniMap,
  Node,
  Panel,
  ReactFlowProvider,
  useEdgesState,
  useNodes,
  useNodesInitialized,
  useNodesState,
  useOnSelectionChange,
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
import { Button } from '@radix-ui/themes';
import { useEffect } from 'react';

const nodeTypes = { authorNode: AuthorNode };
const edgeTypes = { customEdge: CustomEdge };

export default function RelationDiagram() {
  const selectedNationalityId = useAtomValue(selectedNationalityIdAtom);
  const selectedEraId = useAtomValue(selectedEraIdAtom);
  const selectedRegionId = useAtomValue(selectedRegionIdAtom);

  const {
    data: authors = [],
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: [
      'author',
      // selectedNationalityId,
      // selectedEraId,
      // selectedRegionId,
    ],
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
      }))
      .slice(0, 60) ?? [];

  // console.log({ initialNodes });
  // console.log({ initialEdges });

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  useEffect(() => {
    if (isSuccess) {
      setNodes(initialNodes);
      setEdges(initialEdges);
    }
  }, [isSuccess]);

  const getConnectedNodes = (nodeId: string) => {
    return edges
      .filter(edge => edge.source === nodeId)
      .map(edge => nodes.find(node => node.id === edge.target));
  };

  if (isLoading) {
    return 'loading...';
  }

  console.log({ nodes });

  return (
    <ReactFlowProvider>
      <Button
        className={css({
          position: 'absolute',
          top: 100,
          left: 100,
          zIndex: 3,
        })}
        // onClick={() =>
        // onNodesChange([{ id: '3', selected: true, type: 'select' }])
        // }
      >
        테스트 버튼
      </Button>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={(_, node) => {
          const connectedNodes = getConnectedNodes(node.id);

          // connectedNodes를 selected:true로
          setNodes(_nodes => {
            return nodes.map(_node => {
              if (
                connectedNodes.find(
                  connectedNode => connectedNode?.id === _node.id
                )
              ) {
                return { ..._node, selected: true };
              }

              return _node;
            });
          });
          console.log({ node, connectedNodes });
        }}
        // onSelectionChange={({ nodes, edges }) => {
        //   console.log('onSelectionChange');
        //   console.log({ nodes, edges });
        // }}
        // onKeyDown={e => {
        //   if (e.key === 'Escape') {
        //     e.preventDefault();
        //   }
        // }}
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
        {/* <Background id="1" style={{ backgroundColor: 'blue' }} /> */}
        <Controls showFitView showZoom showInteractive position="bottom-left" />
      </ReactFlow>
    </ReactFlowProvider>
  );
}
