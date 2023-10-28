import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import './Type.scss'
import useFetchAdmin from '../../hooks/useFetchAdmin';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AlertMessage from "../../components/AlertMessage";

const initialMessage = {
    content: "",
    type: "",
};

const Type = ({ type }) => {
    const { id } = useParams()
    const { data, loading, error } = useFetchAdmin(`${type === 'add' ? `` : `/loaimh/` + id}`);

    const user = useSelector(state => state.user)
    const [ten, setTen] = useState('')
    const [message, setMessage] = useState(initialMessage);
    const handleAdd = () => {
        if (!ten.trim()) {
            setMessage({ content: "Vui lòng nhập tên loại!", type: "warning" })
            return;
        }
        const t = {
            "tenloadimh": ten
        }

        fetch('http://localhost:8081/api/loaimh', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user.token
            },
            body: JSON.stringify(t)
        }).then(res => res.json()).then((data) => {
            if (data.status == 404) {
                setMessage({ content: "Tên loại đã tồn tại!", type: "error" })
                return
            }
            setMessage({ content: "Thêm loại thành công!", type: "success" })
            setTen("");
        })
    }

    const handleMod = () => {
        if (!ten.trim()) {
            setMessage({ content: "Vui lòng nhập tên loại!", type: "warning" })
            return;
        }
        const t = {
            "maloaimh": data.maloaimh,
            "tenloadimh": ten
        }

        fetch('http://localhost:8081/api/loaimh', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user.token
            },
            body: JSON.stringify(t)
        }).then(res => res.json()).then((data) => {
            if (data.status == 404) {
                setMessage({ content: "Tên loại đã tồn tại!", type: "error" })
                return
            }
            setMessage({ content: "Sửa loại thành công!", type: "success" })
        })
    }
    useEffect(() => {
        if (data) setTen(data.tenloadimh)
    }, [loading])
    return data?.status == 404 ?
        <div id="main">
            <div class="fof">
                <h1>Error 404</h1>
            </div>
        </div> : (
            <React.Fragment>
                <Grid container spacing={3} style={{ margin: '50px', alignItems: 'center' }}>
                    <Grid xs={12} sm={12}>
                        <img
                            className="catImg"
                            src="https://images.pexels.com/photos/7679740/pexels-photo-7679740.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            alt=""
                        />
                    </Grid>
                    <Grid xs={12} sm={12}>
                        <h1>Thông tin loại</h1>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="lastName"
                            name="lastName"
                            label="Tên loại"
                            fullWidth
                            autoComplete="family-name"
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
                <AlertMessage message={message} setMessage={setMessage} />
            </React.Fragment>
        )
}

export default Type