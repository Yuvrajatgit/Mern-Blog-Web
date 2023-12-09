import React, {useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { UserContext } from '../../components/context/UserContext';
import ContentWrapper from '../../components/contentWrapper/ContentWrapper';
import './style.css';
const baseUrl = process.env.REACT_APP_BASE_URL;

const Login = () => {
  const {setUserInfo} = useContext(UserContext);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: async(values) => {
      try{
        const response = await fetch(`${baseUrl}/auth/login`,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values)
        });

      const data = await response.json();
      if(data.status === "success" && data.token){  
        localStorage.setItem('token', data.token);    
        window.alert("Login successful !");
        setUserInfo(data.data.user);
        navigate('/');
     } else {
      throw new Error('Unable to log you in right now !');
     }
      } catch(err){
        window.alert('Unable to login right now, please try again later or check your email and password !');
      }
    },
  });

  return (
    <div className='loginPage'>
    <ContentWrapper>
    <form className='login' onSubmit={formik.handleSubmit}>
      <h1>Login</h1>
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

      <div className='loginBtn' >
        <button className='btn' type="submit">Login</button>
      </div>
    </form>
    </ContentWrapper>
    </div>
  )
};

export default Login;
