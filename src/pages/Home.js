import React, { useState, useEffect } from 'react'
import Grid from '../comps/Grid';
import Navbar from '../comps/Navbar';
import { Navigate } from 'react-router-dom';
import { getUser } from '../logic/Get';





const Home = (props) => {
  const [user, setUser] = useState({});
  const [data, setData] = useState([]);

  const getImages = async () => {
    let responseImage = await fetch(`${process.env.REACT_APP_URL}/api/v1/all`);
    let jsonImage = await responseImage.json();
    setData(jsonImage.data);
    console.log(jsonImage.data);
  }


  useEffect(() => {
    props.setLoader(30);
    getUser(setUser);
    getImages();
    props.setLoader(100);
  }, [])

  if (!localStorage.getItem("id")) {
    return <Navigate to='/auth/login' replace />;
  }
  return (
    <>
      <Navbar url={user.userProfile} />
      <Grid data={data} />
    </>
  )
}

export default Home;