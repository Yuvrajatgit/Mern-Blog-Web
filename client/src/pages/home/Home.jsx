import React, { useEffect, useState } from 'react';
import Post from '../../components/post/Post';
import './style.css';
const baseUrl = process.env.REACT_APP_BASE_URL;

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  useEffect(()=>{

   const fetchData = async()=>{
    try{
      
    console.log(`${baseUrl}/post`);

    const response = await fetch(`${baseUrl}/post`, {
      method: 'GET',
    })
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const fetchedPosts = await response.json();
    setPosts(fetchedPosts.posts);
   }catch (error){
    setError(error);
    console.log('Error fetching posts', error);
    window.alert('Unable to find posts, please try again after some time.');
   }
  } 
   fetchData();
  }, []);

  return (
    <div className='homePage'>
      {!error ? (posts.map((post)=>(
        <Post
        key={post._id}
        id={post._id}
        title={post.title}
        summary={post.summary}
        content={post.content}
        cover={post.cover}
        time={post.createdAt}
        author={post.author}/>
      ))) : <div className='unableFetch'>Unable to fetch posts from server, try again Later ! :/</div>}
    </div>
  )
}

export default Home;



