import { Button, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DropDownPhanLoai() {
  const [anchorEl, setAnchorEl] = useState(null);

  const navigate = useNavigate();

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        Phân loại
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={() => {
            navigate("/products/2");
            handleClose();
          }}
        >
          ÁO SƠ MI
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigate("/products/5");
            handleClose();
          }}
        >
          QUẦN TÂY
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigate("/products/1");
            handleClose();
          }}
        >
          ÁO THUN
        </MenuItem>
      </Menu>
    </div>
  );
}
