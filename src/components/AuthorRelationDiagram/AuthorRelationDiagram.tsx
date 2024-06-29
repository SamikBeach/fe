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
import { memo, useCallback, useEffect, useMemo } from 'react';
import PlusButtonNode from './PlusButtonNode';

const nodeTypes = { authorNode: AuthorNode, plusButtonNode: PlusButtonNode };
const edgeTypes = { customEdge: CustomEdge };

function RelationDiagram() {
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

  const initialNodes = useMemo(() => {
    return (
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
                Math.floor(Number(_author.born_date?.split('-')[0]) / 10) *
                  10 ===
                Math.floor(bornYear / 10) * 10
              );
            })
            .findIndex(_author => _author.id === author.id);

          // if (authorIndex > 0) {
          //   return null;
          // }

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
        })
        .filter(
          author =>
            author.data.influenced.length > 0 ||
            author.data.influenced_by.length > 0
        ) ?? []
    );
  }, [authors]);

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

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  useEffect(() => {
    if (isSuccess) {
      setNodes(initialNodes);
      setEdges(initialEdges);
      console.log('effect');
    }
  }, [isSuccess, setNodes, setEdges, initialNodes, initialEdges]);

  const getConnectedNodes = useCallback(
    (nodeId: string) => {
      return edges
        .filter(edge => edge.source === nodeId)
        .map(edge => nodes.find(node => node.id === edge.target));
    },
    [edges, nodes]
  );

  const handleNodeClick = useCallback(
    (
      _: React.MouseEvent<Element, MouseEvent>,
      node: Node<AuthorServerModel, string | undefined>
    ) => {
      const influencedAuthorIds = node.data.influenced.map(
        influenced => influenced.id
      );
      const influencedByAuthorIds = node.data.influenced_by.map(
        influenced => influenced.id
      );

      setNodes(_nodes => {
        const newNodes = _nodes.map(_node => {
          if (
            [...influencedAuthorIds, ...influencedByAuthorIds].includes(
              Number(_node.id)
            )
          ) {
            return {
              ..._node,
              selected: true,
            };
          }

          return _node;
        });

        return newNodes;
      });

      const influencedEges = influencedAuthorIds.map(id => ({
        id: `${node.id}-${String(id)}`,
        source: node.id,
        target: String(id),
        sourceHandle: 'bottom',
        type: 'customEdge',
        animated: true,
      }));

      const influencedByEdges = influencedByAuthorIds.map<Edge>(id => ({
        id: `${String(id)}-${node.id}}`,
        source: String(id),
        target: node.id,
        sourceHandle: 'top',
        type: 'customEdge',
        animated: true,
      }));

      setEdges([...influencedEges, ...influencedByEdges]);
    },
    [setEdges, setNodes]
  );

  if (isLoading) {
    return 'loading...';
  }

  console.log('rerender');

  return (
    <>
      <Button
        className={css({
          position: 'absolute',
          top: 100,
          left: 100,
          zIndex: 3,
        })}
      >
        테스트 버튼
      </Button>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={handleNodeClick}
        onPaneClick={() => {
          if (edges.length > 0) {
            setEdges([]);
          }
        }}
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
        <MiniMap
          nodeColor={node => (node.selected ? 'red' : 'gray')}
          nodeStrokeWidth={3}
          zoomable
          pannable
        />
        {/* <Background id="1" style={{ backgroundColor: 'blue' }} /> */}
        <Controls showFitView showZoom showInteractive position="bottom-left" />
      </ReactFlow>
    </>
  );
}

export default function AuthorRelationDiagram() {
  return (
    // <ReactFlowProvider>
    <RelationDiagram />
    // </ReactFlowProvider>
  );
}
