import { Node, Position } from "react-flow-renderer";

const nodes: Node[] = [
  {
    id: "A1",
    type: "group",
    data: { label: null },
    position: { x: -180, y: -120 },
    style: {
      width: 200,
      height: 50,
    },
  },
  {
    id: "S",
    type: "input",
    sourcePosition: Position.Right,
    data: { label: "Start" },
    position: { x: 10, y: 10 },
    parentNode: "A1",
    extent: "parent",
  },
  {
    id: "A",
    type: "group",
    data: { label: null },
    position: { x: -100, y: 80 },
    style: {
      width: 170,
      height: 100,
    },
  },
  {
    id: "E",
    type: "custom",
    data: { label: "Block" },
    position: { x: -50, y: -30 },
    style: {
      width: 170,
      // height: 100,
    },
    draggable: true,
  },
  {
    id: "B",
    type: "output",
    data: { label: "child node 1" },
    position: { x: 10, y: 20 },
    parentNode: "A",
    extent: "parent",
  },
  {
    id: "F",
    type: "input",
    data: { label: "child node 2" },
    position: { x: 20, y: 40 },
    parentNode: "A",
    extent: "parent",
  },
  // {
  //   id: "G",
  //   type: "group",
  //   data: { label: null },
  //   position: { x: 180, y: 80 },
  //   style: {
  //     width: 100,
  //     height: 50,
  //   },
  // },
  {
    id: "C",
    type: "output",
    targetPosition: Position.Left,
    data: { label: "End Node" },
    position: { x: 180, y: 80 },
    // parentNode: "G",
    // extent: "parent",
    style: {
      width: 100,
      height: 50,
    },
    // handleBounds: {
    //   source: null,
    //   target: null,
    // },
  },
  // {
  //   id: "id10",
  //   type: "custom",
  //   data: { label: "child" },
  //   position: { x: 10, y: 110 },
  //   parentNode: "E",
  //   extent: "parent",
  // },
];

export default nodes;
