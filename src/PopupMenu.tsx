import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import {
  Handle,
  Node,
  Position,
  useStoreApi,
  useUpdateNodeInternals,
} from "react-flow-renderer";
import { PopupState as PState } from "material-ui-popup-state/core";

export default function MenuPopupState() {
  const updateNodeInternals = useUpdateNodeInternals();
  const store = useStoreApi();
  const { nodeInternals, setNodes } = store.getState();
  const nodes = Array.from(nodeInternals).map(([, node]) => node);

  const onDelete = () => {
    const updatedNodes = nodes.filter((n) => n.id !== "F");
    setNodes(updatedNodes);
    // popupState.close();
  };

  const onDuplicate = (popupState: PState) => {
    console.log("on duplicate click");
    popupState.close();
  };

  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div className="text-updater-node">
        <PopupState variant="popover" popupId="demo-popup-menu">
          {(popupState) => (
            <React.Fragment>
              <Button variant="contained" {...bindTrigger(popupState)}>
                child node 2
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
