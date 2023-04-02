import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

const Search = (props) => {
    const [search, setSearch] = useState('');
    const handleChange = (e) => {
      setSearch(e.target.value);
    };

    useEffect(() => {
        props.onHandleSearch(search);
    }, [search]);
  return (
    <>
      <FloatingLabel
        controlId="floatingInput"
        label="Search"
        className="mb-3"
      >
        <Form.Control type="text" placeholder="Search" value={search} onChange={(e)=>handleChange(e)} />
      </FloatingLabel>
    </>
  )
}

export default Search;