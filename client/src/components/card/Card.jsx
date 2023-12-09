import React from 'react';
import './style.css';
const baseUrl = process.env.REACT_APP_BASE_URL;

const Card = ({cover}) => {
  return (
    <div className='card'>
      <img className='posterImg' src={`${baseUrl}/${cover}`} alt=''/>
    </div>
  )
}

export default Card;
