import React from 'react';
import axios from 'axios';
import img from '../images/cart.png';
import img1 from '../images/1.png';
import img2 from '../images/2.png';
// Import other images similarly...
import dd from '../images/default.png';
import '../styles/Order.css';

const Cart = ({ items, order, setOrder, user, setPop }) => {
  const handleItemAddition = (itemId) => {
    const selectedItem = items.find(item => item.id === itemId);
    setOrder({
      ...order,
      items: [...order.items, selectedItem]
    });
  };

  const handleItemSubtraction = (itemId) => {
    const selectedItemIndex = order.items.findIndex(item => item.id === itemId);
    if (selectedItemIndex !== -1) {
      const updatedItems = [...order.items];
      updatedItems.splice(selectedItemIndex, 1);
      setOrder({
        ...order,
        items: updatedItems
      });
    }
  };

  const handleSubmit = () => {
    axios.post('http://localhost:8080/api/customerOrders', {
      ...order,
      items: order.items.map(item => ({ id: item.id }))
    }, {
      auth: {
        username: 'sam@gmail.com',
        password: 'Sam@123'
      }
    })
      .then(response => {
        alert('Order placed successfully!');
        setPop({ message: 'Order placed successfully!!', duration: 2000 });
        setOrder({
          ...order,
          items: []
        });
      })
      .catch(error => {
        console.error('There was an error placing the order!', error);
      });
  };

  const handleClearCart = () => {
    setOrder({
      ...order,
      items: []
    });
  };

  const getImageSrc = (itemId) => {
    switch (itemId) {
      case 1:
        return img1;
      case 2:
        return img2;
      // Add cases for other images...
      default:
        return dd;
    }
  };

  const totalAmount = order.items.reduce((total, item) => total + item.price, 0).toFixed(2);

  // Calculate item quantities
  const itemQuantities = order.items.reduce((acc, item) => {
    acc[item.id] = (acc[item.id] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="cart-section">
      <h2>Cart</h2>
      {order.items.length === 0 ? (
        <div className="empty-cart">
          <img src={img} alt="Empty Cart" />
          <h3 style={{ color: 'red' }}>Your cart is empty.</h3>
        </div>
      ) : (
        <>
          <ul className="item-list">
            {Object.keys(itemQuantities).map(itemId => {
              const item = items.find(i => i.id === parseInt(itemId));
              return (
                <li key={itemId} className="cart-item">
                  <img src={getImageSrc(item.id)} alt={item.name} className="item-image" />
                  {item.name} - ₹{item.price.toFixed(2)}
                  <div className="item-actions">
                    <button className="item-button-cart" onClick={() => handleItemAddition(item.id)}><i className="fas fa-plus"></i></button>
                    <button className="item-button-cart" onClick={() => handleItemSubtraction(item.id)}><i className="fas fa-minus"></i></button>
                    <span className="item-quantity">Quantity: {itemQuantities[itemId]}</span>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="total-amount">
            <button className="clear-cart-button" onClick={handleClearCart}>Clear Cart</button>
            <h3>Total Amount: ₹{totalAmount}</h3>
          </div>
          <button className="order-button" onClick={handleSubmit}>Place Order</button>
        </>
      )}
    </div>
  );
};

export default Cart;
