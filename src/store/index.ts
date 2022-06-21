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
        const parentNodeIndex = state.nodes.findIndex((node) => {
          if (node.data.kids) {
            return node.data.kids.some((kid: Item) => kid.id === draggableId);
          }
          return false;
        });
        //console.log("parentNode");
        //console.log(parentNodeIndex);
        const parentNode = state.nodes[parentNodeIndex];
        const copyKids = parentNode.data.kids;
        [copyKids[srcIndex], copyKids[destIndex]] = [
          copyKids[destIndex],
          copyKids[srcIndex],
        ];
        parentNode.data.kids = copyKids;
        const copyNodes = [...state.nodes];
        copyNodes[parentNodeIndex] = parentNode;
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
