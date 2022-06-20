import React, { useCallback } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindContextMenu, bindMenu } from "material-ui-popup-state";
import {
  Handle,
  Node,
  Position,
  useStoreApi,
  useUpdateNodeInternals,
} from "react-flow-renderer";
import { PopupState as PState } from "material-ui-popup-state/core";

export default function MenuPopupState({ data }: any) {
  console.log(data);
  const updateNodeInternals = useUpdateNodeInternals();
  const store = useStoreApi();
  const { nodeInternals, setNodes, setEdges, edges } = store.getState();
  const nodes = Array.from(nodeInternals).map(([, node]) => node);

  const getNodeId = () => `randomnode_${+new Date()}`;

  const onDelete = () => {
    const updatedNodes = nodes.filter((n) => n.id !== data.id);
    setNodes(updatedNodes);
    // popupState.close();
  };

  const onDuplicate = useCallback(
    (popupState: PState) => {
      console.log("in duplicate");
      const newNode: Node = {
        id: getNodeId(),
        data: { label: "Duplicate node" },
        position: {
          x: Math.random() * window.innerWidth - 100,
          y: Math.random() * window.innerHeight,
        },
      };
      const sourceNode = nodes.find((n) => n.id === data.id) || newNode;
      let duplicateNode = JSON.parse(JSON.stringify(sourceNode));
      duplicateNode.id = getNodeId();
      duplicateNode.position = { x: 50, y: 20 };
      const updatedNodes = nodes.concat(duplicateNode);
      console.log("updatedNodes:", updatedNodes);
      setNodes(updatedNodes);
      // setEdges(edges);
      popupState.close();
    },
    [setNodes]
  );

  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div className="text-updater-node">
        <PopupState variant="popover" popupId="demo-popup-menu">
          {(popupState) => (
            <React.Fragment>
              <Button variant="contained" {...bindContextMenu(popupState)}>
                Test Menu
              </Button>
              <Menu {...bindMenu(popupState)}>
                <MenuItem onClick={() => onDuplicate(popupState)}>
                  Duplicate
                </MenuItem>
                <MenuItem onClick={onDelete}>Delete</MenuItem>
              </Menu>
            </React.Fragment>
          )}
        </PopupState>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </>
  );
}
