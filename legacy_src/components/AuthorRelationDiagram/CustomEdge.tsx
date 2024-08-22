import {
  BaseEdge,
  BaseEdgeProps,
  Position,
  getSmoothStepPath,
} from 'reactflow';

interface Props extends Omit<BaseEdgeProps, 'path'> {
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
      <BaseEdge id={id} path={edgePath} {...props} />
    </>
  );
}

export default CustomEdge;
