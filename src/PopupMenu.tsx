import React, { useCallback } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindContextMenu, bindMenu } from "material-ui-popup-state";
import { Handle, Node, Position, useStoreApi } from "react-flow-renderer";
import { PopupState as PState } from "material-ui-popup-state/core";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "./store";

export default function MenuPopupState({ data }: any) {
  // const store = useStoreApi();
  const dispatch = useDispatch();
  //const [nodes, setNodes] = useState(initialNodes);
  const nodes = useSelector((state: AppState) => state.nodes);
  console.log("All nodes popmenu: ", nodes);

  const getNodeId = () => `randomnode_${+new Date()}`;

  const onDelete = () => {
    dispatch({ type: "DELETE_NODE", payload: { id: data.id } });
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
      const sourceNode =
        (nodes && nodes.find((n) => n.id === data.id)) || newNode;
      let duplicateNode = JSON.parse(JSON.stringify(sourceNode));
      duplicateNode.id = getNodeId();
      duplicateNode.position = { x: 50, y: 20 };
      const updatedNodes = nodes && nodes.concat(duplicateNode);
      popupState.close();
      console.log("updatedNodes:", updatedNodes);
      dispatch({ type: "SET_NODES", payload: { updatedNodes } });
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
