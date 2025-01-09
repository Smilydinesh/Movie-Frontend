import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Search() {
  // State hooks for managing search results and input query
  const [searchResult, setSearchResult] = useState([]); // Holds the search results
  const [key, setKey] = useState(""); // Holds the search input value

  // useEffect hook to trigger the search function when the 'key' state changes
  useEffect(() => {
    const search = async () => {
      try {
        // Avoid making a request if the search query is empty or just spaces
        if (!key.trim()) {
          setSearchResult([]); // Clear results if input is empty
          return;
        }

        // Make the request to the movie search API using Axios
        const res = await axios.get("https://api.themoviedb.org/3/search/movie", {
          params: {
            api_key: '032d06682ca556273b286decb6b17cf2', // API key for authentication
            query: key, // The search query
            language: 'en-US', // Language of the results
            page: 1, // Default to the first page of results
          },
        });

        // Update the state with the search results
        setSearchResult(res.data.results); // Correct data structure: res.data.results
      } catch (error) {
        console.log(error); // Log any errors during the request
      }
    };

    search(); // Call the search function whenever 'key' changes
  }, [key]); // Dependency on 'key', runs every time the 'key' changes

  return (
    <form className='bg-gray-300 w-full h-full'>
      <div>
        {/* Search input field */}
        <div className='p-2 grid place-items-center'>
          <input
            type="text"
            placeholder="Search"
            value={key} // Bind the input value to 'key'
            onChange={(e) => setKey(e.target.value)} // Update 'key' state on input change
            className='w-2/3 md:w-1/2 lg:w-1/3 h-12 border-2 border-gray-400 rounded-full text-center outline-green-400' // Responsive width
          />
        </div>
        <hr className='border-gray-500 border-2' />
        
        {/* Conditionally render search results */}
        {searchResult && searchResult.length > 0 && (
          <div className='p-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
            {searchResult.map((movie) => (
              <Link to={`/movie/${movie.id}`} key={movie.id}>
                <div className='p-2 border-2 border-gray-400 w-48 h-76 mb-2 rounded-xl shadow-lg'>
                  <div>
                    {/* Movie Poster Image */}
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} // Dynamically build the image URL
                      alt={movie.title}
                      className='w-full h-60 object-cover rounded-lg' // Make the image responsive
                    />
                  </div>
                  <div>
                    <p className='font-semibold p-2 text-center'>{movie.title}</p> {/* Display movie title */}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Bottom navigation bar */}
      <div className='p-2 flex justify-evenly bg-gray-400 w-full fixed bottom-0'>
        <Link to='/home'>
          <img src='/src/assets/images/Video.png' alt='Video' className='w-18 h-8 rounded-full hover:bg-teal-300 p-2' />
        </Link>
        <button>
          <img src='/src/assets/images/Search.png' alt='Search' className='w-18 h-8 rounded-full hover:bg-teal-300 p-2' />
        </button>
        <Link to='/profile'>
          <img src='/src/assets/images/Profile.png' alt='Profile' className='w-18 h-8 rounded-full hover:bg-teal-300 p-2' />
        </Link>
      </div>
    </form>
  );
}
