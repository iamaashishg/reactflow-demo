import { createStore } from "redux";
import { Node, Edge } from "react-flow-renderer";
import nodes from "../nodes";
import initialEdges from "../edges";
import edges2 from "../edges2";

export interface AppState {
  nodes: Node[] | undefined;
  edges: Edge[] | undefined;
  node: Node;
}

interface Item {
  id: string;
  content: string;
}

const getNodeId = () => `random_${+new Date()}`;

// keep the reducer synchronous
// do not directly mutate the state
const reducerFn = (
  state: AppState = {
    nodes: nodes,
    edges: initialEdges,
    node: {
      id: "123",
      position: {
        x: 0,
        y: 0,
      },
      data: {},
    },
  },
  action: any
) => {
  const { type, payload } = action;
  switch (type) {
    case "SET_NODES":
      return {
        ...state,
        nodes: payload.updatedNodes,
      };
    case "SET_NODE":
      return {
        ...state,
        node: payload.node,
      };
    case "SET_EDGES":
      return {
        ...state,
        edges: payload,
      };
    case "DELETE_NODE":
      const updatedNodes =
        state.nodes && state.nodes.filter((n) => n.id !== state.node.id);
      return {
        ...state,
        nodes: updatedNodes,
      };
    case "SET_NODE_POSITION":
      const newNodes =
        state.nodes &&
        state.nodes.map((n, i) => {
          if (n.id === payload.node.id) {
            n.position = payload.node.position;
          }
          return n;
        });
      return {
        ...state,
        nodes: newNodes,
      };

    case "DUPLICATE_NODE":
      const newNode: Node = {
        id: getNodeId(),
        data: { label: "Duplicate node" },
        position: {
          x: Math.random() * window.innerWidth - 100,
          y: Math.random() * window.innerHeight,
        },
      };
      const sourceNode: Node =
        (state.nodes && state.nodes.find((n) => n.id === state.node.id)) ||
        newNode;
      let duplicateNode: Node = JSON.parse(JSON.stringify(sourceNode));
      let nodeId = getNodeId();
      duplicateNode.id = nodeId;
      duplicateNode.position = {
        x: sourceNode.position.x + 20,
        y: sourceNode.position.y + 20,
      };
      duplicateNode.data.label = `${sourceNode.data.label} copy`;
      if (duplicateNode.data.kids && duplicateNode.data.kids.length) {
        duplicateNode.data.kids.forEach((kid: any, index: number) => {
          let id = getNodeId();
          kid.id = `${id}_${index}`;
          kid.content = kid.id;
        });
      }

      const allNodes = state.nodes && state.nodes.concat([duplicateNode]);
      console.log("updatedNodes:", allNodes);
      return {
        ...state,
        nodes: allNodes,
      };

    case "REARRANGE_KIDS_AFTER_DRAG":
      const {
        draggableId,
        srcIndex,
        destIndex,
        srcDroppableId,
        destinationDroppableId,
      } = payload;
      if (state.nodes) {
        const srcParentNodeIndex = state.nodes.findIndex(
          (node) => node.id === srcDroppableId
        );
        const srcParentNode = state.nodes[srcParentNodeIndex];
        const copySrcKids = srcParentNode.data.kids;
        // splicing dragged kid from copySrcIndex at srcIndex
        const draggableKid = copySrcKids.splice(srcIndex, 1)[0];
        srcParentNode.data.kids = copySrcKids;

        const destParentNodeIndex = state.nodes.findIndex(
          (node) => node.id === destinationDroppableId
        );
        const destParentNode = state.nodes[destParentNodeIndex];
        const copyDestKids = destParentNode.data.kids;
        // inserting dragged kid into copyDestKids at destIndex
        copyDestKids.splice(destIndex, 0, draggableKid);
        destParentNode.data.kids = copyDestKids;

        const copyNodes = [...state.nodes];
        copyNodes[srcParentNodeIndex] = srcParentNode;
        copyNodes[destParentNodeIndex] = destParentNode;

        // removing the edges after drag
        let copyEdges = state.edges;
        if (state.edges) {
          copyEdges = state.edges.filter(
            (edge) => edge.sourceHandle !== draggableId
          );
        }

        console.log("copy edges after drag...");
        console.log(copyEdges);

        return {
          ...state,
          nodes: copyNodes,
          edges: copyEdges,
        };
      }
      return state;

    default:
      return state;
  }
};

const store = createStore(reducerFn);

export default store;
