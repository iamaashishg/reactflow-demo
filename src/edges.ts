import { MarkerType, Edge } from "react-flow-renderer";

export default [
  {
    id: "s-e",
    source: "S",
    target: "E",
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: "e-b1",
    source: "E",
    sourceHandle: "cno1",
    target: "B",
    // targetHandle: "B",
    label: "fix this",
    labelBgBorderRadius: 4,
    labelBgStyle: { fill: "#FFCC00", color: "#fff", fillOpacity: 0.7 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: "e-b2",
    source: "E",
    sourceHandle: "cno2",
    target: "B",
    // targetHandle: "B",
    label: "fix this also",
    labelBgBorderRadius: 4,
    labelBgStyle: { fill: "#00CCFF", color: "#fff", fillOpacity: 0.7 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: "f-c",
    source: "F",
    target: "C",
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
];
