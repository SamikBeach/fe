import { useState } from 'react';
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  Edge,
  MiniMap,
  Node,
  Position,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
} from 'reactflow';
import PhilosopherNode from './PhilosopherNode';
import { css } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import CustomEdge from './CustomEdge';

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'philosopherNode',
    position: { x: 0, y: 0 },
    data: { label: '1' },
    targetPosition: Position.Top,
  },
  {
    id: '2',
    type: 'philosopherNode',
    position: { x: 0, y: 100 },
    data: { label: '2' },
    targetPosition: Position.Top,
  },
  {
    id: '3',
    type: 'philosopherNode',
    position: { x: -200, y: 200 },
    data: { label: '3' },
    targetPosition: Position.Top,
  },
  {
    id: '4',
    type: 'philosopherNode',
    position: { x: 200, y: 200 },
    data: { label: '4' },
    targetPosition: Position.Top,
  },
  {
    id: '5',
    type: 'philosopherNode',
    position: { x: 0, y: 300 },
    data: { label: '5' },
    targetPosition: Position.Top,
  },
  {
    id: '6',
    type: 'philosopherNode',
    position: { x: -200, y: 400 },
    data: { label: '6' },
    targetPosition: Position.Top,
  },
  {
    id: '7',
    type: 'philosopherNode',
    position: { x: 200, y: 400 },
    data: { label: '7' },
    targetPosition: Position.Top,
  },
];
const initialEdges: Edge[] = [
  {
    id: 'e1-2',
    type: 'custom-edge',
    source: '1',
    target: '2',
    sourceHandle: 'bottom',
  },
  {
    id: 'e2-3',
    type: 'custom-edge',
    source: '2',
    target: '3',
    sourceHandle: 'bottom',
  },
  {
    id: 'e2-4',
    type: 'custom-edge',
    source: '2',
    target: '4',
    sourceHandle: 'bottom',
  },
  {
    id: 'e3-4',
    type: 'custom-edge',
    source: '3',
    target: '5',
    sourceHandle: 'bottom',
  },
  {
    id: 'e4-5',
    type: 'custom-edge',
    source: '4',
    target: '5',
    sourceHandle: 'bottom',
  },
  {
    id: 'e5-6',
    type: 'custom-edge',
    source: '5',
    target: '6',
    sourceHandle: 'bottom',
  },
  {
    id: 'e5-7',
    type: 'custom-edge',
    source: '5',
    target: '7',
    sourceHandle: 'bottom',
  },
];

export default function RelationDiagram() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  return (
    <ReactFlowProvider>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        // onNodesChange={onNodesChange}
        // onEdgesChange={onEdgesChange}
        fitView
        // draggable={false}
        zoomOnScroll={false}
        panOnScroll
        nodeTypes={{ philosopherNode: PhilosopherNode }}
        edgeTypes={{ 'custom-edge': CustomEdge }}
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
      </ReactFlow>{' '}
    </ReactFlowProvider>
  );
}
