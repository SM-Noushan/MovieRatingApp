import React, {useState ,useEffect, useRef} from 'react';
import { useNavigate } from "react-router-dom";

import axiosConfig from './axiosConfig';

const Signout = ({onHandleSignOut}) => {
    const effectRan = useRef(false);
    const [err, setErr] = useState(false);
    const navigate = useNavigate();
    useEffect(()=>{
        if(effectRan.current){
          axiosConfig.get('signout')
          .then(response=>{
              if(response.data === 'error'){
                setErr(true);
                // console.log('abc');
              }
              else{
                onHandleSignOut(false);
                localStorage.clear();
                setErr(false);
                navigate('/');
              }
          })
          .catch(error=>{
            setErr(true);
            console.log(error);
          })
        }
        return () => effectRan.current = true;
    }, [])

  return (
    <div>
      {!err ? <h4 style={{ marginLeft: '7.5%', marginTop: '1%', color: 'crimson' }}>Signing out...</h4> :
      <h4 style={{ marginLeft: '7.5%', marginTop: '1%', color: 'crimson' }}>Something went wrong. Please try again.</h4> }
    </div>
  )
}

export default Signout