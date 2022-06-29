import { Node, Position } from "react-flow-renderer";

const nodes: Node[] = [
  {
    id: "A1",
    type: "group",
    data: { label: null },
    position: { x: 180, y: 0 },
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
    position: { x: 200, y: 350 },
    sourcePosition: Position.Top,
    targetPosition: Position.Bottom,
    style: {
      width: 300,
      height: 100,
      display: "flex",
    },
  },
  {
    id: "E",
    type: "custom",
    data: {
      label: "Block",
      // duplicate info
      kids: [
        {
          id: "cno1",
          content: "child node 1",
        },
        {
          id: "cno2",
          content: "child node 2",
        },
        {
          id: "cno3",
          content: "child node 3",
        },
      ],
    },
    position: { x: 50, y: 100 },
    style: {
      width: 170,
      // height: 100,
    },
    draggable: true,
  },
  {
    id: "E2",
    type: "custom2",
    data: {
      label: "Block2",
      // duplicate info
      kids: [
        {
          id: "cno12",
          content: "child node 12",
        },
        {
          id: "cno22",
          content: "child node 22",
        },
        {
          id: "cno32",
          content: "child node 32",
        },
      ],
    },
    position: { x: 50, y: 250 },
    style: {
      width: 170,
      // height: 100,
    },
    draggable: true,
  },
  {
    id: "B",
    type: "output",
    data: { label: "X1" },
    position: { x: 100, y: 20 },
    parentNode: "A",
    extent: "parent",
    style: {
      height: "25px",
      width: "50px",
    },
  },
  {
    id: "F",
    type: "input",
    data: { label: "X2" },
    position: { x: 100, y: 60 },
    parentNode: "A",
    extent: "parent",
    style: {
      height: "25px",
      width: "50px",
    },
  },
  {
    id: "H",
    type: "testOne",
    data: { label: "Test menu", id: "H" },
    position: { x: 170, y: 30 },
    parentNode: "A",
    extent: "parent",
    // style: {
    //   height: "25px",
    //   width: "50px",
    // },
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
    position: { x: 250, y: 580 },
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

  // // duplicate info - kids of NODE E
  /*{
    id: "SC1",
    type: "input",
    data: { label: "scn1" },
    position: { x: 0, y: 0 },
    parentNode: "E",
    extent: "parent",
    style: {
      width: 50,
      height: 20,
      fontSize: 8,
    },
  },
  {
    id: "SC2",
    type: "input",
    data: { label: "scn2" },
    position: { x: 2, y: 40 },
    parentNode: "E",
    extent: "parent",
    style: {
      width: 50,
      height: 20,
      fontSize: 8,
    },
  },
  {
    id: "SC3",
    type: "input",
    data: { label: "scn3" },
    position: { x: 20, y: 40 },
    parentNode: "E",
    extent: "parent",
    style: {
      width: 50,
      height: 20,
      fontSize: 8,
    },
  },*/
  {
    id: "T0",
    type: "test",
    data: { label: "Test Node 0" },
    position: { x: 525, y: 160 },
    style: {
      fontSize: 8,
      border: "1px solid blue",
    },
  },
];

export default nodes;
