import React, { useState, useEffect} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
//CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";
import 'antd/dist/reset.css';

//Common
import IsSigned from './Components/Common/IsSigned';
import TopNavbar from './Components/Common/TopNavbar';
import Home from './Components/Common/Home';
import Signout from './Components/Common/Signout';
//Admin
import ProtectedRouteAdmin from './Components/Common/ProtectedRouteAdmin';
import DashboardAdmin from './Components/Admin/Dashboard';
import MovieEdit from './Components/Admin/EditMovie';
import UserView from './Components/Admin/Users/View';
import UserEdit from './Components/Admin/Users/Edit';
import UserAdd from './Components/Admin/Users/Add';
//User
import ProtectedRouteUser from './Components/Common/ProtectedRouteUser';
import DashboardUser from './Components/Users/Dashboard';
// import MovieList from './Components/Users/MovieList';
import MyRatings from './Components/Users/MyRatings';

function App() {
  const data = JSON.parse(localStorage.getItem('data'));
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState('');
  
  useEffect(()=>{
    if(data){
      setIsLoggedIn(true);
      setRole(data.role);
    }
  }, [])
  const handleSignIn = (val1, val2) => {
    setIsLoggedIn(val1);
    setRole(val2);
  }
  const handleSignOut = (val) => {
    setIsLoggedIn(val);
    setRole('');
  }

  return (
    <BrowserRouter>
      <TopNavbar isLoggedIn={isLoggedIn} role={role} />
      <Container>
        <Routes>
        {/* admin */}
          <Route exact path="/" element={ <IsSigned isLoggedIn={isLoggedIn} role={role}> <Home onHandleSignIn={handleSignIn} /> </IsSigned> } />
          <Route exact path="/admin/signout" element={ <ProtectedRouteAdmin isLoggedIn={isLoggedIn} role={role} > <Signout onHandleSignOut={handleSignOut} /> </ProtectedRouteAdmin> } />
          <Route exact path="/admin/dashboard" element={ <ProtectedRouteAdmin isLoggedIn={isLoggedIn} role={role} > <DashboardAdmin /> </ProtectedRouteAdmin> } />
          <Route exact path="/admin/movie/edit/:id" element={ <ProtectedRouteAdmin isLoggedIn={isLoggedIn} role={role} > <MovieEdit /> </ProtectedRouteAdmin> } />
          <Route exact path="/admin/user/view" element={ <ProtectedRouteAdmin isLoggedIn={isLoggedIn} role={role} > <UserView /> </ProtectedRouteAdmin> } />
          <Route exact path="/admin/user/add" element={ <ProtectedRouteAdmin isLoggedIn={isLoggedIn} role={role} > <UserAdd /> </ProtectedRouteAdmin> } />
          <Route exact path="/admin/user/edit/:id" element={ <ProtectedRouteAdmin isLoggedIn={isLoggedIn} role={role} > <UserEdit /> </ProtectedRouteAdmin> } />
          {/* user */}
          <Route exact path="/user/ratings" element={ <ProtectedRouteUser isLoggedIn={isLoggedIn} role={role} > <MyRatings /> </ProtectedRouteUser> } />
          <Route exact path="/user/signout" element={ <ProtectedRouteUser isLoggedIn={isLoggedIn} role={role} > <Signout onHandleSignOut={handleSignOut} /> </ProtectedRouteUser> } />
        </Routes>
      </Container>
      <div>
        <Routes>
          <Route exact path="/user/dashboard" element={ <ProtectedRouteUser isLoggedIn={isLoggedIn} role={role} > <DashboardUser /> </ProtectedRouteUser> } />
          {/* <Route exact path="/user/movielist" element={ <ProtectedRouteUser isLoggedIn={isLoggedIn} role={role} > <MovieList /> </ProtectedRouteUser> } /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;