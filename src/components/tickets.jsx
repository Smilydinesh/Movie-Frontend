import { useLocation } from 'react-router-dom';
import { jsPDF } from 'jspdf';

const Booking = () => {
  // Retrieve the passed state from the previous route (e.g., movie details, booking information)
  const location = useLocation();
  const { movieTitle, date, time, seats, price } = location.state || {};

  // Function to generate and download the ticket as a PDF
  const downloadTicketPDF = () => {
    const doc = new jsPDF(); // Create a new instance of jsPDF

    // Set font and add text to the PDF
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(16);
    doc.text("CineHub Movies", 20, 20); // Add the title to the document

    doc.setFontSize(12);
    doc.text(`Movie: ${movieTitle}`, 20, 30); // Movie title
    doc.text(`Date: ${date}`, 20, 40); // Movie date
    doc.text(`Time: ${time}`, 20, 50); // Movie time
    doc.text(`Seats: ${seats}`, 20, 60); // Number of seats
    doc.text(`Price: $${price}`, 20, 70); // Total price

    // Trigger download of the generated PDF
    doc.save('ticket.pdf');
  };

  return (
    <div className="bg-gray-400 w-full h-screen">
      <div className="flex justify-center p-4">
        <h1 className="text-3xl font-semibold">Booking Confirmed</h1> {/* Title of the page */}
      </div>

      {/* Display Confirmation Details */}
      <div className="grid place-items-center">
        <div className="p-2 m-2 w-96 border-2 border-black rounded-md">
          <p className='font-semibold text-lg text-center p-1'>CineHub Movies</p>
          <p className="font-semibold p-1">Movie: {movieTitle}</p> {/* Movie Title */}
          <p className="font-semibold p-1">Date: {date}</p> {/* Movie Date */}
          <p className="font-semibold p-1">Time: {time}</p> {/* Movie Time */}
          <p className="font-semibold p-1">Seats: {seats}</p> {/* Number of Seats */}
          <p className="font-semibold p-1">Price: ${price}</p> {/* Total Price */}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-center mt-4 space-x-4">
        <button 
          onClick={() => window.location.href = '/home'} 
          className="w-60 p-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
        >
          Go to Homepage {/* Button to navigate to the homepage */}
        </button>
        
        {/* Download Ticket Button */}
        <button 
          onClick={downloadTicketPDF} 
          className="w-60 p-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600"
        >
          Download Ticket {/* Button to trigger PDF download */}
        </button>
      </div>
    </div>
  );
};

export default Booking;
