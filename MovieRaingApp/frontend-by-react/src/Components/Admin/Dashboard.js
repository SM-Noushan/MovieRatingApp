import React, { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Button from 'react-bootstrap/Button';
import ReactPaginate from 'react-paginate';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';

import axiosConfig from '../Common/axiosConfig';
import Search from '../Common/Search';
import '../Common/Pagination.css';

const Dashboard = () => {
  //pagination
  const [pageNumber, setPageNumber] = useState(0);
  const userPerPage = 10;
  const pageVisited = pageNumber * userPerPage;
  //pagination
  
  const effectRan = useRef(false);
  const [addMovie, setAddMovie] = useState(false);
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState('');
  const [moviesCopyData, setMoviesCopyData] = useState(movies);
  const [movieCount, setMovieCount] = useState('');
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = () => {
    axiosConfig.get('admin/dashboard')
    .then(response=>{
      var data = response.data;
      setMovieCount(data.length);
      setIsLoading(false);
      setError(false);
      if(data.length > 0){
        setPage((data.length/20)+1);
        setMovies(data);
        setMoviesCopyData(data);
      }
      if(data.length === 0){
        setAddMovie(true);
      }
    })
    .catch(error=>{
      console.log(error.message);
      setIsLoading(false);
      setError(true);
    })
  }

  const addData = () => {
    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=d824ba9cff4df73effa01e74f093c300&language=en-US&page=${page}`)
    .then(response=>{
      var res = response.data;
      // console.log(res.results);
      axiosConfig.post('/admin/movie/add', res.results)
      .then(response=>{
        var data = response.data;
        // console.log(data);
        fetchData();
      })
      .catch(error=>{
        console.log(error.message);
        setIsLoading(false);
        setError(true);
      })
      // setMovies(res);
    })
    .catch(error=>{
      console.log(error.message);
    })
  }

  const handleRegister = () => {
    addData();
  }

  const displayMovies = movies ? moviesCopyData
    .slice(pageVisited,pageVisited + userPerPage)
    .map((data, index) => (
        <tr key={index} style={{ textAlign:"justify", verticalAlign: "middle" }}>
            <td>{(pageVisited+index+1)}</td>
            <td>
                <img
                className="d-block w-100"
                src={`https://image.tmdb.org/t/p/w300${data['image']}`}
                alt="movie.img"
                height="80px"
                />
            </td>
            <td>{data.name}</td>
            <td>{data.description}</td>
            <td style={{ textAlign: "center" }}>{data.release_year}</td>
            <td style={{ textAlign: "center" }}>{data.rating}</td>
            <td>
                <Button className="me-2" variant="info" as={Link} to={`/admin/movie/edit/${data.id}`} state={data} >Edit</Button>   
            </td>
        </tr>
    )) : null
    
    const pageCount = movies ? Math.ceil(moviesCopyData.length / 10) : 0
    const changePage = ({selected}) => setPageNumber(selected)

    const handleSearch = (searchText) => {
      setPageNumber(0);
      // console.log('search');
      let value = searchText.toLowerCase();
      if(movies){
          const newData = movies.filter((data)=>{
          const userName = data.name.toLowerCase();
          if(userName.startsWith(value))
            return userName.startsWith(value);
          })
        setMoviesCopyData(newData);
      }
    }
  
  useEffect(()=>{
    if(!effectRan.current){
      fetchData(); 
    }
    return () => effectRan.current = true;
  }, [])

    return (
      <div>
      <Card className="mt-4">
      <Card.Header>
          <Breadcrumb>Movie List <br />Total Movies: {movieCount} </Breadcrumb>
      </Card.Header>
      <Card.Body>
          <Card.Title className="mb">
          <Row className="g-2">
            <Col md={10}><Search onHandleSearch={handleSearch} /></Col>
            <Col md className='pt-1' style={{ textAlign: 'center' }}>
            <Button variant="danger" size="lg" onClick={()=>{handleRegister()}} active={page <= 100 ? true : false} disabled={page === 101 ? true : false}>Register</Button>
            </Col>
          </Row>
          </Card.Title>
          
          {isLoading ? <strong style={{ color: 'yellow' }}>Data Loading. Please Wait a Moment...</strong> : 
          <Table bordered hover  responsive="md">
          <thead>
              <tr style={{ textAlign:"center", verticalAlign: "middle" }}>
              <th>#</th>
              <th>Poster</th>
              <th>Name</th>
              <th>Description</th>
              <th>Release Year</th>
              <th>Rating (10)</th>
              <th>Action</th>
              </tr>
          </thead>
          <tbody>
          {!displayMovies && <tr><td colSpan='6' style={{ backgroundColor: 'yellow', textAlign: 'center' }}><strong>Movies Data Not Available</strong></td></tr>}
          { displayMovies }
          </tbody>
          {displayMovies && 
          <tfoot>
            <tr>
              <td colSpan="6" className="pt-4">
              <ReactPaginate 
                  previousLabel="<Previous>"
                  nextLabel="<Next>"
                  pageCount={pageCount}
                  onPageChange={changePage}
                  containerClassName={"paginationBttns"}
                  disabledClassName={"paginationDisabled"}
                  activeClassName={"paginationActive"}
                  renderOnZeroPageCount={null}
                  forcePage={pageNumber}
              />
              </td>
            </tr>
          </tfoot>}
          </Table>}
          {error ? <strong style={{ color: 'red' }}>Unexpected Error. Please Try Again</strong> : null} 
      </Card.Body>
      </Card>
      </div>
        
    )
}

export default Dashboard