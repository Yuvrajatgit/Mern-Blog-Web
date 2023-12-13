import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { Link, useParams } from "react-router-dom";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import {UserContext} from '../../components/context/UserContext';
const baseUrl = process.env.REACT_APP_BASE_URL;

const PostPage = () => {
  const [postData, setPostData] = useState(null);
  const {userInfo} = useContext(UserContext);
  const { postId } = useParams();
  const navigate = useNavigate();

  const handleDelete = async ()=>{
   try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${baseUrl}/post/delete/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    const data = await response.json();
    if (data.status === "success") {
      window.alert(`Post Deleted Successfully !`);
      navigate(`/`);
    } else {
      throw new Error("Unable to delete the post, try logging in again !");
    }
   }catch(error){
    window.alert(`${error}`)
    navigate(`/`);
   }
  };

  useEffect(() => {
    const postData = async () => {
      try {
        const response = await fetch(`${baseUrl}/post/${postId}`, {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const fetchedPostData = await response.json();
        setPostData(fetchedPostData);
      } catch (error) {
        console.log("Error fetching post data", error);
        window.alert("Unable to find post");
        navigate('/');
      }
    };
    postData();
  }, [postId]);

  return (
    <div className="postPage">
      {postData && (

          <ContentWrapper>
            <div className="postContent"> 
            <div className="postImg">
              <img
                className="img"
                src={postData.post.cover} 
                alt={postData.post.title}
              />
            </div>
            <div className="author">
            <div className="postAuthor">Blog created by {postData.post.author.firstName+(" ")+postData.post.author.lastName}</div>   
            {userInfo?._id === postData?.post?.author?._id ? (<div className="postAuthor"><Link className="edit" to={`/post/edit/${postData.post._id}`}>Edit this post <CiEdit/> </Link></div>) : ""}
            </div>
            <div className="postText">
                <div className="postTitle">{postData.post.title}</div>
                <div className="postSummary">{postData.post.summary}</div>
                <div className="postDataContent">{postData.post.content}</div>
            </div>
            {userInfo?._id === postData?.post?.author?._id ? (<div className="deletePost"><button className="delete" onClick={handleDelete}>Delete this post</button></div>) : ""}
            </div>
          </ContentWrapper>
      )}
    </div>
  );
};

export default PostPage;
