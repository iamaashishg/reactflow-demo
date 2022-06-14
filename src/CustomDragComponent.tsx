import { useState, useCallback } from "react";
import ReactFlow, {
  Node,
  Connection,
  MarkerType,
  NodeChange,
  applyNodeChanges,
} from "react-flow-renderer";

import InnerDragComponent from "./InnerDragComponent";
import initialNodes2 from "./nodes2";
import initialEdges2 from "./edges2";

interface Edge {
  id: string;
  source: string;
  target: string;
  markerEnd: {
    type: MarkerType;
  };
}

const CustomDragComponent = () => {
  const [nodes, setNodes] = useState(initialNodes2);
  //const [edges, setEdges] = useState(initialEdges2);

  const nodeTypes = {
    customz1: InnerDragComponent,
  };

  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  //   const onConnect = useCallback(
  //     (connection: Connection) => {
  //       // setEdges((eds) => addEdge(connection, eds))
  //     },
  //     [setEdges]
  //   );
  const rfStyle = {
    backgroundColor: "magenta",
  };

  return (
    <div style={{ height: 800 }}>
      <ReactFlow
        nodes={nodes}
        //edges={edges}
        onNodesChange={onNodesChange}
        // onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        //onConnect={onConnect}
        fitView
        style={rfStyle}
        attributionPosition="top-right"
      ></ReactFlow>
    </div>
  );
};

export default CustomDragComponent;
