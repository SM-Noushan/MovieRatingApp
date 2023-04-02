import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Button from 'react-bootstrap/Button';
import ReactPaginate from 'react-paginate';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import axiosConfig from '../../Common/axiosConfig';
import Search from '../../Common/Search';
import '../../Common/Pagination.css';

const View = () => {
  const [pageNumber, setPageNumber] = useState(0);
  const userPerPage = 5;
  const pageVisited = pageNumber * userPerPage;


  const effectRan =useRef(false);
  const navigate = useNavigate();
  const [data, setData] = useState('');
  const [originData, setOriginData] = useState('');
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const fetchData = () => {
    axiosConfig.get('admin/user/view')
    .then(response=>{
      setOriginData(response.data);
      setData(response.data);
      setIsLoading(false);
      setError(false);
    })
    .catch(error=>{
        setError(true);
        setIsLoading(false);
        // console.log(error.message);
    })
  }
  // const handleDelete = (id) => {
  //   axiosConfig.delete(`admin//remove/${id}`)
  //   .then(response=>{
  //     // console.log(response.data);
  //     const filter = data.filter((data)=>data.id !== id);
  //     setData(filter);
  //   })
  //   .catch(error=>{
  //       // console.log(error.message);
  //   })
  // }
  const handleBan = (id) => {
    axiosConfig.post(`admin/user/ban/${id}`)
    .then(response=>{
      setOriginData(response.data);
      setData(response.data);
      setIsLoading(false);
      setError(false);
    })
    .catch(error=>{
        setError(true);
        setIsLoading(false);
        // console.log(error.message);
    })
  }
  const handleUnban = (id) => {
    axiosConfig.post(`admin/user/unban/${id}`)
    .then(response=>{
      setOriginData(response.data);
      setData(response.data);
      setIsLoading(false);
      setError(false);
    })
    .catch(error=>{
        setError(true);
        setIsLoading(false);
        // console.log(error.message);
    })
  }
  const handleSearch = (searchText) => {
    setPageNumber(0);
    // console.log('abc');
    let value = searchText.toLowerCase();
    if(originData){
        const newData = originData.filter((data)=>{
        const userName = data.name.toLowerCase();
        if(userName.startsWith(value))
          return userName.startsWith(value);
        const userNameS = data.email.toLowerCase();
          return userNameS.startsWith(value);
      })
      setData(newData);
    }
  };
  const displayUsers = originData ? data
    .slice(pageVisited,pageVisited + userPerPage)
    .map((data, index) => (
        <tr key={index}>
            <td>{(pageVisited+index+1)}</td>
            <td>{data.name}</td>
            <td>{data.email}</td>
            <td>{data.status}</td>
            <td>{data.created_at}</td>
            <td>
                <Button className="me-2" variant="info" as={Link} to={`/admin/user/edit/${data.id}`} state={data} >Edit</Button>
                {data.status === 'Active' ? <Button variant="danger" onClick={()=>{handleBan(data.id)}}>Ban</Button> :   
                 <Button variant="danger" onClick={()=>{handleUnban(data.id)}}>Unban</Button> }
            </td>
        </tr>
    )) : null
    // Math.ceil(length / 5)
    const pageCount = originData ? Math.ceil(data.length / 5) : 0
    const changePage = ({selected}) => setPageNumber(selected)

  useEffect(()=>{
    if(!effectRan.current)
        fetchData();
    return () => effectRan.current = true;
  }, [])

  return (
    <div>
        <Card className="mt-4">
        <Card.Header>
            <Breadcrumb>
            {/* as={Link} to="admin/dashboard" */}
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/admin/dashboard" }}> Dashboard </Breadcrumb.Item>
                <Breadcrumb.Item > User </Breadcrumb.Item>
                <Breadcrumb.Item active>View</Breadcrumb.Item>
            </Breadcrumb>
        </Card.Header>
        <Card.Body>
            <Card.Title className="mb">
            <Row className="g-2">
              <Col md className='pt-3'>
                Registered User's information 
              </Col>
              <Col md><Search onHandleSearch={handleSearch} /></Col>
            </Row>
            </Card.Title>
            
            {isLoading ? <strong style={{ color: 'yellow' }}>Data Loading. Please Wait a Moment...</strong> : 
            <Table bordered hover>
            <thead>
                <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Joined</th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody>
            {data && data.length===0 && <tr><td colSpan='6' style={{ backgroundColor: 'yellow', textAlign: 'center' }}><strong>No Data Found</strong></td></tr>}
            { displayUsers }
            </tbody>
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
            </tfoot>
            </Table>}
            {error ? <strong style={{ color: 'red' }}>Unexpected Error. Please Try Again</strong> : null} 
        </Card.Body>
        </Card>
    </div>
  )
}

export default View