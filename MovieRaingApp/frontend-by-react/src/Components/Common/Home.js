import React, {useState} from 'react';
import axios from "axios";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";

const Signin = ({onHandleSignIn}) => {
  const [user, setUser] = useState({
    email: '',
    password: ''
  });
  const {email, password} = user;
  const [err, setErr] = useState(false);
  const [sts, setSts] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const filledName = e.target.name;
    setUser({...user,[e.target.name]:e.target.value});
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://127.0.0.1:8000/api/signin", user)
    .then(response=>{
        var data = response.data;
        // console.log(data);
        if(data['error']){
            setSts(false);
            setErr(true);
        }
        else if(data['banned']){
            setSts(true);
            setErr(false);
        }
        else{
            setErr(false);
            setSts(false);
            var user = {role: data.role, userid: data.userid, access_token: data.access_token};
            onHandleSignIn(true, data.role);
            localStorage.setItem('data', JSON.stringify(user));
            // console.log(localStorage.getxItem('admin'));
            data.role === 'admin' ? navigate('admin/dashboard') : navigate('user/dashboard');
        }
    }).catch(error=>{
        console.log(error);
    });
  }
  return (
        <div style={{ width: '40%', marginTop: '10%', marginLeft: '30%', boxShadow: '4px 3px 8px 1px', padding: '40px' }}>
            <h3 className="mb-0" style={{ textAlign: 'center' }}>MovieRT: Signin</h3> <br/>
            <hr className="m-0 p-0"/>
            <p className="mt-2" style={{ textAlign: 'center' }}>Sign in to start your session</p>
            <Form onSubmit={handleSubmit}>
            <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                <Form.Label column sm={3}>
                Email
                </Form.Label>
                <Col sm={9}>
                <Form.Control type="email" name="email" value={email} onChange={handleChange} placeholder="Enter your email" required />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                <Form.Label column sm={3}>
                Password
                </Form.Label>
                <Col sm={9}>
                <Form.Control type="password" name="password" value={password} onChange={handleChange} placeholder="Enter you password" required />
                {err ? <span className="text-danger"><strong>Invalid Credentials</strong></span> : null }
                {sts ? <span className="text-danger"><strong>You've been banned. Please Contact CS.</strong></span> : null }
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
                <Col sm={{ span: 10, offset: 2 }}>
                <Button type="submit" style={{ float: 'right' }}>Sign in</Button>
                </Col>
            </Form.Group>
            </Form>
        </div>
  )
}

export default Signin