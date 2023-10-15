import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Autocomplete,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import "./Clothes.scss";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import useFetchAdmin from "../../hooks/useFetchAdmin";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { ClearOutlined } from "@mui/icons-material";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const ttOpt = [
  { tt: "0", ttName: "Có sẵn" },
  { tt: "1", ttName: "Không có sẵn" },
];
const Clothes = ({ type }) => {
  const { id } = useParams();
  const { data, loading } = useFetch(
    `${type === "add" ? `/mathang` : `/mathang/` + id}`
  );

  const clData = useFetchAdmin(`/chatlieu`);
  const brandData = useFetchAdmin(`/nhanhieu`);
  const typeData = useFetchAdmin(`/loaimh`);
  const colorData = useFetchAdmin(`/color`);;
  const sizeData = useFetchAdmin(`/size`);;

  const [name, setName] = useState("");
  const [price, setPrice] = useState();
  const [cachlam, setCachlam] = useState("");
  const [tt, setTT] = useState(ttOpt[0]);
  const [sizeValue, setSizeValue] = React.useState(null);
  const [colorValue, setColorValue] = React.useState(null);

  const [manh, setMamh] = useState();
  const [cl, setCl] = useState("none");
  const [brand, setBrand] = useState("none");
  const [loai, setLoai] = useState("none");
  const [pl, setPl] = useState(null);
  const [size, setSize] = useState(null);
  const [sl, setSl] = useState(0);
  const [color, setColor] = React.useState(null);
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState('')
  const [ctmhRows, setCtmhRows] = React.useState([]);
  const [haRows, setHaRows] = React.useState([]);

  const [openSuccess, setOpenSuccess] = React.useState(false);
  const handleCloseSuccess = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSuccess(false);
  };

  const [openErr, setOpenErr] = React.useState(false);
  const handleCloseErr = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenErr(false);
  };

  const handleAdd = () => {
    if (
      cl === undefined ||
      loai === undefined ||
      brand === undefined ||
      name === "" ||
      tt == null ||
      !price
    ) {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }
    if (parseFloat(price) < 0) {
      alert("Giá không được nhỏ hơn 0");
      return;
    }
    const sp = {
      chatlieuDTO: cl,
      loaimhDTO: loai,
      nhanhieuDTO: brand,
      tenmh: name,
      mota: "KO",
      trangthai: tt.tt,
      cachlam: cachlam,
      phanloai: pl,
      gia: price,
      hinhanhDTOs: haRows,
      ctMathangs: ctmhRows,
    };

    fetch("http://localhost:8081/api/mathang", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sp),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.errCode == 'SAVE_SUCCESS') {
          setMessage(data.message)
          setOpenSuccess(true)
        }
        else {
          setMessage(data.message)
          setOpenErr(true)
        }
        setName("");
        setCachlam(null);
        setTT(null);

        setPrice("");

        setCl(undefined);
        setBrand(undefined);
        setLoai(undefined);

        setColor(null);
        setSize(null);
        setSl(0);
      });
  };

  const handleMod = () => {
    if (
      cl === "" ||
      loai === "" ||
      brand === "" ||
      name === "" ||
      tt == null ||
      price == null
    ) {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }
    const sp = {
      mamh: manh,
      chatlieuDTO: cl,
      loaimhDTO: loai,
      nhanhieuDTO: brand,
      tenmh: name,
      mota: "KO",
      trangthai: tt.tt,
      cachlam: cachlam,
      phanloai: pl,
      gia: price,
      hinhanhDTOs: haRows,
      ctMathangs: ctmhRows,
    };

    fetch("http://localhost:8081/api/mathang", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sp),
    })
      .then((res) => res.json())
      .then((data) => {

      });
  };

  useEffect(() => {
    if (data) {
      setMamh(data.mamh);
      setLoai(data.loaimhDTO);
      setName(data.tenmh);
      setBrand(data.nhanhieuDTO);
      setCachlam(data.cachlam);
      setCl(data.chatlieuDTO);
      setTT(ttOpt[parseInt(data.trangthai)]);
      setPrice(data.gia);
      setPl(data.phanloai);
      if (type !== "add") {
        console.log(data.ctMathangs);
        setCtmhRows(data.ctMathangs);
        setHaRows(data.hinhanhDTOs);
      }
    }
  }, [loading]);

  const handleDelCtmh = (i) => {
    const filtered = ctmhRows.filter(
      (item) => item.colorDTO.macolor !== i.colorDTO.macolor && item.sizeDTO.masize !== i.sizeDTO.masize
    );
    setCtmhRows(filtered);
  };

  const handleAddCtmh = (i) => {
    if (!i.colorDTO.macolor || !i.sizeDTO.masize || parseInt(i.currentNumbeer) < 0) {
      return;
    }
    let filtered = ctmhRows.filter(
      (item) => item.colorDTO.macolor === i.colorDTO.macolor && item.sizeDTO.masize === i.sizeDTO.masize
    );

    if (filtered.length > 0) {
      filtered[0].currentNumbeer = parseInt(filtered[0].currentNumbeer) + parseInt(i.currentNumbeer);
      setCtmhRows([
        ...ctmhRows.filter(
          (item) => item.colorDTO.macolor !== i.colorDTO.macolor && item.sizeDTO.masize !== i.sizeDTO.masize
        ),
        filtered[0],
      ]);
    } else {
      setCtmhRows([...ctmhRows, i]);
    }
  };


  return clData.loading || brandData.loading || typeData.loading ? (
    "loading..."
  ) : (
    <React.Fragment>
      <Grid
        container
        spacing={3}
        style={{ margin: "50px", alignItems: "center" }}
      >
        <Grid item xs={12} sm={12}>
          <img
            className="catImg"
            src="https://images.pexels.com/photos/6347533/pexels-photo-6347533.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <h1>Thông tin quần áo</h1>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="Tên quần áo"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl sx={{ width: 300 }}>
            <InputLabel id="add-clothes-status-select-label">
              Trạng thái
            </InputLabel>
            <Select
              labelId="add-clothes-status-select-label"
              id="add-clothes-status-select"
              value={tt}
              label="Trạng thái"
              onChange={(event) => {
                setTT(event.target.value);
              }}
            >
              {ttOpt.map((e, i) => {
                return (
                  <MenuItem key={i} value={e}>
                    {e.ttName}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Giá"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth sx={{ width: 300 }}>
            <InputLabel id="add-clothes-cach-lam-select-label">
              Chọn cách làm
            </InputLabel>
            <Select
              labelId="add-clothes-cach-lam-select-label"
              id="add-clothes-cach-lam-select"
              value={cachlam}
              label="Chọn cách làm"
              onChange={(event) => {
                setCachlam(event.target.value);
              }}
            >
              {["HAND", "MACHINE"].map((e, i) => {
                return (
                  <MenuItem key={i} value={e}>
                    {e}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel id="add-clothes-brand-select-label">
              Chọn thương hiệu
            </InputLabel>
            <Select
              labelId="add-clothes-brand-select-label"
              id="add-clothes-brand-select"
              value={brand}
              label="Chọn thương hiệu"
              onChange={(event) => {
                setBrand(event.target.value);
              }}
            >
              {brandData.data.map((e, i) => {
                return (
                  <MenuItem key={i} value={e}>
                    {e.tennh}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel id="add-clothes-type-select-label">
              Chọn loại
            </InputLabel>
            <Select
              labelId="add-clothes-type-select-label"
              id="add-clothes-type-select"
              value={loai}
              label="Chọn loại"
              onChange={(event) => {
                setLoai(event.target.value);
              }}
            >
              {typeData.data.map((e, i) => {
                return (
                  <MenuItem key={i} value={e}>
                    {e.tenloadimh}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={2}>
          <FormControl fullWidth>
            <InputLabel id="add-clothes-chat-lieu-select-label">
              Chọn chất liệu
            </InputLabel>
            <Select
              sx={{ width: 300 }}
              labelId="add-clothes-chat-lieu-select-label"
              id="add-clothes-chat-lieu-select"
              value={cl}
              label="Chọn chất liệu"
              onChange={(event) => {
                setCl(event.target.value);
              }}
            >
              {clData.data.map((e, i) => {
                return (
                  <MenuItem key={i} value={e}>
                    {e.tenvai}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid container item xs={12} sm={6}>
          <h5>Chi tiết kích thước sản phẩm</h5>
          <TableContainer
            component={Paper}
            sx={{ height: 400, overflow: "scroll", marginTop: 1 }}
          >
            <Table aria-label="simple table">
              <TableHead
                sx={{ position: "sticky", top: 0, backgroundColor: "yellow" }}
              >
                <TableRow>
                  <TableCell>Màu sắc</TableCell>
                  <TableCell>Kích thước</TableCell>
                  <TableCell>Số lượng</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ctmhRows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{row.colorDTO.tencolor}</TableCell>
                    <TableCell>{row.sizeDTO.tensize}</TableCell>
                    <TableCell>{row.currentNumbeer}</TableCell>
                    <TableCell>
                      <ClearOutlined
                        onClick={() => handleDelCtmh(row)}
                        sx={{ color: "red" }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Grid item xs={12} sm={4}>
            <FormControl fullWidth sx={{ marginTop: 1 }}>
              <InputLabel id="add-clothes-brand-select-label">
                Chọn màu
              </InputLabel>
              <Select
                labelId="add-clothes-brand-select-label"
                id="add-clothes-brand-select"
                value={color}
                label="Màu sắc"
                onChange={(event) => {
                  setColor(event.target.value);
                }}
              >
                {colorData.data.map((e, i) => {
                  return (
                    <MenuItem key={i} value={e}>
                      {e.tencolor}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth sx={{ marginTop: 1 }}>
              <InputLabel id="add-clothes-brand-select-label">
                Size
              </InputLabel>
              <Select
                labelId="add-clothes-brand-select-label"
                id="add-clothes-brand-select"
                value={size}
                label="Chọn size"
                onChange={(event) => {
                  setSize(event.target.value);
                }}
              >
                {sizeData.data.map((e, i) => {
                  return (
                    <MenuItem key={i} value={e}>
                      {e.tensize}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              sx={{ marginTop: 1 }}
              value={sl}
              id="outlined-basic"
              label="Số lượng"
              variant="outlined"
              type="number"
              onChange={(e) => setSl(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              sx={{ marginTop: 1 }}
              variant="outlined"
              onClick={() => {
                handleAddCtmh({ colorDTO: color, sizeDTO: size, currentNumbeer: sl });
                setColor(null);
                setSize(null);
                setSl(0);
              }}
            >
              Thêm chi tiết sản phẩm
            </Button>
          </Grid>
        </Grid>

        <Grid container item xs={12} sm={6}>
          <h5>Hình ảnh sản phẩm</h5>
          <TableContainer
            component={Paper}
            sx={{ height: 400, overflow: "scroll", marginTop: 1 }}
          >
            <Table aria-label="simple table">
              <TableHead
                sx={{
                  position: "sticky",
                  top: 0,
                  backgroundColor: "Highlight",
                }}
              >
                <TableRow>
                  <TableCell>Số thứ tự</TableCell>
                  <TableCell>Đường dẫn</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {haRows.map((row, idx) => (
                  <TableRow
                    key={idx}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{idx}</TableCell>
                    <TableCell>{row.duongdan}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {type === "detail" ? (
            <></>
          ) : (
            <>
              <Grid item xs={12} sm={5}>
                <TextField
                  required
                  id="firstName"
                  name="firstName"
                  label="URL"
                  fullWidth
                  autoComplete="given-name"
                  variant="outlined"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  sx={{ marginTop: 1 }}
                />
              </Grid>
              <Grid item xs={12} sm={7}></Grid>
              <Grid item xs={12}>
                <Button
                  disabled={url === "" ? true : false}
                  variant="outlined"
                  onClick={() => {
                    setHaRows([...haRows, { duongdan: url }]);
                    setUrl("");
                  }}
                  sx={{ marginTop: 1 }}
                >
                  Thêm đường dẫn
                </Button>
              </Grid>
            </>
          )}
        </Grid>
        {type === "detail" ? (
          <></>
        ) : (
          <Grid item xs={12}>
            <Button
              variant="contained"
              onClick={
                type === "add"
                  ? () => {
                    handleAdd();
                  }
                  : handleMod
              }
            >
              Save
            </Button>
          </Grid>
        )}
      </Grid>
      <Snackbar open={openSuccess} autoHideDuration={6000} onClose={handleCloseSuccess}>
        {type === "add" ? (
          <Alert
            onClose={handleCloseSuccess}
            severity="success"
            sx={{ width: "100%" }}
          >
            {message}
          </Alert>
        ) : (
          <Alert
            onClose={handleCloseSuccess}
            severity="success"
            sx={{ width: "100%" }}
          >
            Sửa quần áo thành công!
          </Alert>
        )}
      </Snackbar>

      <Snackbar open={openErr} autoHideDuration={6000} onClose={handleCloseErr}>
        <Alert
          onClose={handleCloseErr}
          severity="success"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
};

export default Clothes;
