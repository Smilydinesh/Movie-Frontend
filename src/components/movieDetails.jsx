import { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';

const MovieDetails = () => {
  const params = useParams();
  const [movie, setMovie] = useState([]);
  const [selectedTime, setSelectedTime] = useState(""); // State for selected time
  const [seats, setSeats] = useState(1); // State for selected seats
  const navigate = useNavigate();
  const key = '032d06682ca556273b286decb6b17cf2';
  const url = `https://api.themoviedb.org/3/movie/${params.id}?api_key=${key}`;

  useEffect(() => {
    async function fetchMovies() {
      fetch(url)
        .then((res) => res.json())
        .then((jsonData) => setMovie(jsonData));
    }
    fetchMovies();
  }, [params.id]);

  useEffect(() => {
    document.title = `${movie.title}`;
  }, [movie.title]);

  const availableTimes = ["10:00", "14:00", "18:00", "21:00"];

  const handleBooking = () => {
    const date = getCurrentDate();
    const time = selectedTime || getAvailableTime(); // Use user-selected time, or random if not selected
    const price = 200 * seats; // Calculate price based on number of seats

    navigate('/ticket', {
      state: {
        movieTitle: movie.title,
        date: date,
        time: time,
        seats: seats,
        price: price
      }
    });
  };

  // Function to get the current date
  const getCurrentDate = () => {
    const currentDate = new Date();
    return currentDate.toLocaleDateString();
  };

  // Function to get a random time
  const getAvailableTime = () => {
    const randomIndex = Math.floor(Math.random() * availableTimes.length);
    return availableTimes[randomIndex];
  };

  return (
    <div className="bg-gray-400 w-full h-full">
      {/* Movie Poster */}
      <div className="flex justify-center p-4">
        <img 
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className='w-2/4 h-96 bg-gray-600 p-1 rounded-md' 
        />
      </div>

      {/* Movie Title */}
      <div>
        <p className="p-2 font-semibold text-2xl flex justify-center">{movie.title}</p>

        {/* Movie Overview */}
        <div className="grid place-items-center">
          <div className="p-2 m-2 w-3/4 border-2 border-black rounded-md">
            <p>{movie.overview}</p>
          </div>
        </div>

        {/* Movie Stats */}
        <div className="grid place-items-center">
          <div className="p-2 border-2 border-black w-fit m-2 rounded-md">
            <p className="p-2 font-semibold">Popularity: {movie.popularity}</p>
            <p className="p-2 font-semibold">Language: {movie.original_language}</p>
            <p className="p-2 font-semibold">VoteAverage: {movie.vote_average}</p>
            <p className="p-2 font-semibold">VoteCount: {movie.vote_count}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
      {/* Select Time */}
      <div className="flex justify-center p-2">
        <label className="p-2 font-semibold text-lg">Select Time:</label>
        <select
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)} 
          className="p-2 border-2 outline-green-400 rounded-md"
        >
          <option value="">-- Choose a time --</option>
          {availableTimes.map((time, index) => (
            <option key={index} value={time}>{time}</option>
          ))}
        </select>
      </div>

      {/* Select Number of Seats */}
      <div className="flex justify-center p-2">
        <label className="p-2 font-semibold text-lg">Seats:</label>
        <input
          type="number"
          value={seats}
          onChange={(e) => setSeats(Number(e.target.value))}
          min="1"
          className="p-2 border-2 outline-green-400 rounded-md w-16"
        />
      </div>
      </div>

      {/* Book Now Button */}
      <div className="flex justify-center p-2">
        <button 
          onClick={handleBooking} 
          className="p-2 bg-red-500 w-60 h-12 mb-2 text-lg text-white font-semibold rounded-md flex justify-center text-center hover:bg-red-600"
        >
          Book Now
        </button>
      </div>
    </div>
  );
}

export default MovieDetails;
