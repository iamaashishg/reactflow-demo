import { createStore } from "redux";
import { Node, Edge } from "react-flow-renderer";
import nodes from "../nodes";
import initialEdges from "../edges";

export interface AppState {
  nodes: Node[] | undefined;
  edges: Edge[] | undefined;
}

interface Item {
  id: string;
  content: string;
}

// keep the reducer synchronous
// do not directly mutate the state
const reducerFn = (
  state: AppState = {
    nodes: nodes,
    edges: initialEdges,
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
    case "SET_EDGES":
      return {
        nodes: state.nodes,
        edges: payload,
      };
    case "DELETE_NODE":
      const updatedNodes =
        state.nodes && state.nodes.filter((n) => n.id !== payload.id);
      console.log("DELETE_NODE: ", updatedNodes);
      return {
        ...state,
        nodes: updatedNodes,
      };
    case "REARRANGE_KIDS_AFTER_DRAG":
      // find the kids
      const { draggableId, srcIndex, destIndex } = payload;
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
          nodes: copyNodes,
          edges: state.edges,
        };
      }
      return state;

    default:
      return state;
  }
};

const store = createStore(reducerFn);

export default store;
