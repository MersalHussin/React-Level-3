import React from 'react'
import "../pages/P404.css"
import { Link } from 'react-router-dom'

function P404() {
  return (
<div className="content" >
  <svg viewBox="0 0 960 300">
    <symbol id="s-text">
      <text textAnchor="middle" x="50%" y="50%">
        404
      </text>
    </symbol>
    <g className="g-ants">
      <use xlinkHref="#s-text" className="text" />
      <use xlinkHref="#s-text" className="text" />
      <use xlinkHref="#s-text" className="text" />
      <use xlinkHref="#s-text" className="text" />
      <use xlinkHref="#s-text" className="text" />
    </g>
  </svg>
  <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,10px)"}}>
  <h1>Page Not Found</h1>
  <Link className='button' to="/">Back to Home</Link>
  </div>
</div>
  )
}

export default P404