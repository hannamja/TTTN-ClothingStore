import React, { useState } from 'react'
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase'
import BackspaceOutlinedIcon from '@mui/icons-material/BackspaceOutlined';
import './SearchBox.scss'
import { Link, useNavigate } from 'react-router-dom';


const Search = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));
const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer'
}));
const BackspaceIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer'
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '80%',
        [theme.breakpoints.up('sm')]: {
            width: '30ch',
            '&:focus': {
                // width: '40ch',
                borderBottom: '1px solid black'
            },
        },
    },
}));

const SearchBox = () => {
    const [input, setInput] = useState('')
    const navigate = useNavigate();
    const handldeChange = (e) => {
        setInput(e)
    }
    return (
        <div className='searchBox'>
            <Search>
                <Link to={`/products/search?name=${input}`}>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                </Link>

                <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={(e) => {
                        handldeChange(e.target.value)
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && input) {
                            navigate(`/products/search?name=${input}`)
                        }
                    }}
                    value={input}
                />
                <BackspaceIconWrapper onClick={() => { setInput('') }}>
                    <BackspaceOutlinedIcon />
                </BackspaceIconWrapper>
            </Search>
        </div>
    )
}

export default SearchBox