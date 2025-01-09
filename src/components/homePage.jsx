import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
  // State hooks to store different movie categories and user role
  const [movies, setMovies] = useState([]); // Top-rated movies
  const [movies1, setMovies1] = useState([]); // Now playing movies
  const [movies2, setMovies2] = useState([]); // Upcoming movies
  const [movies3, setMovies3] = useState([]); // Popular movies
  const [movies4, setMovies4] = useState([]); // TV shows
  const [isAdmin, setIsAdmin] = useState(false); // State for user role (admin/user)

  // Fetch user data (for example after login)
  useEffect(() => {
    axios.get('https://movie-backend-1-s3at.onrender.com/api/user') // Endpoint that returns user data
      .then((response) => {
        // Assuming the backend sends isAdmin field in the response
        if (response.data.isAdmin) {
          setIsAdmin(true);  // Set isAdmin to true if the user is an admin
        }
      })
      .catch((error) => {
        console.log('Error fetching user data:', error);
      });
  }, []);

  // Fetch top-rated movies
  useEffect(() => {
    axios.get('https://movie-backend-1-s3at.onrender.com/api/top-rated')
      .then((response) => {
        setMovies(response.data);
      })
      .catch((error) => {
        console.log('There was an error fetching the data:', error);
      });
  }, []);
  const limitedTopRated = movies.slice(0, 5); // Limit to first 5 top-rated movies

  // Fetch now playing movies
  useEffect(() => {
    axios.get('https://movie-backend-1-s3at.onrender.com/api/now-playing')
      .then((response) => {
        setMovies1(response.data);
      })
      .catch((error) => {
        console.log('There was an error fetching the data:', error);
      });
  }, []);
  const limitedNowPlaying = movies1.slice(0, 6); // Limit to first 6 now playing movies

  // Fetch upcoming movies
  useEffect(() => {
    axios.get('https://movie-backend-1-s3at.onrender.com/api/up-coming')
      .then((response) => {
        setMovies2(response.data);
      })
      .catch((error) => {
        console.log('There was an error fetching the data:', error);
      });
  }, []);
  const limitedUpcoming = movies2.slice(0, 6); // Limit to first 6 upcoming movies

  // Fetch popular movies
  useEffect(() => {
    axios.get('https://movie-backend-1-s3at.onrender.com/api/popular')
      .then((response) => {
        setMovies3(response.data);
      })
      .catch((error) => {
        console.log('There was an error fetching the data:', error);
      });
  }, []);
  const limitedPopularMovies = movies3.slice(0, 6); // Limit to first 6 popular movies

  // Fetch TV shows
  useEffect(() => {
    axios.get('https://movie-backend-1-s3at.onrender.com/api/tv-shows')
      .then((response) => {
        setMovies4(response.data);
      })
      .catch((error) => {
        console.log('There was an error fetching the data:', error);
      });
  }, []);
  const limitedTvShows = movies4.slice(0, 6); // Limit to first 6 TV shows

  return (
    <>
      {/* Header section with CineHub name and ticket image */}
      <div className='bg-gray-400 flex justify-between p-2'>
        <p className='font-semibold text-lg mt-2'>CineHub</p>
        {/* Conditional rendering: Admin link only visible if the user is an admin */}
        {isAdmin && (
          <Link to='/movie' className='pl-4 pr-4'>
            <img
              src='/assets/images/Ticket.png'
              alt='Admin'
              className='w-12 h-10 rounded-md hover:bg-teal-300 p-2'
            />
          </Link>
        )}
      </div>
      <hr className='border-gray-500 border-2' />

      {/* Top Rated Movies Section */}
      <div className='bg-gray-300'>
        <ul className='flex justify-center p-2'>
          {limitedTopRated.map((movie) => (
            <li key={movie.id} className='p-2'>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className='w-3/4 h-60 md:w-48 md:h-80'
              />
            </li>
          ))}
        </ul>
      </div>
      <hr className='border-gray-500 border-2' />

      {/* Now Playing Movies Section */}
      <div className='bg-gray-300'>
        <p className='p-4 pb-0 font-bold text-xl'>NOW PLAYING</p>
        <ul className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 p-4 gap-2 cursor-pointer'>
          {limitedNowPlaying.map((movies1) => (
            <li key={movies1.id} className='p-2 border-2 border-gray-600 rounded-md'>
              <Link to={`/movie/${movies1.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movies1.poster_path}`}
                  alt={movies1.title}
                  className='w-72 h-72 md:w-56 md:h-80'
                />
                <div className='flex justify-center'>
                  <p className='p-2 font-semibold'>{movies1.title}</p>
                </div>
                <div className='flex justify-between'>
                  <p className='p-2 pt-0 pb-0 font-semibold'>{movies1.release_date}</p>
                  <p className='p-2 pt-0 pb-0 font-semibold'>{movies1.original_language}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <hr className='border-gray-500 border-2' />

      {/* Upcoming Movies Section */}
      <div className='bg-gray-300'>
        <p className='p-4 pb-0 font-bold text-xl'>UPCOMING</p>
        <ul className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 p-4 gap-2 cursor-pointer'>
          {limitedUpcoming.map((movies2) => (
            <li key={movies2.id} className='p-2 border-2 border-gray-600 rounded-md'>
              <img
                src={`https://image.tmdb.org/t/p/w500${movies2.poster_path}`}
                alt={movies2.title}
                className='w-72 h-72 md:w-56 md:h-80'
              />
              <div className='flex justify-center'>
                <p className='p-2 font-semibold'>{movies2.title}</p>
              </div>
              <div className='flex justify-between'>
                <p className='p-2 pt-0 pb-0 font-semibold'>{movies2.release_date}</p>
                <p className='p-2 pt-0 pb-0 font-semibold'>{movies2.original_language}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <hr className='border-gray-500 border-2' />

      {/* Popular Movies Section */}
      <div className='bg-gray-300'>
        <p className='p-4 pb-0 font-bold text-xl'>POPULAR</p>
        <ul className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 p-4 gap-2 cursor-pointer'>
          {limitedPopularMovies.map((movies3) => (
            <li key={movies3.id} className='p-2 border-2 border-gray-600 rounded-md'>
              <img
                src={`https://image.tmdb.org/t/p/w500${movies3.poster_path}`}
                alt={movies3.title}
                className='w-72 h-72 md:w-56 md:h-80'
              />
              <div className='flex justify-center'>
                <p className='p-2 font-semibold'>{movies3.title}</p>
              </div>
              <div className='flex justify-between'>
                <p className='p-2 pt-0 pb-0 font-semibold'>{movies3.release_date}</p>
                <p className='p-2 pt-0 pb-0 font-semibold'>{movies3.original_language}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <hr className='border-gray-500 border-2' />

      {/* TV Shows Section */}
      <div className='bg-gray-300 mb-8'>
        <p className='p-4 pb-0 font-bold text-xl'>TV SHOWS</p>
        <ul className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 p-4 gap-2 cursor-pointer'>
          {limitedTvShows.map((movies4) => (
            <li key={movies4.id} className='p-2 border-2 border-gray-600 rounded-md'>
              <img
                src={`https://image.tmdb.org/t/p/w500${movies4.poster_path}`}
                alt={movies4.title}
                className='w-72 h-72 md:w-56 md:h-80'
              />
              <div className='flex justify-center'>
                <p className='p-2 font-semibold'>{movies4.original_name}</p>
              </div>
              <div className='flex justify-between'>
                <p className='p-2 pt-0 pb-0 font-semibold'>{movies4.first_air_date}</p>
                <p className='p-2 pt-0 pb-0 font-semibold'>{movies4.original_language}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <hr className='border-gray-500 border-2' />

      {/* Footer with navigation icons */}
      <div className='p-2 flex justify-evenly bottom-0 bg-gray-400 w-full fixed'>
        <button>
          <img
            src='/src/assets/images/Video.png'
            alt='Video'
            className='w-18 h-8 rounded-full hover:bg-teal-300 p-2'
          />
        </button>
        <Link to='/search'>
          <img
            src='/src/assets/images/Search.png'
            alt='Search'
            className='w-18 h-8 rounded-full hover:bg-teal-300 p-2'
          />
        </Link>
        <Link to='/profile'>
          <img
            src='/src/assets/images/Profile.png'
            alt='Profile'
            className='w-18 h-8 rounded-full hover:bg-teal-300 p-2'
          />
        </Link>
      </div>
    </>
  );
}

export default Home;
