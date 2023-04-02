import React, { useState, useEffect, useRef } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';

import axiosConfig from '../Common/axiosConfig';
import Movies from './Movies';

const Dashboard = () => {
  const effectRan = useRef(false);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState('');
  const [data1, setData1] = useState('https://i.ibb.co/KrW98MJ/nofilefound.png');
  const [data2, setData2] = useState(data1);
  const [data3, setData3] = useState(data1);

  const fetchData = () => {
    axiosConfig.get('user/dashboard')
    .then(response=>{
      var dt = response.data;
      setIsLoading(false);
      setError(false);
      setData(dt);
      setData1(`https://image.tmdb.org/t/p/w300${dt[0]['image']}`)
      setData2(`https://image.tmdb.org/t/p/w300${dt[1]['image']}`)
      setData3(`https://image.tmdb.org/t/p/w300${dt[2]['image']}`)
    // console.log(`https://image.tmdb.org/t/p/w500${dt[0]['image']}`);
    })
    .catch(error=>{
      console.log(error.message);
      setIsLoading(false);
      setError(true);
    })
  }

  useEffect(()=>{
    if(!effectRan.current){
      fetchData(); 
    }
    return () => effectRan.current = true;
  }, [])

  return (
    <div className="">
    {isLoading ? null :
    error ? <strong style={{ color: 'red' }}>Error. Please try again...</strong> :
    <Carousel className="" variant="dark">
      <Carousel.Item>
        <img
          className="d-block w-100 "
          src={data1}
          alt="First slide"
          height="657px"
        />
        <Carousel.Caption>
          <h5 style={{ color: 'white' }} >{data && data[0]['name']}</h5>
          <p style={{ color: 'white' }} >{data && data[0]['description']}</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={data2}
          alt="Second slide"
          height="657px"
        />
        <Carousel.Caption>
        <h5 style={{ color: 'white' }} >{data && data[1]['name']}</h5>
          <p style={{ color: 'white' }} >{data && data[1]['description']}</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={data3}
          alt="Third slide"
          height="657px"
        />
        <Carousel.Caption>
            <h5 style={{ color: 'white' }}>{data && data[2]['name']}</h5>
          <p style={{ color: 'white' }}>{data && data[2]['description']}</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    }
    <Container id="movieList">
      <Movies url='user/movielist' />
    </Container>
    </div>
  )
}

export default Dashboard