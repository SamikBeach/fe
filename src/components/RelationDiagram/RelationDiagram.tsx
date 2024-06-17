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
import AuthorNode from './AuthorNode';
import { css } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import CustomEdge from './CustomEdge';
import { Button } from '@elements/Button';
import { Select } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import { getAllAuthors } from '@apis/author';
import { Author } from '@models/author';

// const initialNodes: Node<NodeData>[] = [
//   {
//     id: '1',
//     type: 'authorNode',
//     position: { x: 0, y: 0 },
//     data: {
//       label: '1',
//       name: '프리드리히 니체',
//       englishName: 'Friedrich Nietzsche',
//       src: 'https://t2.gstatic.com/licensed-image?q=tbn:ANd9GcS3F15vW2p-W1vemKEkViypH0pjICfqHDzzuhC87bVXDYeysTmfYY9tD-M5-UyBr-Uo',
//     },
//   },
//   {
//     id: '2',
//     type: 'authorNode',
//     position: { x: 0, y: 100 },
//     data: {
//       label: '2',
//       name: '에리히 프롬',
//       englishName: 'Erich Fromm',
//       src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Erich_Fromm_1974.jpg/500px-Erich_Fromm_1974.jpg',
//     },
//   },
//   {
//     id: '3',
//     type: 'authorNode',
//     position: { x: -200, y: 200 },
//     data: {
//       label: '3',
//       name: '임마누엘 칸트',
//       englishName: 'Immanuel Kant',
//       src: 'https://i.namu.wiki/i/v5nWG1gg9DDkM6OpW_g-YL1P0Hv9KZwwZeEsR9brznfhPqzkNPk6Eb9LmLYNFyXj6jHAm1HejLwsv29RPgCyFm3akzJH4ZM4xhc534yJqFVgkZC9reLioyL6_-DDpr5LPLq4p1Nnk-2vExFTL8yTNg.webp',
//     },
//   },
//   {
//     id: '4',
//     type: 'authorNode',
//     position: { x: 200, y: 200 },
//     data: {
//       label: '4',
//       name: '비트겐슈타인',
//       englishName: 'Ludwig Wittgenstein',
//       src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Ludwig_Wittgenstein.jpg/438px-Ludwig_Wittgenstein.jpg',
//     },
//   },
//   {
//     id: '5',
//     type: 'authorNode',
//     position: { x: 0, y: 300 },
//     data: {
//       label: '5',
//       name: '스피노자',
//       englishName: 'Baruch Spinoza',
//       src: 'https://i.namu.wiki/i/Xyr66CsD3QK6f-BY0k_-mkPvcMxdPLjUWfoiY5hOBt1Lo-vZNJirJcFNjECROSRP69HTBygCfHJmjuoUUtzO_LWQcSlXGsdRbS_-K4T4Bea6mFXrXupGxiIqmbtKgCb3Rhj_ivwjuU9HjnCJzfClFQ.webp',
//     },
//   },
//   {
//     id: '6',
//     type: 'authorNode',
//     position: { x: -200, y: 400 },
//     data: {
//       label: '6',
//       name: '버드런트 러셀',
//       englishName: 'Bertrand Russell',
//       src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Bertrand_Russell_1949.jpg/507px-Bertrand_Russell_1949.jpg',
//     },
//   },
//   {
//     id: '7',
//     type: 'authorNode',
//     position: { x: 200, y: 400 },
//     data: {
//       label: '7',
//       name: '데이비드 흄',
//       englishName: 'David Hume',
//       src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/David_Hume_Ramsay.jpg/529px-David_Hume_Ramsay.jpg',
//     },
//   },
// ];

// const initialEdges: Edge[] = [
//   {
//     id: 'e1-2',
//     type: 'customEdge',
//     source: '1',
//     target: '2',
//     sourceHandle: 'bottom',
//   },
//   {
//     id: 'e1-3',
//     type: 'customEdge',
//     source: '1',
//     target: '3',
//     sourceHandle: 'bottom',
//     animated: true,
//   },
//   {
//     id: 'e1-5',
//     type: 'customEdge',
//     source: '1',
//     target: '5',
//     sourceHandle: 'bottom',
//     animated: true,
//   },
//   {
//     id: 'e2-3',
//     type: 'customEdge',
//     source: '2',
//     target: '3',
//     sourceHandle: 'bottom',
//   },
//   {
//     id: 'e2-4',
//     type: 'customEdge',
//     source: '2',
//     target: '4',
//     sourceHandle: 'bottom',
//   },
//   {
//     id: 'e3-4',
//     type: 'customEdge',
//     source: '3',
//     target: '5',
//     sourceHandle: 'bottom',
//   },
//   {
//     id: 'e4-5',
//     type: 'customEdge',
//     source: '4',
//     target: '5',
//     sourceHandle: 'bottom',
//   },
//   {
//     id: 'e5-6',
//     type: 'customEdge',
//     source: '5',
//     target: '6',
//     sourceHandle: 'bottom',
//   },
//   {
//     id: 'e5-7',
//     type: 'customEdge',
//     source: '5',
//     target: '7',
//     sourceHandle: 'bottom',
//   },
// ];

const nodeTypes = { authorNode: AuthorNode };
const edgeTypes = { customEdge: CustomEdge };

export default function RelationDiagram() {
  const { data } = useQuery({
    queryKey: ['author'],
    queryFn: getAllAuthors,
  });

  const initialNodes =
    data?.data
      .map<Node<Author>>((author, index) => {
        const bornYear = author.born_date?.split('-')[0];

        return {
          id: author.id.toString(),
          type: 'authorNode',
          position: {
            x: Math.floor(Math.random() * 30) * 50,
            y: Number(bornYear),
          },
          data: {
            id: author.id,
            label: author.id.toString(),
            name: author.name,
            nameInKor: author.name_in_kor,
            imageUrl: author.image_url,
            bornDate: author.born_date,
            bornDateIsBc: author.born_date_is_bc,
            diedDate: author.died_date,
            diedDateIsBc: author.died_date_is_bc,
          },
        };
      })
      .slice(0, 30) ?? [];

  const initialEdges =
    data?.data
      .map<Edge>(author => ({
        id: `e${author.id}-2`,
        type: 'customEdge',
        source: author.id.toString(),
        target: Math.floor(Math.random() * 30).toString(),
        sourceHandle: 'bottom',
        animated: true,
      }))
      .slice(0, 30) ?? [];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  return (
    <ReactFlowProvider>
      <FilterSelect />
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

function FilterSelect() {
  return (
    <Select.Root defaultValue="apple">
      <Select.Trigger
        className={css({
          cursor: 'pointer',
          position: 'absolute',
          zIndex: 2,
          margin: '20px',
        })}
      />
      <Select.Content side="bottom" position="popper">
        <Select.Group>
          <Select.Label>Fruits</Select.Label>
          <Select.Item value="orange">Orange</Select.Item>
          <Select.Item value="apple">Apple</Select.Item>
        </Select.Group>
        <Select.Separator />
        <Select.Group>
          <Select.Label>Vegetables</Select.Label>
          <Select.Item value="carrot">Carrot</Select.Item>
          <Select.Item value="potato">Potato</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
}
