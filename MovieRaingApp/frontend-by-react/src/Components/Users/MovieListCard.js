import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Rate } from 'antd';

import axiosConfig from '../Common/axiosConfig';

const MovieListCard = (props) => {
  const effectRan = useRef(false);
  const navigate = useNavigate();
  const [rated, setRated] = useState(false);
  const [rateValue, setRateValue] = useState(0);
  const [myRate, setMyRate] = useState(0);

  const handleRate = (id) => {
    const userinfo = JSON.parse(localStorage.getItem('data'));
    var data = {usermail: userinfo['userid'], movie_id: id, rating: myRate}
    // console.log(data);
    axiosConfig.post('user/movie/rate', data)
    .then(response=>{
      var data = response.data;
      // console.log(data);
      navigate('/user/ratings');
    })
    .catch(error=>{
      console.log(error.message);
    })
  }
  const func = (value) => {
    // console.log(value)
    setRateValue(0)
    setRated(false)
    if(props.myRatings.length){
      props.myRatings.map(data => {
          if(data['movie_id'] === value){
            console.log(value);
            console.log(data['ratings'])
              setRated(true);
              setRateValue(data['ratings']);
          }        
      })
    } 
  }
  
  useEffect(()=>{
    if(!effectRan.current){
        // if(props.myRatings.length){
        //     props.myRatings.map(data => {
        //         if(data['movie_id'] === props.movie.id){
        //             setRated(true);
        //             setRateValue(data['ratings']);
        //         }        
        //     })
        // } 
      }
    return () => effectRan.current = true;
  }, [])
  return (
    <Col>
        <Card  border="info" style={{ width: '18rem' }}>
            <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w300${props.movie.image}`} alt="movie.img" height="200px" onLoad={()=>func(props.movie.id)} />
            <Card.Body >
              <Card.Title style={{ textAlign: "justify", height: "7.5rem"}}>
                {props.movie.name} <br /> 
                <small className="text-muted" style={{ fontWeight: "100px" }}>({props.movie.release_year.slice(0, 4)})</small> <br />
                <small> Rating #{props.movie.rating} </small>
              </Card.Title>
              <Card.Text style={{ textAlign: "justify", height: "6rem"}}>
                {props.movie.description ? props.movie.description.slice(0, 100) : '***MISSING_DESCRIPTION***'}
                {props.movie.description && <Link style={{ textDecoration: "none" }}> ...continue</Link>}
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">
                { rated ? <Rate allowHalf disabled defaultValue={rateValue / 2} /> : null }
                { !rated ? <Rate allowHalf onChange={(value)=>setMyRate(value)} /> : null }
                <Button className="me-2" variant="outline-primary" size="sm" style={{ float: "right" }} onClick={()=>handleRate(props.movie.id)} disabled={rated ? true : false}>{rated ? 'Rated' : 'Rate'}</Button>
              </small>
            </Card.Footer>
        </Card>
    </Col>
  )
}

export default MovieListCard