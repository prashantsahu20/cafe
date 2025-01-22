import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Order.css';
import img from '../images/cart.png';
import dd from '../images/default.png';
// Import other images similarly...
import img1 from '../images/1.png';
import img2 from '../images/2.png';
import img3 from '../images/3.png';
import img4 from '../images/4.png';
import img5 from '../images/5.png';
import img6 from '../images/6.png';
import img7 from '../images/7.png';
import img8 from '../images/8.png';
import img9 from '../images/9.png';
import img10 from '../images/10.png';
import img11 from '../images/11.png';
import img12 from '../images/12.png';
import img13 from '../images/13.png';
import img14 from '../images/14.png';
import img15 from '../images/15.png';
import img16 from '../images/16.png';
import img17 from '../images/17.png';
import img18 from '../images/18.png';
import img19 from '../images/19.png';
import img20 from '../images/20.png';
import img21 from '../images/21.png';
import img22 from '../images/22.png';
import img23 from '../images/23.png';
import img24 from '../images/24.png';
import img25 from '../images/25.png';

import AutoDismissAlert from './AutoDismissAlert';
import { useNavigate } from 'react-router-dom';

const Order = ({ user, addRecentOrder,pwd }) => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState({
    customer: { id: user.id },
    orderDate: new Date().toISOString().split('T')[0],
    items: []
  });
  
  console.log(user);
  const [pop, setPop] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8080/api/items', {
      auth: {
        username: `${user.email}`,
        password: `${pwd}`
      }
    })
    .then(response => {
      setItems(response.data);
    })
    .catch(error => {
      console.error('There was an error fetching the items!', error);
    });
  }, [user.email,pwd]);

  const handleItemSelection = (itemId) => {
    const selectedItem = items.find(item => item.id === itemId);
    setOrder({
      ...order,
      items: [...order.items, selectedItem]
    });
    setPop({ message: 'Added to cart successfully!', duration: 1000 });
  };

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
        username: `${user.email}`,
        password: `${pwd}`
      }
    })
    .then(response => {
      navigate('/payment', { state: { totalAmount } });
      setPop({ message: 'Order placed successfully!', duration: 1000 });
      
      // Add order to recent orders
      addRecentOrder({
        ...order,
        totalAmount
      });

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

  const totalAmount = order.items.reduce((total, item) => total + item.price, 0).toFixed(2);

  const getImageSrc = (itemId) => {
    switch (itemId) {
      case 1:
        return img1;
      case 2:
        return img2;
      case 3:
        return img3;
      case 4:
        return img4;  
      case 5:
          return img5;  
      case 6:
          return img6;  
      case 7:
          return img7;
      case 8:
          return img8;   
      case 9:
            return img9;  
      case 10:
            return img10;
      case 11:
            return img11; 
      case 12:
            return img12;
      case 13:
            return img13;
      case 14:
            return img14;       
      case 15:
            return img15; 
      case 16:
            return img16;
      case 17:
            return img17; 
      case 18:
            return img18;
      case 19:
            return img19;                   
      case 20:
              return img20;       
      case 21:
              return img21; 
      case 22:
              return img22; 
      case 23:
            return img23; 
      case 24:
            return img24; 
      case 25:
            return img25; 
      // Add cases for other images...
      default:
        return dd;
    }
  };

  const itemQuantities = order.items.reduce((acc, item) => {
    acc[item.id] = (acc[item.id] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="order-container">
      <div className="order-header">
        <h1>Order Now</h1>
      </div>
      {pop && ( <AutoDismissAlert message={pop.message} duration={pop.duration} onClose={() => setPop(null)} /> )}
      <ul className="item-list">
        {items.map(item => (
          <li key={item.id}>
            <img src={getImageSrc(item.id)} alt={item.name} className="item-image" />
            {item.name} - ₹{item.price.toFixed(2)}
            <button className="item-button" onClick={() => handleItemSelection(item.id)}>Add to Cart</button>
          </li>
        ))}
      </ul>
      
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
    </div>
  );
};

export default Order;
