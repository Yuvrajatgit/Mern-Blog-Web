import React, { useContext } from "react";
import ReactQuill from "react-quill";
import { useFormik } from "formik";
import * as Yup from "yup";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import "react-quill/dist/quill.snow.css";
import "./style.css";
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

const CreatePost = () => {
  const { userInfo } = useContext(UserContext);
  const navigate = useNavigate();

  // Define Yup validation schema
  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    summary: Yup.string().required("Summary is required"),
    file: Yup.mixed().required("File is required"),
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
    "image",
  ];

  // Initialize Formik
  const formik = useFormik({
    initialValues: {
      title: "",
      summary: "",
      file: null,
      content: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log("Form data:", values);
      try {
        const cleanContent = stripHtmlTags(values.content);
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("summary", values.summary);
        formData.append("content", cleanContent);
        formData.append("author", userInfo._id);

        if (values.file) {
          formData.append("file", values.file);
        }
        const response = await fetch(`${baseUrl}/post`, {
          method: "POST",
          body: formData,
        });
        const data = await response.json();
        console.log("Response from Post Api", data);
        if (data.status === "success") {
          window.alert(`${data.message}`);
          navigate("/");
        } else {
          window.alert("Unable to create a new post !");
        }
      } catch (error) {
        console.log("ERROR posting data", error);
        window.alert("Unable to create post, try logging in again!");
      }
    },
  });

  return (
    // <div className="form">
    <ContentWrapper>
      <form className="create" onSubmit={formik.handleSubmit}>
        <div className="postHeading">
          <h1>
            Create a <span className="headingSpan">New Post</span>
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
          Publish
        </button>
      </form>
    </ContentWrapper>
    // </div>
  );
};

export default CreatePost;
