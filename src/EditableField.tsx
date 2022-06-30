import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Edit from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { useDispatch } from "react-redux";
import "./editable.css";

const EditableTextField = (props: any) => {
  const { value, updateTitle } = props;
  const dispatch = useDispatch();
  const [title, setTitle] = useState(value);
  const [editMode, setEditMode] = useState(false);
  const [mouseOver, setMouseOver] = useState(false);

  const handleChange = (event: any) => {
    setTitle(event.target.value);
  };

  useEffect(() => {
    updateTitle(title);
  }, [dispatch, title]);

  const handleMouseOver = (event: any) => {
    if (!mouseOver) {
      setMouseOver(true);
    }
  };

  const handleMouseOut = (event: any) => {
    if (mouseOver) {
      setMouseOver(false);
    }
  };

  const handleClick = () => {
    setEditMode(true);
    setMouseOver(false);
  };

  return (
    <div className="container">
      <TextField
        name="title"
        value={title}
        margin="normal"
        error={title === ""}
        onChange={handleChange}
        disabled={!editMode && !value}
        className="textField"
        onMouseEnter={handleMouseOver}
        onMouseLeave={handleMouseOut}
        InputProps={{
          classes: {
            input: "input",
            disabled: "disabled",
          },
          endAdornment: mouseOver ? (
            <InputAdornment position="end">
              <IconButton onClick={handleClick}>
                <Edit />
              </IconButton>
            </InputAdornment>
          ) : (
            ""
          ),
        }}
      />
    </div>
  );
};

export default EditableTextField;
function updateTitle(title: any) {
  throw new Error("Function not implemented.");
}
