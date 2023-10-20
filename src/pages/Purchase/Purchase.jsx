import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import HistoryList from "../../components/HistoryList/HistoryList";
import "./Purchase.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Alert, Snackbar } from "@mui/material";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      style={{ backgroundColor: "#d1d1d1", height: "100%" }}
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3, backgroundColor: "#d1d1d1" }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const Purchase = () => {
  const user = useSelector((state) => state.user);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [hoadon, setHoadon] = useState(null);
  const [showMessage, setShowMessage] = useState(false);

  const handleClose = (_, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowMessage(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        "http://localhost:8081/api/hoadonOfUser/" + user.info.khachhang.makh,
        {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        }
      );
      const data = await res.json();
      console.log(data);
      setHoadon(data);
      if (data?.length <= 0) {
        setShowMessage(true);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="purchase">
      {Array.isArray(hoadon) && hoadon.length <= 0 && (
        <Snackbar
          open={showMessage}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity="warning"
            sx={{ width: "100%" }}
          >
            Bạn chưa có đơn hàng nào!
          </Alert>
        </Snackbar>
      )}
      <Box sx={{ width: "100%", height: "100%" }}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            position: "sticky",
            top: 0,
            background: "white",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Tất cả" {...a11yProps(0)} />
            <Tab label="Chưa xác nhận" {...a11yProps(1)} />
            <Tab label="Đã xác nhận" {...a11yProps(2)} />
            <Tab label="Đang giao" {...a11yProps(1)} />
            <Tab label="Đã giao" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          {hoadon !== null ? (
            hoadon.map((hd) =>
              hd.chitietTrangThaiDTO.trangthai.matthd === 6 ? (
                <></>
              ) : (
                <Link className="link" to={`/user/purchase/order/${hd.mahd}`}>
                  <HistoryList data={hd} />
                </Link>
              )
            )
          ) : (
            <></>
          )}
        </TabPanel>
        <TabPanel value={value} index={1}>
          {hoadon !== null ? (
            hoadon.map((hd) =>
              hd.chitietTrangThaiDTO.trangthai.matthd === 6 ? (
                <></>
              ) : hd.chitietTrangThaiDTO.trangthai.matthd < 3 ? (
                <Link className="link" to={`/user/purchase/order/${hd.mahd}`}>
                  <HistoryList data={hd} />
                </Link>
              ) : (
                <></>
              )
            )
          ) : (
            <></>
          )}
        </TabPanel>
        <TabPanel value={value} index={2}>
          {hoadon !== null ? (
            hoadon.map((hd) =>
              hd.chitietTrangThaiDTO.trangthai.matthd === 6 ? (
                <></>
              ) : hd.chitietTrangThaiDTO.trangthai.matthd === 3 ? (
                <Link className="link" to={`/user/purchase/order/${hd.mahd}`}>
                  <HistoryList data={hd} />
                </Link>
              ) : (
                <></>
              )
            )
          ) : (
            <></>
          )}
        </TabPanel>
        <TabPanel value={value} index={3}>
          {hoadon !== null ? (
            hoadon.map((hd) =>
              hd.chitietTrangThaiDTO.trangthai.matthd === 6 ? (
                <></>
              ) : hd.chitietTrangThaiDTO.trangthai.matthd === 4 ? (
                <Link className="link" to={`/user/purchase/order/${hd.mahd}`}>
                  <HistoryList data={hd} />
                </Link>
              ) : (
                <></>
              )
            )
          ) : (
            <></>
          )}
        </TabPanel>
        <TabPanel value={value} index={4}>
          {hoadon !== null ? (
            hoadon.map((hd) =>
              hd.chitietTrangThaiDTO.trangthai.matthd === 6 ? (
                <></>
              ) : hd.chitietTrangThaiDTO.trangthai.matthd === 5 ? (
                <Link className="link" to={`/user/purchase/order/${hd.mahd}`}>
                  <HistoryList data={hd} />
                </Link>
              ) : (
                <></>
              )
            )
          ) : (
            <></>
          )}
        </TabPanel>
      </Box>
    </div>
  );
};

export default Purchase;
