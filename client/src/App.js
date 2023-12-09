import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import Header from './components/header/Header';
import Home from './pages/home/Home';
import Footer from './components/footer/Footer';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import { UserContextProvider } from './components/context/UserContext';
import CreatePost from './pages/createPost/CreatePost';
import PostPage from './pages/postPage/PostPage';
import EditPost from './pages/editPost/EditPost';
import NotFound from './pages/notFound/NotFound';

function App() {
  return (
    <BrowserRouter>
      <UserContextProvider>
      <Header/>
       <Routes>
        <Route index path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/create' element={<CreatePost/>}/>
        <Route path='/post/:postId' element={<PostPage/>}/>
        <Route path='/post/edit/:postId' element={<EditPost/>}/>
        <Route path="*" element={<NotFound />} />
       </Routes>
      <Footer/>
      </UserContextProvider>
      </BrowserRouter>
  );
}

export default App;
