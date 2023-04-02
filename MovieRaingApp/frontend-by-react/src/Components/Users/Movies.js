import React, { useState, useEffect, useRef } from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import ReactPaginate from 'react-paginate';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import axiosConfig from '../Common/axiosConfig';
import MovieListCard from './MovieListCard';
import Search from '../Common/Search';
import '../Common/Pagination.css';

const Movies = ({url}) => {
  //pagination
  const [pageNumber, setPageNumber] = useState(0);
  const userPerPage = 20;
  const pageVisited = pageNumber * userPerPage;
  //pagination
  
  const effectRan = useRef(false);
  const [movies, setMovies] = useState('');
  const [myRating, setMyRating] = useState('');
  const [moviesCopyData, setMoviesCopyData] = useState(movies);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = () => {
    axiosConfig.get(url)
    .then(response=>{
      var data = response.data;
      setIsLoading(false);
      setError(false);
      setMovies(data['movies']);
      setMyRating(data['myRatings']);
      setMoviesCopyData(data['movies']);
    })
    .catch(error=>{
      console.log(error.message);
      setIsLoading(false);
      setError(true);
    })
  }

  const handleSearch = (searchText) => {
    setPageNumber(0);
    // console.log('search');
    let value = searchText.toLowerCase();
    if(movies){
        const newData = movies.filter((data)=>{
        const movieName = data.name.toLowerCase();
          return movieName.startsWith(value);
        })
      setMoviesCopyData(newData);
    }
  }

  const displayMovies = movies ? (
      <Row xs={1} md={3} lg={4} className="g-4">
        {moviesCopyData
        .slice(pageVisited,pageVisited + userPerPage)
        .map((data, index) =>
          <MovieListCard key={index} movie={data} myRatings={myRating} /> )}
      </Row>) : null
    // Math.ceil(length / 5)
    const pageCount = movies ? Math.ceil(moviesCopyData.length / 20) : 0
    const changePage = ({selected}) => setPageNumber(selected)
  
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
          <Breadcrumb>Total: {movies && <strong>{movies.length}</strong>} </Breadcrumb>
      </Card.Header>
      <Card.Body>
          <Card.Title className="mb">
          <Row className="g-2">
            <Col lg><Search onHandleSearch={handleSearch} /></Col>
          </Row>
          </Card.Title>
          <div style={{ textAlign: "justify"}}>
            <Row>
            {isLoading ? <strong style={{ color: 'yellow' }}>Data Loading. Please Wait a Moment...</strong> : 
              !displayMovies && <Alert variant="warning" style={{textAlign: 'center'}}>Movies Data Not Available!</Alert>}
              { displayMovies }
            </Row>
            {displayMovies && <Row className="mt-4">
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
            </Row>}
            {error ? <Alert variant="danger" style={{textAlign: 'center'}}>Unexpected Error! Please Try Again.</Alert> : null} 
          </div>
      </Card.Body>
      </Card>
      </div>
        
    )
}

export default Movies