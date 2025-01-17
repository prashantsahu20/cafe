import React, { useEffect, useState } from 'react';
import '../styles/Items.css';
import closedStore from '../images/closedd.png'; // Import the closed store image

const Items = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false); // Add error state

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/items');
      if (!response.ok) { // Check for bad response
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error('Error fetching items:', error);
      setError(true); // Set error state
    }
  };

  return (
    <div className="container">
      {error ? (
        <div className="error-container">
          <img src={closedStore} alt="Closed Store" className="closed-store-image" />
          <h2>Store is currently closed. Please try again later.</h2>
        </div>
      ) : (
        <>
          <h1>Available Items</h1>
          <table id="itemsTable">
            <thead>
              <tr>
                <th>Sr No.</th>
                <th>Item Name</th>
                <th>Price (₹)</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.price.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default Items;
