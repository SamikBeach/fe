import ReactFlow, {
  Controls,
  MiniMap,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
} from 'reactflow';
import { css } from 'styled-system/css';
import { useQuery } from '@tanstack/react-query';
import { searchAuthors } from '@apis/author';
import { useAtomValue } from 'jotai';
import { filterAtom } from '@atoms/filter';
import { useEffect } from 'react';
import TestButtons from './TestButtons';
import { edgeTypes, nodeTypes } from './constants';
import {
  useInitialEdges,
  useInitialNodes,
  useReactflowHandlers,
} from './hooks';
import { VStack } from 'styled-system/jsx';
import { Spinner } from '@radix-ui/themes';

function RelationDiagram() {
  const selectedFilters = useAtomValue(filterAtom);

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
    queryFn: () => searchAuthors(selectedFilters),
    select: response => response.data.data,
  });

  const initialNodes = useInitialNodes({ authors });
  const initialEdges = useInitialEdges({ authors });

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const {
    handleNodeClick,
    handlePaneClick,
    handleFilterValueChange,
    showOnlySelectedNodes,
    showAllNodes,
  } = useReactflowHandlers({
    setEdges,
    setNodes,
    nodes,
    initialNodes,
    edges,
    initialEdges,
  });

  useEffect(() => {
    if (isSuccess) {
      setNodes(initialNodes);
      setEdges(initialEdges);
      console.log('effect');
    }
  }, [isSuccess, setNodes, setEdges, initialNodes, initialEdges]);

  if (isLoading) {
    return (
      <VStack height="calc(100vh - 128px)" width="calc(100vw)" justify="center">
        <Spinner size="3" />
      </VStack>
    );
  }

  console.log('rerender');

  return (
    <div
      className={css({
        width: '100%',
      })}
    >
      {/* <TestButtons
        onClickShowSelected={showOnlySelectedNodes}
        onClickShowAll={showAllNodes}
      /> */}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={handleNodeClick}
        onPaneClick={handlePaneClick}
        fitView
        draggable={false}
        zoomOnScroll={false}
        panOnScroll
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        className={reactflowClassName}
      >
        {/* <AuthorFilterBox onValueChange={handleFilterValueChange} /> */}
        <MiniMap
          nodeColor={node => (node.selected ? 'red' : 'gray')}
          nodeStrokeWidth={3}
          zoomable
          pannable
        />
        {/* <Background id="1" style={{ backgroundColor: 'blue' }} /> */}
        <Controls showFitView showZoom showInteractive position="bottom-left" />
      </ReactFlow>
    </div>
  );
}

const reactflowClassName = css({
  height: 'calc(100vh - 64px) !important',

  '& .react-flow__attribution': {
    display: 'none',
  },
});

export default function AuthorRelationDiagram() {
  return (
    <ReactFlowProvider>
      <RelationDiagram />
    </ReactFlowProvider>
  );
}
