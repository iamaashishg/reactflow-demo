import React, { useCallback, useState } from "react";
import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  NodeChange,
  EdgeChange,
  Connection,
  Edge,
  Node,
} from "react-flow-renderer";

import initialNodes from "./nodes";
import initialEdges from "./edges";
import BlockNode from "./Block";
import Startnode from "./start";
import TestNode from "./TestNode";

const nodeTypes = {
  //test: TestNode,
  custom: BlockNode,
  start: Startnode,
};

const rfStyle = {
  backgroundColor: "#E5E5E5",
};

function Flow() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const [tempRemovedEdge, setTempRemovedEdge] = useState<Edge | null>(null);

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

  const onClickEdge = (e: React.MouseEvent, edge: Edge) => {
    console.log("edge");
    console.log(edge);
    setTempRemovedEdge(edge);
    //const oldEdgesList = edges;
    const newEdgesList = edges.filter((ed) => edge.id !== ed.id);
    console.log(newEdgesList);
    setEdges(newEdgesList);
    //setEdges(oldEdgesList);
  };

  const onClickNode = (e: React.MouseEvent, node: Node) => {
    console.log("node");
    console.log(node);
    if (tempRemovedEdge !== null) setEdges((old) => [...old, tempRemovedEdge]);
  };

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
        onEdgeClick={onClickEdge}
        onNodeClick={onClickNode}
      >
        <Background />
      </ReactFlow>
    </div>
  );
}

export default Flow;
