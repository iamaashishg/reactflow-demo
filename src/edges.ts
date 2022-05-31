import { MarkerType } from "react-flow-renderer";

export default [
  {
    id: "s-e",
    source: "S",
    target: "E",
    markerEnd: {
      type: MarkerType.Arrow,
    },
  },
  {
    id: "e-b",
    source: "E",
    target: "B",
    markerEnd: {
      type: MarkerType.Arrow,
    },
  },
  {
    id: "f-c",
    source: "F",
    target: "C",
    markerEnd: {
      type: MarkerType.Arrow,
    },
  },
];
