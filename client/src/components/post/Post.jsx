import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../card/Card';
import './style.css';
import ContentWrapper from '../contentWrapper/ContentWrapper';
import { Link } from 'react-router-dom';
import {format} from 'date-fns';

const Post = ({time,title,summary,content,cover,author, id : postId}) => {

  const navigate = useNavigate();

  const handleClick = ()=>{
    navigate(`/post/${postId}`);
  };

  return (
      <ContentWrapper>
        <div className='post' onClick={handleClick}>
            <Card cover={cover}/>
            <div className='content'>
              <h2 className='title'>{title}</h2>
              <p className='info'>
                <Link to='/details' className='author'>{`${author.firstName} ${author.lastName}`}</Link>
                <time>{format(new Date(time), 'MMM d, yyyy HH:mm')}</time>
              </p>
              <p className='subTitle'>{content.split(' ').slice(0, 66).join(' ') + (content.split(' ').length > 66 ? ' ...' : '')}</p>
            </div>
        </div>
      </ContentWrapper>
  )
};

export default Post;
