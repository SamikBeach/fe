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
  useReactFlow,
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
import { AuthorFilterBox } from '@components/AuthorFilterBox';

const nodeTypes = { authorNode: AuthorNode, plusButtonNode: PlusButtonNode };
const edgeTypes = { customEdge: CustomEdge };

function RelationDiagram() {
  const reactflow = useReactFlow();

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
        .filter(
          author =>
            author.influenced.length > 0 || author.influenced_by.length > 0
        )
        .map<Node<AuthorServerModel>>((author, index) => {
          const bornYear =
            author.born_date?.split('-')[0] === undefined
              ? 0
              : Number(author.born_date?.split('-')[0]);

          const bornCentury = Math.floor(Number(bornYear) / 100) + 1;

          const authorIndex = authors
            .filter(
              _author =>
                _author.influenced.length > 0 ||
                _author.influenced_by.length > 0
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
        }) ?? []
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
          if (influencedAuthorIds.includes(Number(_node.id))) {
            return {
              ..._node,
              data: {
                ..._node.data,
                activeInfluenced: true,
              },
            };
          }

          if (influencedByAuthorIds.includes(Number(_node.id))) {
            return {
              ..._node,
              data: {
                ..._node.data,
                activeInfluencedBy: true,
              },
            };
          }

          return {
            ..._node,
            data: {
              ..._node.data,
              activeInfluenced: false,
              activeInfluencedBy: false,
            },
          };
        });

        return newNodes;
      });

      const influencedEdges = influencedAuthorIds.map(id => ({
        id: `${node.id}-${String(id)}`,
        source: node.id,
        target: String(id),
        sourceHandle: 'bottom',
        type: 'customEdge',
        style: { stroke: 'blue' },
        animated: true,
      }));

      const influencedByEdges = influencedByAuthorIds.map<Edge>(id => ({
        id: `${String(id)}-${node.id}}`,
        source: String(id),
        target: node.id,
        sourceHandle: 'top',
        type: 'customEdge',
        style: { stroke: 'red' },
        animated: true,
      }));

      setEdges([...influencedEdges, ...influencedByEdges]);
    },
    [setEdges, setNodes]
  );

  const showOnlySelectedNodes = useCallback(() => {
    setNodes(_nodes => {
      if (
        !_nodes.find(node => node.selected) &&
        !_nodes.find(node => node.data.activeFiltered)
      ) {
        return _nodes;
      }

      return _nodes
        .filter(node => {
          return (
            node.selected ||
            node.data.activeInfluenced ||
            node.data.activeInfluencedBy ||
            node.data.activeFiltered
          );
        })
        .map(node => {
          if (node.selected) {
            return node;
          }

          const selectedNode = _nodes.find(_node => _node.selected);

          if (selectedNode === undefined) {
            return node;
          }

          if (node.data.activeInfluenced) {
            const positionX =
              _nodes
                .filter(_node => _node.data.activeInfluenced)
                .findIndex(_node => _node.id === node.id) * 250;

            return {
              ...node,
              position: {
                x: positionX,
                y: selectedNode.position.y + 100,
              },
            };
          }

          if (node.data.activeInfluencedBy) {
            const positionX =
              _nodes
                .filter(_node => _node.data.activeInfluencedBy)
                .findIndex(_node => _node.id === node.id) * 250;

            return {
              ...node,
              position: {
                x: positionX,
                y: selectedNode.position.y - 100,
              },
            };
          }

          return node;
        });
    });

    setTimeout(() => {
      reactflow.fitView({
        nodes: nodes.filter(
          node =>
            node.selected ||
            node.data.activeInfluenced ||
            node.data.activeInfluencedBy ||
            node.data.activeFiltered
        ),
        duration: 300,
      });
    }, 0);
  }, [setNodes, reactflow, nodes]);

  const showAllNodes = useCallback(() => {
    setNodes(_nodes => {
      return initialNodes.map(initialNode => {
        const node = nodes.find(_node => _node.id === initialNode.id);
        if (node !== undefined) {
          return { ...node, position: initialNode.position };
        }

        return initialNode;
      });
    });
  }, [setNodes, initialNodes, nodes]);

  const handleFilterValueChange = useCallback(
    (value: string) => {
      setNodes(_nodes => {
        return _nodes.map(node => {
          if (node.data?.nationality?.id === Number(value)) {
            return {
              ...node,
              data: {
                ...node.data,
                activeFiltered: true,
              },
            };
          }
          return { ...node, data: { ...node.data, activeFiltered: false } };
        });
      });
    },
    [setNodes]
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
        onClick={showOnlySelectedNodes}
      >
        선택된 노드만 보기
      </Button>
      <Button
        className={css({
          position: 'absolute',
          top: 140,
          left: 100,
          zIndex: 3,
        })}
        onClick={showAllNodes}
      >
        전체 보기
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

          setNodes(
            nodes.map(node => ({
              ...node,
              data: {
                ...node.data,
                activeInfluenced: false,
                activeInfluencedBy: false,
              },
            }))
          );
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
        <AuthorFilterBox onValueChange={handleFilterValueChange} />
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
    <ReactFlowProvider>
      <RelationDiagram />
    </ReactFlowProvider>
  );
}
