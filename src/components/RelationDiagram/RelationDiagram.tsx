import { useState } from 'react';
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  Node,
} from 'reactflow';
import PhilosopherNode from './PhilosopherNode';
import { css } from 'styled-system/css';
import { styled } from 'styled-system/jsx';

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'philosopherNode',
    position: { x: 0, y: 0 },
    data: { label: '1' },
    draggable: false,
    connectable: false,
  },
  {
    id: '2',
    type: 'philosopherNode',
    position: { x: 0, y: 100 },
    data: { label: '2' },
    draggable: false,
    connectable: false,
  },
  {
    id: '3',
    type: 'philosopherNode',
    position: { x: 0, y: 200 },
    data: { label: '3' },
    draggable: false,
    connectable: false,
  },
  {
    id: '4',
    type: 'philosopherNode',
    position: { x: 0, y: 300 },
    data: { label: '4' },
    draggable: false,
    connectable: false,
  },
  {
    id: '5',
    type: 'philosopherNode',
    position: { x: 0, y: 400 },
    data: { label: '5' },
    draggable: false,
    connectable: false,
  },
  {
    id: '6',
    type: 'philosopherNode',
    position: { x: 0, y: 500 },
    data: { label: '6' },
    draggable: false,
    connectable: false,
  },
  {
    id: '7',
    type: 'philosopherNode',
    position: { x: 0, y: 600 },
    data: { label: '7' },
    draggable: false,
    connectable: false,
  },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

export default function RelationDiagram() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      edgesUpdatable={false}
      fitView
      draggable={false}
      zoomOnScroll={false}
      panOnScroll
      nodeTypes={{ philosopherNode: PhilosopherNode }}
      className={css({ height: 'calc(100vh - 64px) !important' })}
    >
      {/* <MiniMap nodeColor="gray" nodeStrokeWidth={3} zoomable pannable /> */}
      {/* <Background variant={BackgroundVariant.Dots} /> */}
      <Controls showFitView showZoom showInteractive position="bottom-left" />
    </ReactFlow>
  );
}
