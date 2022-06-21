import { createStore } from "redux";
import { Node, Edge } from "react-flow-renderer";
import nodes from "../nodes";
import initialEdges from "../edges";

export interface AppState {
  nodes: Node[] | undefined;
  edges: Edge[] | undefined;
  nodeId: string;
}

interface Item {
  id: string;
  content: string;
}

const getNodeId = () => `randomnode_${+new Date()}`;

// keep the reducer synchronous
// do not directly mutate the state
const reducerFn = (
  state: AppState = {
    nodes: nodes,
    edges: initialEdges,
    nodeId: "",
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
        nodeId: payload.node.id,
      };
    case "SET_EDGES":
      return {
        ...state,
        edges: payload,
      };
    case "DELETE_NODE":
      const updatedNodes =
        state.nodes && state.nodes.filter((n) => n.id !== state.nodeId);
      console.log("DELETE_NODE: ", updatedNodes);
      return {
        ...state,
        nodes: updatedNodes,
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
      const sourceNode =
        (state.nodes && state.nodes.find((n) => n.id === state.nodeId)) ||
        newNode;
      let duplicateNode = JSON.parse(JSON.stringify(sourceNode));
      duplicateNode.id = getNodeId();
      duplicateNode.position = {
        x: sourceNode.position.x + 20,
        y: sourceNode.position.y + 20,
      };
      duplicateNode.data.label = `${sourceNode.data.label} copy`;
      const allNodes = state.nodes && state.nodes.concat([duplicateNode]);
      console.log("updatedNodes:", allNodes);
      return {
        ...state,
        nodes: allNodes,
      };

    case "REARRANGE_KIDS_AFTER_DRAG":
      // find the kids
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
        console.log("draggableKid....");
        console.log(draggableKid);
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

        return {
          ...state,
          nodes: copyNodes,
        };
      }
      return state;

    default:
      return state;
  }
};

const store = createStore(reducerFn);

export default store;
