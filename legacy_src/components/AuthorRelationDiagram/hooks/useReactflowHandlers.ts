import { AuthorServerModel } from 'legacy_src/models/author';
import { Dispatch, SetStateAction, useCallback } from 'react';
import { Edge, Node, useReactFlow } from 'reactflow';

interface Params {
  setEdges: Dispatch<SetStateAction<Edge<any>[]>>;
  setNodes: Dispatch<
    SetStateAction<Node<AuthorServerModel, string | undefined>[]>
  >;
  nodes: Node<AuthorServerModel>[];
  initialNodes: Node<AuthorServerModel>[];
  edges: Edge[];
  initialEdges: Edge[];
}

export default function useReactflowHandlers({
  setEdges,
  setNodes,
  nodes,
  initialNodes,
  edges,
  initialEdges,
}: Params) {
  const reactflow = useReactFlow();

  const handleNodeClick = useCallback(
    (
      _: React.MouseEvent<Element, MouseEvent>,
      node: Node<AuthorServerModel, string | undefined>
    ) => {
      const influencedAuthorIds = (node.data.influenceds ?? []).map(
        influenced => influenced.id
      );
      const influencedByAuthorIds = (node.data.influenced_bys ?? []).map(
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

  const handlePaneClick = useCallback(() => {
    setEdges([]);
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
  }, [setEdges, setNodes, nodes]);

  return {
    handleNodeClick,
    showOnlySelectedNodes,
    showAllNodes,
    handleFilterValueChange,
    handlePaneClick,
  };
}
