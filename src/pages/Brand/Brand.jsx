import { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import './Brand.scss'
import useFetchAdmin from '../../hooks/useFetchAdmin';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AlertMessage from "../../components/AlertMessage";
import E404 from '../../components/404/E404'

const initialMessage = {
    content: "",
    type: "",
};

const Brand = ({ type }) => {
    const { id } = useParams()
    const { data, loading, error } = useFetchAdmin(`${type === 'add' ? `` : `/nhanhieu/` + id}`);

    const user = useSelector(state => state.user)

    const [ten, setTen] = useState('')
    const [message, setMessage] = useState(initialMessage);

    const handleAdd = () => {
        if (!ten.trim()) {
            setMessage({ content: "Vui lòng nhập tên nhãn hiệu!", type: "warning" })
            return;
        }
        const nh = {
            "tennh": ten.trim()
        }

        fetch('http://localhost:8081/api/nhanhieu', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user.token
            },
            body: JSON.stringify(nh)
        }).then(res => res.json()).then((data) => {
            if (data.manh == null) {
                setMessage({ content: "Tên nhãn hiệu đã tồn tại!", type: "error" })
                return
            }
            setMessage({ content: "Thêm nhãn hiệu thành công!", type: "success" })
            setTen("");
        })
    }

    const handleMod = () => {
        if (!ten.trim()) {
            setMessage({ content: "Vui lòng nhập tên nhãn hiệu!", type: "warning" })
            return;
        }
        const nh = {
            "manh": data.manh,
            "tennh": ten
        }

        fetch('http://localhost:8081/api/nhanhieu', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user.token
            },
            body: JSON.stringify(nh)
        }).then(res => res.json()).then((data) => {
            if (data.manh == null) {
                setMessage({ content: "Tên nhãn hiệu đã tồn tại!", type: "error" })
                return
            }
            setMessage({ content: "Sửa nhãn hiệu thành công!", type: "success" })
        })
    }

    useEffect(() => {
        if (data) setTen(data.tennh)
    }, [loading])
    return data?.status == 404 ?
       <E404 /> : (
            <>
                <Grid container spacing={3} style={{ margin: '50px', alignItems: 'center' }}>
                    <Grid xs={12} sm={12}>
                        <img
                            className="catImg"
                            src="https://images.pexels.com/photos/7679740/pexels-photo-7679740.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            alt=""
                        />
                    </Grid>
                    <Grid xs={12} sm={12}>
                        <h1>Thông tin thương hiệu</h1>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="firstName"
                            name="firstName"
                            label="Tên nhãn hiệu"
                            fullWidth
                            autoComplete="given-name"
                            variant="standard"
                            value={ten}
                            onChange={(e) => setTen(e.target.value)}
                        />
                    </Grid>

                    {
                        type === 'detail' ? <></> :

                            <Grid item xs={12}>
                                <Button variant="contained" onClick={type === 'add' ? handleAdd : handleMod}>
                                    Save
                                </Button>
                            </Grid>
                    }
                </Grid>
                {/* <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Thêm nhãn hiệu thành công!
                </Alert>
            </Snackbar>
            <Snackbar open={open1} autoHideDuration={6000} onClose={handleClose1}>
                <Alert onClose={handleClose1} severity="success" sx={{ width: '100%' }}>
                    Sửa nhãn hiệu thành công!
                </Alert>
            </Snackbar> */}
                <AlertMessage message={message} setMessage={setMessage} />
            </>
        )
}

export default Brand