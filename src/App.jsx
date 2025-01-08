import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/homePage';
import Search from './components/searchPage';
import MovieDetails from './components/movieDetails';
import SignUp from './components/registerUser';
import Login from './components/loginUser';
import ProfilePage from './components/profilePage';
import ForgotPassword from './components/forgotPassword';
import MovieForm from './components/movieForm';
import Ticket from './components/myTicket';
import PaymentPage from './components/paymentForm';
import Booking from './components/tickets';
import { UserProvider } from './context/userContext'; // Import the UserProvider

function App() {

  return (
    <>
    <UserProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/movie/:movieId/book" element={<Ticket />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/home' element={<Home />} />
        <Route path='/search' element={<Search />} />
        <Route path='/movie/:id' element={<MovieDetails />} />
        <Route path='/register' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route path='forgot-password' element={<ForgotPassword />} />
        <Route path='/movie' element={<MovieForm />} />
        <Route path='/ticket' element={<Ticket />} />
        <Route path='/payment' element={<PaymentPage />} />
        <Route path='/booking' element={<Booking />} />
     </Routes>
    </Router>
    </UserProvider>
    </>
  );
}

export default App;
