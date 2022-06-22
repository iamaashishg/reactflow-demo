import React, { useCallback, useEffect, useState } from "react";
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
  useNodesState,
  useEdgesState,
} from "react-flow-renderer";

import { AppState } from "./store";

import { useSelector, useDispatch } from "react-redux";

import { DragDropContext } from "react-beautiful-dnd";

//import initialNodes from "./nodes";
import initialEdges from "./edges";
import BlockNode from "./Block";
import Startnode from "./start";
import TestNode from "./TestNode";
import "./App.css";
import TestNodeOne from "./PopupMenu";
import { NodeData } from "./NodeData";

type TestNodeOne = Node<NodeData>;
interface Item {
  id: string;
  content: string;
}
const nodeTypes = {
  test: TestNode,
  custom: BlockNode,
  custom2: BlockNode,
  start: Startnode,
  testOne: TestNodeOne,
};

const rfStyle = {
  backgroundColor: "#E5E5E5",
};

function Flow() {
  const dispatch = useDispatch();
  //const [nodes, setNodes] = useState(initialNodes);
  const allNodes = useSelector((state: AppState) => state.nodes) as Node[];
  const allEdges = useSelector((state: AppState) => state.edges as Edge[]);

  useEffect(() => {
    setNodes(allNodes);
  }, [allNodes]);

  useEffect(() => {
    setEdges(allEdges);
  }, [allEdges]);

  const [nodes, setNodes] = useNodesState(allNodes);
  const [edges, setEdges] = useEdgesState(allEdges);
  //const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const [tempRemovedEdge, setTempRemovedEdge] = useState<Edge | null>(null);

  const onNodesChange = (changes: NodeChange[]) =>
    setNodes((nds) => {
      return applyNodeChanges(changes, nds);
    });

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((eds) => {
        return applyEdgeChanges(changes, eds);
      }),
    [setEdges]
  );
  const onConnect = useCallback(
    (connection: Connection) => {
      const newconnection = {
        ...connection,
        markerEnd: { type: "arrowClosed" },
      };
      setEdges((eds) => {
        return addEdge(newconnection, eds);
      });
    },
    [setEdges]
  );

  const onClickEdge = (e: React.MouseEvent, edge: Edge) => {
    setTempRemovedEdge(edge);
    //const oldEdgesList = edges;
    const newEdgesList = edges.filter((ed) => edge.id !== ed.id);
    setEdges(newEdgesList);
    //setEdges(oldEdgesList);
  };

  const onClickNode = (e: React.MouseEvent, node: Node) => {
    if (tempRemovedEdge !== null) setEdges((old) => [...old, tempRemovedEdge]);
  };

  const onNodeContextClick = (e: React.MouseEvent, node: Node) => {
    dispatch({ type: "SET_NODE", payload: { node } });
  };

  return (
    <div style={{ height: 800 }}>
      <DragDropContext
        onDragEnd={(result) => {
          console.log("after drag result...");
          console.log(result);
          dispatch({
            type: "REARRANGE_KIDS_AFTER_DRAG",
            payload: {
              draggableId: result.draggableId,
              srcIndex: result.source.index,
              srcDroppableId: result.source.droppableId,
              destIndex: result.destination?.index,
              destinationDroppableId: result.destination?.droppableId,
            },
          });
        }}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          onConnect={onConnect}
          fitView
          style={rfStyle}
          attributionPosition="top-right"
          onEdgeClick={onClickEdge}
          onNodeClick={onClickNode}
          onNodeContextMenu={onNodeContextClick}
          //onInit
        >
          <Background />
        </ReactFlow>
      </DragDropContext>
    </div>
  );
}

export default Flow;
