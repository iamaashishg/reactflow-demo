import { useCallback, useState } from "react";
import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  NodeChange,
  EdgeChange,
  Connection,
} from "react-flow-renderer";

import initialNodes from "./nodes";
import initialEdges from "./edges";
import BlockNode from "./Block";
import Startnode from "./start";

const nodeTypes = {
  custom: BlockNode,
  start: Startnode,
};

const rfStyle = {
  backgroundColor: "#E5E5E5",
};

function Flow() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  // const onEdgesChange = useCallback(
  //   (changes: EdgeChange[]) =>
  //     setEdges((eds) => applyEdgeChanges(changes, eds)),
  //   [setEdges]
  // );
  const onConnect = useCallback(
    (connection: Connection) => {
      // setEdges((eds) => addEdge(connection, eds))
    },
    [setEdges]
  );

  return (
    <div style={{ height: 800 }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        // onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        onConnect={onConnect}
        fitView
        style={rfStyle}
        attributionPosition="top-right"
      >
        <Background />
      </ReactFlow>
    </div>
  );
}

export default Flow;
