import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MovieForm = ({ movieId, existingMovieData, onSubmitSuccess }) => {
  // State to hold movie form data (title, date, time, price, seats)
  const [movieData, setMovieData] = useState({
    title: '',
    date: '',
    time: '',
    price: '',
    seats: '',
  });

  // Effect hook to pre-fill the form with existing movie data if provided
  useEffect(() => {
    if (existingMovieData) {
      setMovieData(existingMovieData);
    }
  }, [existingMovieData]);

  // Handle input changes and update the state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovieData((prevData) => ({
      ...prevData,
      [name]: value, // Update the relevant field in the movie data state
    }));
  };

  // Handle form submission for adding or updating the movie
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      let response;
      if (movieId) {
        // Update movie if `movieId` is present
        response = await axios.put(`https://movie-backend-mizl.onrender.com/api/movies/${movieId}`, movieData);
      } else {
        // Add new movie if no `movieId`
        response = await axios.post('https://movie-backend-mizl.onrender.com/api/movies', movieData);
      }

      // Check for successful response and reset the form
      if (response.status === 200 || response.status === 201) {
        alert(response.data.message || 'Movie saved successfully');
        setMovieData({
          title: '',
          date: '',
          time: '',
          price: '',
          seats: '',
        });
        onSubmitSuccess(); // Call success callback
      } else {
        alert('Failed to save movie');
      }
    } catch (error) {
      console.error('Error adding/updating movie', error);
      alert('Error adding/updating movie');
    }
  };

  // Handle delete movie action
  const handleDelete = async () => {
    if (!movieId) return; // Only proceed if movieId exists
    try {
      const response = await axios.delete(`https://movie-backend-mizl.onrender.com/api/movies/${movieId}`);
      alert(response.data.message);
      onSubmitSuccess(); // Call success callback
    } catch (error) {
      alert('Error deleting movie');
    }
  };

  return (
    <div className="bg-gray-300 w-full h-screen">
      {/* Centered form container */}
      <div className="grid place-items-center h-screen">
        <div className="max-w-lg mx-auto p-6 bg-gray-400 rounded-md shadow-md">
          <h2 className="text-2xl font-semibold text-center mb-4">
            {movieId ? 'Edit Movie' : 'Add Movie'} {/* Title changes based on movieId */}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid place-items-center">
              {/* Movie Title Input */}
              <input
                type="text"
                name="title"
                value={movieData.title}
                onChange={handleChange}
                placeholder="Movie Title"
                className="border-2 w-full sm:w-96 h-12 m-2 rounded-full text-center hover:border-yellow-300 outline-green-400"
                required
              />
              {/* Movie Date Input */}
              <input
                type="date"
                name="date"
                value={movieData.date}
                onChange={handleChange}
                className="border-2 w-full sm:w-96 h-12 m-2 rounded-full text-center hover:border-yellow-300 outline-green-400"
                required
              />
              {/* Movie Time Input */}
              <input
                type="time"
                name="time"
                value={movieData.time}
                onChange={handleChange}
                className="border-2 w-full sm:w-96 h-12 m-2 rounded-full text-center hover:border-yellow-300 outline-green-400"
                required
              />
              {/* Movie Price Input */}
              <input
                type="number"
                name="price"
                value={movieData.price}
                onChange={handleChange}
                placeholder="Price"
                className="border-2 w-full sm:w-96 h-12 m-2 rounded-full text-center hover:border-yellow-300 outline-green-400"
                required
              />
              {/* Movie Seats Input */}
              <input
                type="text"
                name="seats"
                value={movieData.seats}
                onChange={handleChange}
                placeholder="Seats"
                className="border-2 w-full sm:w-96 h-12 m-2 rounded-full text-center hover:border-yellow-300 outline-green-400"
                required
              />
              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 bg-blue-500 text-white m-2 font-semibold rounded-md hover:bg-blue-600"
              >
                {movieId ? 'Update Movie' : 'Submit Movie'}
              </button>

              {/* Delete Button (only shown when editing an existing movie) */}
              {movieId && (
                <button
                  type="button"
                  onClick={handleDelete}
                  className="w-full py-3 bg-red-500 text-white m-2 font-semibold rounded-md hover:bg-red-600 mt-4"
                >
                  Delete Movie
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MovieForm;
