import { memo } from 'react';
import {
  BaseEdge,
  BaseEdgeProps,
  Position,
  getBezierPath,
  getSimpleBezierPath,
  getSmoothStepPath,
  getStraightPath,
} from 'reactflow';

interface Props {
  id: string;
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
  sourcePosition: Position;
  targetPosition: Position;
}

function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  ...props
}: Props) {
  const [edgePath] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    borderRadius: 10,
    offset: 0,
  });

  return (
    <>
      <BaseEdge id={id} {...props} path={edgePath} />
    </>
  );
}

export default CustomEdge;
