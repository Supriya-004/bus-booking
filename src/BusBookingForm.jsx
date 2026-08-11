import { useState, useEffect } from 'react';
import './BusBookingForm.css';

function BusBookingForm() {
  const [formData, setFormData] = useState({
    name: '',
    source: '',
    destination: '',
    date: '',
    seats: ''
  });

  const [submittedData, setSubmittedData] = useState(null);

  useEffect(() => {
    const savedData = localStorage.getItem('busBookingData');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setFormData(parsedData);
      setSubmittedData(parsedData);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.source || !formData.destination || !formData.date || !formData.seats) {
      alert('Please fill in all fields');
      return;
    }

    localStorage.setItem('busBookingData', JSON.stringify(formData));
    
    setSubmittedData(formData);
    alert('Booking saved successfully!');
  };

  const handleReset = () => {
    setFormData({
      name: '',
      source: '',
      destination: '',
      date: '',
      seats: ''
    });
    localStorage.removeItem('busBookingData');
    setSubmittedData(null);
    alert('Booking data cleared!');
  };

  return (
    <div className="bus-booking-container">
      <h1>Bus Booking Form</h1>
      
      <form onSubmit={handleSubmit} className="booking-form">
        <div className="form-group">
          <label htmlFor="name">Passenger Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter your full name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="source">Source:</label>
          <select
            id="source"
            name="source"
            value={formData.source}
            onChange={handleInputChange}
            required
          >
            <option value="">-- Select Source --</option>
            <option value="New York">New York</option>
            <option value="Los Angeles">Los Angeles</option>
            <option value="Chicago">Chicago</option>
            <option value="Houston">Houston</option>
            <option value="Phoenix">Phoenix</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="destination">Destination:</label>
          <select
            id="destination"
            name="destination"
            value={formData.destination}
            onChange={handleInputChange}
            required
          >
            <option value="">-- Select Destination --</option>
            <option value="New York">New York</option>
            <option value="Los Angeles">Los Angeles</option>
            <option value="Chicago">Chicago</option>
            <option value="Houston">Houston</option>
            <option value="Phoenix">Phoenix</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="date">Travel Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="seats">Number of Seats:</label>
          <input
            type="number"
            id="seats"
            name="seats"
            value={formData.seats}
            onChange={handleInputChange}
            placeholder="Enter number of seats"
            min="1"
            max="5"
            required
          />
        </div>

        <div className="button-group">
          <button type="submit" className="btn btn-submit">
            Book Now
          </button>
          <button type="button" className="btn btn-reset" onClick={handleReset}>
            Clear Data
          </button>
        </div>
      </form>

      {submittedData && (
        <div className="booking-summary">
          <h2>Booking Summary</h2>
          <div className="summary-content">
            <p><strong>Passenger Name:</strong> {submittedData.name}</p>
            <p><strong>Source:</strong> {submittedData.source}</p>
            <p><strong>Destination:</strong> {submittedData.destination}</p>
            <p><strong>Travel Date:</strong> {submittedData.date}</p>
            <p><strong>Number of Seats:</strong> {submittedData.seats}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default BusBookingForm;
