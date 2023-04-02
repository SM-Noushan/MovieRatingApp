import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
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

import axiosConfig from '../../Common/axiosConfig';


const Add = () => {
    const navigate = useNavigate();
    const [servererrors, setServerErrors] = useState({});
    const [show, setShow] = useState(false);
    const [success, setSuccess] = useState(false);
    const formik = useFormik({
        initialValues: {
            name: '',
            userid: '',
            password: '',
          },
          validationSchema: yup.object({
            name: yup.string().required('Required'),
            userid: yup.string().email('Must be a Valid Email Address').required('Required'),
            password: yup.string().required('Required').min(6, 'Minimum Password Length 6').max(32),
            }),
          onSubmit: (values, {resetForm}) => {
            // console.log(values);
            axiosConfig.post("http://127.0.0.1:8000/api/admin/user/add", values)
            .then(response=>{
                var data = response.data;
                if(data['errors']){
                    // console.log(data);
                    setSuccess(false);
                    setServerErrors(data);
                    setShow(true);
                }
                else{
                    setShow(false);
                    setSuccess(true);
                    resetForm({value: ''});
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
    const renderUseridError = formik.touched.userid && formik.errors.userid && (
                <span style={{ color: 'red' }}>{formik.errors.userid}</span>);
    const renderPasswordError = formik.touched.password && formik.errors.password && (
                <span style={{ color: 'red' }}>{formik.errors.password}</span>);

  return (
        <Card className="mt-4 p-4" style={{ width: '55%', left: '23%' }}>
        <Card.Header>
            <Breadcrumb>
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/admin/dashboard" }}> Dashboard </Breadcrumb.Item>
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/admin/user/view" }}> Users </Breadcrumb.Item>
                <Breadcrumb.Item active>Add</Breadcrumb.Item>
            </Breadcrumb>
        </Card.Header>
        <Card.Body>
            <Card.Title className="mb-4">Fill the user's information</Card.Title>
            <div>
                { success ? <Alert variant="success" onClose={() => setSuccess(false)} dismissible>
                                <Alert.Heading>Successfully Added</Alert.Heading>
                            </Alert> : null }
                { show ? <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                                <Alert.Heading>Error!</Alert.Heading>
                                {servererrors['errors']['name'] && servererrors['errors']['name'].map((err, i)=><p className="pb-0 mb-0" key={i}>{err}</p>)}
                                {servererrors['errors']['userid'] && servererrors['errors']['userid'].map((err, i)=><p className="mb-0 pb-0" key={i}>{err}</p>)}
                            </Alert> : null}
                <Form onSubmit={formik.handleSubmit}>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>
                    Name
                    </Form.Label>
                    <Col sm={10}>
                    <Form.Control type="text" name="name" value={formik.values.name} onChange={formik.handleChange} placeholder="Name" required />
                    {renderNameError}
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>
                    Email
                    </Form.Label>
                    <Col sm={10}>
                    <Form.Control type="text" name="userid" value={formik.values.userid} onChange={formik.handleChange} placeholder="Email" required />
                    {renderUseridError}
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>
                    Password
                    </Form.Label>
                    <Col sm={10}>
                    <Form.Control type="password" name="password" value={formik.values.password} onChange={formik.handleChange} placeholder="Password" required />
                    {renderPasswordError}
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Col sm={{ span: 10, offset: 2 }}>
                    <Button type="submit" style={{ float: 'right' }}>Add</Button>
                    </Col>
                </Form.Group>
                </Form>
            </div>
        </Card.Body>
        </Card>
  )
}

export default Add