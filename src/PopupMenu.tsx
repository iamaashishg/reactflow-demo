import React, { useCallback } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindContextMenu, bindMenu } from "material-ui-popup-state";
import { Handle, Node, Position } from "react-flow-renderer";
import { PopupState as PState } from "material-ui-popup-state/core";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "./store";

export default function MenuPopupState({ data }: any) {
  // const store = useStoreApi();
  const dispatch = useDispatch();
  //const [nodes, setNodes] = useState(initialNodes);
  const nodes = useSelector((state: AppState) => state.nodes);
  // console.log("All nodes from block: ", nodes);

  const onDelete = useCallback(() => {
    dispatch({ type: "DELETE_NODE" });
  }, [dispatch]);

  const onDuplicate = useCallback(
    (popupState: PState) => {
      dispatch({ type: "DUPLICATE_NODE" });
      popupState.close();
    },
    [dispatch]
  );

  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div className="text-updater-node">
        <PopupState variant="popover" popupId="demo-popup-menu">
          {(popupState) => (
            <React.Fragment>
              <Button variant="contained" {...bindContextMenu(popupState)}>
                {data.label}
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
