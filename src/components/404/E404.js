import React from 'react'
import './E404.scss'
import { useNavigate } from 'react-router-dom'
export default function E404() {
  const navigate = useNavigate()
  return (
    <div id="main">
      <div className="fof">
        <h1>Error 404</h1>
      </div>
      <div className='btnWrapper'>
        <button className='btnBack' onClick={() => navigate("/")}>Back to home page</button>
      </div>
    </div>
  )
}

