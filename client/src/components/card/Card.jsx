import React from 'react';
import './style.css';

const Card = ({cover}) => {

  return (
    <div className='card'>
      <img className='posterImg' src={cover} alt='No Image Found'/>
    </div>
  )
}

export default Card;
