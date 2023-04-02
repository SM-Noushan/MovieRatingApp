import React, { useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert'
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useFormik } from 'formik';
import * as yup from 'yup';

import axiosConfig from '../Common/axiosConfig';


const Add = () => {
    // const navigate = useNavigate();
    const location = useLocation();
    const [servererrors, setServerErrors] = useState({});
    const [show, setShow] = useState(false);
    const [success, setSuccess] = useState(false);
    const formik = useFormik({
        initialValues: {
            name: location.state.name,
            description: location.state.description,
            date: location.state.release_year,
          },
          validationSchema: yup.object({
            name: yup.string().required('Required'),
            description: yup.string(),
            date: yup.string().matches(/^[0-9]{4}-(((0[13578]|(10|12))-(0[1-9]|[1-2][0-9]|3[0-1]))|(02-(0[1-9]|[1-2][0-9]))|((0[469]|11)-(0[1-9]|[1-2][0-9]|30)))$/, "format: yyyy-MM-dd, ex. 2000-02-29").required('Required'),
            }),
          onSubmit: (values) => {
            console.log(values);
            axiosConfig.post(`/admin/movie/edit/${location.state.id}`, values)
            .then(response=>{
                var data = response.data;
                // console.log(data);
                if(data['errors']){
                    // console.log(data);
                    setSuccess(false);
                    setServerErrors(data);
                    setShow(true);
                }
                else{
                    setShow(false);
                    setSuccess(true);
                }
            }).catch(error=>{
                console.log(error);
            });
          }
    });
    if( success ){
        setTimeout(()=>{
            setSuccess(false)
        }, 3000)
    }
    // useEffect(()=>{
    //     axiosConfig.get('admin/state')
    //     .then(response=>{
    //     })
    //     .catch(error=>{
    //     // console.log(error.message);
    //     navigate('/admin');
    //     })
    // },[]);

    const renderNameError = formik.touched.name && formik.errors.name && (
                <span style={{ color: 'red' }}>{formik.errors.name}</span>);
    const renderDateError = formik.touched.date && formik.errors.date && (
                <span style={{ color: 'red' }}>{formik.errors.date}</span>);
    const renderDescriptionError = formik.touched.description && formik.errors.description && (
                <span style={{ color: 'red' }}>{formik.errors.description}</span>);

  return (
        <Card className="mt-4 p-4" style={{ width: '55%', left: '23%' }}>
        <Card.Header>
            <Breadcrumb>
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/admin/dashboard" }}> Dashboard </Breadcrumb.Item>
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/admin/dashboard" }}> Movies </Breadcrumb.Item>
                <Breadcrumb.Item active>Edit</Breadcrumb.Item>
            </Breadcrumb>
        </Card.Header>
        <Card.Body>
            <Card.Title className="mb-4">Update Movie's information</Card.Title>
            <div>
                { success ? <Alert variant="success" onClose={() => setSuccess(false)} dismissible>
                                <Alert.Heading>Successfully Updated</Alert.Heading>
                            </Alert> : null }
                { show ? <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                                <Alert.Heading>Error!</Alert.Heading>
                                {servererrors['errors']['name'] && servererrors['errors']['name'].map((err, i)=><p className="pb-0 mb-0" key={i}>{err}</p>)}
                                {servererrors['errors']['date'] && servererrors['errors']['date'].map((err, i)=><p className="mb-0 pb-0" key={i}>{err}</p>)}
                                {servererrors['errors']['description'] && servererrors['errors']['description'].map((err, i)=><p className="pb-0 mb-0" key={i}>{err}</p>)}
                            </Alert> : null}
                <Form onSubmit={formik.handleSubmit}>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>
                    Name
                    </Form.Label>
                    <Col sm={10}>
                    <Form.Control type="text" name="name" value={formik.values.name} onChange={formik.handleChange} required />
                    {renderNameError}
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>
                    Description
                    </Form.Label>
                    <Col sm={10}>
                    <Form.Control as="textarea" rows={5} name="description" value={formik.values.description} onChange={formik.handleChange} required />
                    {renderDescriptionError}
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>
                    Release Date
                    </Form.Label>
                    <Col sm={10}>
                    <Form.Control type="text" name="date" value={formik.values.date} onChange={formik.handleChange} required />
                    {renderDateError}
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Col sm={{ span: 10, offset: 2 }}>
                    <Button type="submit" style={{ float: 'right' }}>Update</Button>
                    </Col>
                </Form.Group>
                </Form>
            </div>
        </Card.Body>
        </Card>
  )
}

export default Add