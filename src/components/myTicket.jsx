import { useLocation, useNavigate } from 'react-router-dom';

const Ticket = () => {
  const location = useLocation(); // Get the location object to access state passed from previous page
  const navigate = useNavigate(); // Hook for navigation to redirect user

  // Destructure booking details from location.state (received from the previous page)
  const { movieTitle, date, time, seats, price } = location.state || {};

  // Function to handle the "Pay Now" button click
  const handlePayNow = () => {
    // Navigate to the payment page and pass the booking details as state
    navigate('/payment', {
      state: {
        movieTitle, 
        date, 
        time, 
        seats, 
        price
      }
    });
  };

  return (
    <div className="bg-gray-300 w-full h-screen">
      {/* Center the content on the screen */}
      <div className="grid place-items-center h-screen">
        <div className="w-2/4 h-auto p-4 bg-gray-400 border-gray-500 border-2 rounded-md">
          {/* Movie Details Title */}
          <div className="flex justify-center p-4">
            <h1 className="text-3xl font-semibold">Ticket Confirmation</h1>
          </div>

          {/* Display booking details */}
          <div className="grid place-items-center">
            <div className="p-2 m-2 w-96 border-2 border-black rounded-md">
              <p className="font-semibold">Movie: {movieTitle}</p>
              <p className="font-semibold">Date: {date}</p>
              <p className="font-semibold">Time: {time}</p>
              <p className="font-semibold">Seats: {seats}</p>
              <p className="font-semibold">Price: ${price}</p>
            </div>
          </div>

          {/* Pay Now Button */}
          <div className="flex justify-center mt-4">
            <button 
              onClick={handlePayNow} // When clicked, navigate to payment page
              className="p-2 bg-blue-500 w-60 h-12 text-lg text-white font-semibold rounded-md flex justify-center text-center hover:bg-blue-600"
            >
              Pay Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ticket;
