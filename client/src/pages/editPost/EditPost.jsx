import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import { useFormik } from "formik";
import * as Yup from "yup";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router";
import { UserContext } from "../../components/context/UserContext";
const baseUrl = process.env.REACT_APP_BASE_URL;

function stripHtmlTags(html) {
    // Create a temporary div element
    const tempDiv = document.createElement('div');
    
    // Set the HTML content of the div
    tempDiv.innerHTML = html;
  
    // Get the text content (strips HTML tags)
    const plainText = tempDiv.textContent || tempDiv.innerText;
  
    // Clean up the temporary div
    tempDiv.remove();
  
    return plainText;
  }

const EditPost = () => {
  const { userInfo } = useContext(UserContext);
  const {postId} = useParams();
  const navigate = useNavigate();
  const [postToEdit, setPostToEdit] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
     const fetchPostData = async ()=>{
      try{  
      const response = await fetch(`${baseUrl}/post/${postId}`, {
        method: 'GET'
      });
       if(!response.ok){
        window.alert(`Error occured, please try to login again`);
        throw new Error(`HTTP error! Status: ${response.status}`);
       }
       const data = await response.json();
       setPostToEdit({
        title: data.post.title,
        summary: data.post.summary,
        content: data.post.content,
       })
       setLoading(false); 
    }catch(error){
        console.log("Error fetching post data", error.message);
        window.alert("Unable to find post");
        navigate(`/post/${postId}`);
    }
     };
     fetchPostData();
  },[postId]);

  
  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    summary: Yup.string().required("Summary is required"),
    file: Yup.mixed().notRequired(),
    content: Yup.string().required("Content is required"),
  });

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
  ];

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
        title: postToEdit?.title || "",
        summary: postToEdit?.summary || "",
        content: postToEdit?.content || "",
        file: null,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
       let response = null; 
      try {
        const cleanContent = stripHtmlTags(values.content);
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("summary", values.summary);
        formData.append("content", cleanContent);
        formData.append("author", userInfo._id);

        if (values.file !== null && values.file !== undefined) {
            formData.append("file", values.file);
          }
        const token = localStorage.getItem('token');
        response = await fetch(`${baseUrl}/post/edit/${postId}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        if (data.status === "success") {
          window.alert(`${data.message}`);
          navigate(`/post/${postId}`);
        
        } else {
          window.alert("Unable to edit the post !");
          navigate(`/post/${postId}`);
        }
      } catch (error) {
        window.alert("Unable to edit post, try logging in again!");
        navigate(`/post/${postId}`);
      }
    },
  });

  return (
    <ContentWrapper>
      {loading ? (  
        <div className="loading">Loading...</div>
      ) : (<form className="create" onSubmit={formik.handleSubmit}>
        <div className="postHeading">
          <h1>
            Edit Post - <span className="headingSpan">{postToEdit?.title}</span>
          </h1>
        </div>
        <div className="emailPassword">
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Title"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
          />
          {formik.touched.title && formik.errors.title ? (
            <div className="errorPost">{formik.errors.title}</div>
          ) : null}
        </div>

        <div className="emailPassword">
          <input
            type="text"
            id="summary"
            name="summary"
            placeholder="Summary"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.summary}
          />
          {formik.touched.summary && formik.errors.summary ? (
            <div className="errorPost">{formik.errors.summary}</div>
          ) : null}
        </div>

        <div className="emailPassword">
          <input
            type="file"
            id="file"
            name="file"
            onChange={(event) =>
              formik.setFieldValue("file", event.target.files[0])
            }
          />
          {formik.touched.file && formik.errors.file ? (
            <div className="errorPost">{formik.errors.file}</div>
          ) : null}
        </div>

        <div className="quillContainer quill">
          <ReactQuill
            id="content"
            name="content"
            value={formik.values.content}
            onChange={(value) => formik.setFieldValue("content", value)}
            modules={modules}
            formats={formats}
          />
          {formik.touched.content && formik.errors.content ? (
            <div className="errorPost">{formik.errors.content}</div>
          ) : null}
        </div>

        <button type="submit" className="publish">
          Save Changes
        </button>
      </form>)}
    </ContentWrapper>
  );
};

export default EditPost;