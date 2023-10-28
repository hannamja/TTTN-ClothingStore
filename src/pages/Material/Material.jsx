import { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import './Material.scss'
import { useParams } from 'react-router-dom';
import useFetchAdmin from '../../hooks/useFetchAdmin';
import { useSelector } from 'react-redux';
import AlertMessage from "../../components/AlertMessage";

const initialMessage = {
    content: "",
    type: "",
};

const Material = ({ type }) => {
    const { id } = useParams()
    const { data, loading, error } = useFetchAdmin(`${type === 'add' ? `` : `/chatlieu/` + id}`);
    const [message, setMessage] = useState(initialMessage);

    const user = useSelector(state => state.user)

    const handleAdd = () => {
        if (!ten.trim()) {
            setMessage({ content: "Vui lòng nhập tên chất liệu", type: "warning" })
            return
        }
        const cl = {
            "tenvai": ten
        }

        fetch('http://localhost:8081/api/chatlieu', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user.token
            },
            body: JSON.stringify(cl)
        }).then(res => res.json()).then((data) => {
            if (data.macl == null) {
                setMessage({ content: "Tên chât liệu đã tồn tại!", type: "error" })
                return
            }
            setMessage({ content: "Thêm chất liệu thành công!", type: "success" })
        })
    }

    const handleMod = () => {
        if (!ten.trim()) {
            setMessage({ content: "Vui lòng nhập tên chất liệu", type: "warning" })
            return
        }
        const cl = {
            "macl": data.macl,
            "tenvai": ten
        }

        fetch('http://localhost:8081/api/chatlieu', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user.token
            },
            body: JSON.stringify(cl)
        }).then(res => res.json()).then((data) => {
            if (data.macl == null) {
                setMessage({ content: "Tên chất liệu đã tồn tại!", type: "error" })
                return
            }
            setMessage({ content: "Sửa chất liệu thành công!", type: "success" })
        })
    }

    const [ten, setTen] = useState('')
    useEffect(() => {
        if (data) setTen(data.tenvai)
    }, [loading])
    return data?.status == 404 ?
        <div id="main">
            <div class="fof">
                <h1>Error 404</h1>
            </div>
        </div> : (
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
                        <h1>Thông tin chất liệu</h1>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="lastName"
                            name="lastName"
                            label="Tên chất liệu"
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
            </>
        )
}

export default Material