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
  Button,
  FormControl,
  FormHelperText,
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

const initialErrors = {
  brand: "",
  cl: "",
  loai: "",
  name: "",
  price: "",
  tt: "",
  cachlam: "",
};

const initialMessage = {
  content: "",
  type: "",
};

const Clothes = ({ type }) => {
  const { id } = useParams();
  const { data, loading } = useFetch(
    `${type === "add" ? `/mathang` : `/mathang/` + id}`
  );

  const clData = useFetchAdmin(`/chatlieu`);
  const brandData = useFetchAdmin(`/nhanhieu`);
  const typeData = useFetchAdmin(`/loaimh`);
  const colorData = useFetchAdmin(`/color`);
  const sizeData = useFetchAdmin(`/size`);

  const [message, setMessage] = useState(initialMessage);
  const [errors, setErrors] = useState(initialErrors);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [cachlam, setCachlam] = useState("");

  const [tt, setTT] = useState(ttOpt[0]);

  const [manh, setMamh] = useState();
  const [cl, setCl] = useState("");
  const [brand, setBrand] = useState("");
  const [loai, setLoai] = useState("");
  const [pl, setPl] = useState("");
  const [size, setSize] = useState("");
  const [sl, setSl] = useState(0);
  const [color, setColor] = React.useState("");
  const [url, setUrl] = useState("");
  const [ctmhRows, setCtmhRows] = React.useState([]);
  const [haRows, setHaRows] = React.useState([]);

  const handleCloseMesssage = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setMessage((m) => ({ ...m, content: "" }));
  };

  const validate = () => {
    const errors = {};
    if (!cl) {
      errors.cl = "Chưa chọn chất liệu!";
    }
    if (!loai) {
      errors.loai = "Chưa chọn loại!";
    }
    if (!brand) {
      errors.brand = "Chưa chọn thương hiệu!";
    }
    if (!name) {
      errors.name = "Tên không được để trống!";
    }
    if (!tt) {
      errors.tt = "Chưa chọn trạng thái!";
    }
    if (!cachlam) {
      errors.cachlam = "Chưa chọn cách làm!";
    }
    if (!price) {
      errors.price = "Giá không được để trống!";
    } else if (parseFloat(price) < 0) {
      errors.price = "Giá không được nhỏ hơn 0";
    }
    return errors;
  };

  const resetForm = () => {
    setName("");
    setCachlam("");
    setTT("");

    setPrice("");

    setCl("");
    setBrand("");
    setLoai("");
    // ctmh input
    setColor("");
    setSize("");
    setSl(0);
    // ctmh & hinh anh
    setCtmhRows([]);
    setHaRows([]);
  };

  const handleAdd = () => {
    const returnErrors = validate();
    if (Object.keys(returnErrors).length > 0) {
      setErrors(returnErrors);
      setMessage({
        content: "Vui lòng nhập đúng thông tin!",
        type: "error",
      });
    } else {
      setErrors(initialErrors);
      const sp = {
        chatlieuDTO: { macl: cl, tenvai: null },
        loaimhDTO: { maloaimh: loai, tenloadimh: null },
        nhanhieuDTO: { manh: brand, tennh: null },
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
          if (data.errCode === "SAVE_SUCCESS") {
            setMessage({
              content: data.message,
              type: "success",
            });
          } else {
            setMessage({
              content: data.message,
              type: "error",
            });
          }
          resetForm();
        });
    }
  };

  const handleMod = () => {
    const returnErrors = validate();
    if (Object.keys(returnErrors).length > 0) {
      setErrors(returnErrors);
      setMessage({
        content: "Vui lòng nhập đúng thông tin!",
        type: "error",
      });
    } else {
      setErrors(initialErrors);
      const sp = {
        mamh: manh,
        chatlieuDTO: { macl: cl, tenvai: null },
        loaimhDTO: { maloaimh: loai, tenloadimh: null },
        nhanhieuDTO: { manh: brand, tennh: null },
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
          console.log(data);
          if (data.errCode === "SAVE_SUCCESS") {
            setMessage({
              content: data.message,
              type: "success",
            });
          } else {
            setMessage({
              content: data.message,
              type: "error",
            });
          }
        });
    }
  };

  useEffect(() => {
    if (data) {
      if (type !== "add") {
        setMamh(data.mamh);
        setLoai(data.loaimhDTO.maloaimh);
        setName(data.tenmh);
        setBrand(data.nhanhieuDTO.manh);
        setCachlam(data.cachlam);
        setCl(data.chatlieuDTO.macl);
        setTT(ttOpt[parseInt(data.trangthai)]);
        setPrice(data.gia);
        setPl(data.phanloai);
        setCtmhRows(data.ctMathangs);
        setHaRows(data.hinhanhDTOs);
      }
    }
  }, [loading, data]);

  const removeError = (fieldName) => {
    setErrors((e) => ({
      ...e,
      [fieldName]: "",
    }));
  };

  const handleDelCtmh = (i) => {
    const filtered = ctmhRows.filter(
      (item) =>
        item.colorDTO.macolor != i.colorDTO.macolor ||
        item.sizeDTO.masize != i.sizeDTO.masize
    );
    setCtmhRows(filtered);
  };

  const handleAddCtmh = (i) => {
    if (
      !i.colorDTO ||
      !i.sizeDTO ||
      !Number.isInteger(parseInt(i.currentNumbeer))
    ) {
      setMessage({
        content: "Vui lòng nhập đúng đủ màu, kích thước, số lượng!",
        type: "error",
      });
      return;
    }
    if (parseInt(i.currentNumbeer) < 0) {
      setMessage({
        content: "Số lượng không được nhỏ hơn 0!",
        type: "error",
      });
      return;
    }
    let filtered = ctmhRows.filter(
      (item) =>
        item.colorDTO.macolor == i.colorDTO.macolor &&
        item.sizeDTO.masize == i.sizeDTO.masize
    );

    if (filtered.length > 0) {
      filtered[0].currentNumbeer =
        parseInt(filtered[0].currentNumbeer) + parseInt(i.currentNumbeer);
      setCtmhRows([
        ...ctmhRows.filter(
          (item) =>
            item.colorDTO.macolor !== i.colorDTO.macolor &&
            item.sizeDTO.masize !== i.sizeDTO.masize
        ),
        filtered[0],
      ]);
    } else {
      setCtmhRows([...ctmhRows, i]);
    }
    setColor(null);
    setSize(null);
    setSl(0);
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
            error={!!errors.name}
            helperText={errors.name}
            required
            inputProps={{ maxLength: 100 }}
            id="firstName"
            name="name"
            label="Tên quần áo"
            fullWidth
            autoComplete="off"
            variant="standard"
            value={name}
            onChange={(e) => {
              removeError(e.target.name);
              setName(e.target.value);
            }}
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
              name="tt"
              label="Trạng thái"
              onChange={(event) => {
                setTT(event.target.value);
                removeError(event.target.name);
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
            <FormHelperText sx={{ color: "red" }}>{errors.tt}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            error={!!errors.price}
            helperText={errors.price}
            required
            id="address1"
            name="price"
            label="Giá"
            fullWidth
            autoComplete="off"
            variant="standard"
            type="number"
            value={price}
            onChange={(e) => {
              removeError(e.target.name);
              setPrice(e.target.value);
            }}
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
              name="cachlam"
              value={cachlam}
              label="Chọn cách làm"
              onChange={(event) => {
                removeError(event.target.name);
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
            <FormHelperText sx={{ color: "red" }}>
              {errors.cachlam}
            </FormHelperText>
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
              name="brand"
              value={brand}
              label="Chọn thương hiệu"
              onChange={(event) => {
                removeError(event.target.name);
                setBrand(event.target.value);
              }}
            >
              {brandData.data.map((e, i) => {
                return (
                  <MenuItem key={i} value={e.manh}>
                    {e.tennh}
                  </MenuItem>
                );
              })}
            </Select>
            <FormHelperText sx={{ color: "red" }}>
              {errors.brand}
            </FormHelperText>
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
              name="loai"
              value={loai}
              label="Chọn loại"
              onChange={(event) => {
                setLoai(event.target.value);
                removeError(event.target.name);
              }}
            >
              {typeData.data.map((e, i) => {
                return (
                  <MenuItem key={i} value={e.maloaimh}>
                    {e.tenloadimh}
                  </MenuItem>
                );
              })}
            </Select>
            <FormHelperText sx={{ color: "red" }}>{errors.loai}</FormHelperText>
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
              name="cl"
              value={cl}
              label="Chọn chất liệu"
              onChange={(event) => {
                // value is object
                console.log(event.target.value);
                setCl(event.target.value);
                removeError(event.target.name);
              }}
            >
              {clData.data.map((e, i) => {
                return (
                  <MenuItem key={i} value={e.macl}>
                    {e.tenvai}
                  </MenuItem>
                );
              })}
            </Select>
            <FormHelperText sx={{ color: "red", width: "100%" }}>
              {errors.cl}
            </FormHelperText>
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
              <InputLabel id="add-clothes-brand-select-label">Size</InputLabel>
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
                handleAddCtmh({
                  colorDTO: color,
                  sizeDTO: size,
                  currentNumbeer: sl,
                });
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
                  autoComplete="off"
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
      <Snackbar
        open={!!message.content}
        autoHideDuration={6000}
        onClose={handleCloseMesssage}
      >
        <Alert
          onClose={handleCloseMesssage}
          severity={message.type}
          sx={{ width: "100%" }}
        >
          {type === "add" ? message.content : message.content}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
};

export default Clothes;
