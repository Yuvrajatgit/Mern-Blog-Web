import React, {useContext} from 'react';
import { UserContext } from '../../components/context/UserContext';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ContentWrapper from '../../components/contentWrapper/ContentWrapper';
import './style.css';
const baseUrl = process.env.REACT_APP_BASE_URL;

const Register = () => {

  const navigate = useNavigate();
  const {setUserInfo} = useContext(UserContext);

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('Required'),
      lastName: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: async (values) => {
      // Handle registration logic here

      try {
        const response = await fetch(`${baseUrl}/auth/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        const data = await response.json();

        if(data.status === "success" && data.token){
           localStorage.setItem('token', data.token);
           window.alert("Registration successful !");
           setUserInfo(data.data.user);
           navigate('/');
        
        } else {
          window.alert("Registration Failed, please try again with a different email !");

        }
      } catch (error) {
        console.error('Error posting data:', error);
        window.alert('Unable to register right now, please try again later !');
      }
    },
  });


  return (
    <div className='registerPage'>
    <ContentWrapper>
    <form className='login' onSubmit={formik.handleSubmit}>
      <h1 style={{fontWeight: 'bold'}}>Register</h1>
      <div className='emailPassword'>
        <input
          type="text"
          id="firstName"
          name="firstName"
          placeholder='First Name'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.firstName}
        />
        {formik.touched.firstName && formik.errors.firstName ? (
          <div className='error'>{formik.errors.firstName}</div>
        ) : null}
      </div>

      <div className='emailPassword'>
        <input
          type="text"
          id="lastName"
          name="lastName"
          placeholder='Last Name'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.lastName}
        />
        {formik.touched.lastName && formik.errors.lastName ? (
          <div className='error'>{formik.errors.lastName}</div>
        ) : null}
      </div>

      <div className='emailPassword'>
        <input
          type="email"
          id="email"
          name="email"
          placeholder='Email'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? (
          <div className='error'>{formik.errors.email}</div>
        ) : null}
      </div>

      <div className='emailPassword'>
        <input
          type="password"
          id="password"
          name="password"
          placeholder='Password'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password ? (
          <div className='error'>{formik.errors.password}</div>
        ) : null}
      </div>

      <div className='loginBtn'>
        <button className='btn' type="submit">Register</button>
      </div>
    </form>
    </ContentWrapper>
    </div>
  )
}

export default Register;
