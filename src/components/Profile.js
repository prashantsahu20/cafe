// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Modal from "react-modal";
// import "../styles/Profile.css";

// // Set the app element
// Modal.setAppElement('#root'); 

// const Profile = ({ user, recentOrders }) => {
//   const navigate = useNavigate();
//   const [currentTime, setCurrentTime] = useState("");
//   const [dayMessage, setDayMessage] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   useEffect(() => {
//     const updateTime = () => {
//       const now = new Date();
//       let hours = now.getHours();
//       const minutes = now.getMinutes();
//       const ampm = hours >= 12 ? "PM" : "AM";
//       hours = hours % 12 || 12;
//       const timeString = `${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}${ampm}`;
//       setCurrentTime(timeString);
//     };

//     updateTime();
//     const interval = setInterval(updateTime, 1000);
    
//     const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
//     const today = new Date().getDay();
//     setDayMessage(`Happy ${daysOfWeek[today]}!`);

//     return () => clearInterval(interval);
//   }, []);

//   if (!user) {
//     navigate("/login");
//     return null;
//   }

//   const aggregateItems = (items) => {
//     const itemMap = {};
//     items.forEach(item => {
//       if (itemMap[item.name]) {
//         itemMap[item.name].quantity += 1;
//         itemMap[item.name].totalPrice += item.price;
//       } else {
//         itemMap[item.name] = { ...item, quantity: 1, totalPrice: item.price };
//       }
//     });
//     return Object.values(itemMap);
//   };

//   const openModal = () => {
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   return (
//     <div className="profile-container">
//       <div className="profile-card">
//         <h1 className="profile-title">Customer Profile</h1>
//         <h2 style={{color:"#FBF6A3", textTransform:"capitalize"}}>Hello, {user.name}!</h2>
//         <p style={{color:"#FBF6A3"}}>{dayMessage}</p>
//         <div className="clock">{currentTime}</div>
//         <div className="profile-details">
//           <p><strong>Name:</strong> {user.name}</p>
//           <p><strong>Email:</strong> {user.email}</p>
//           <p><strong>Phone Number:</strong> {user.phone}</p>
//           <p><strong>Address:</strong> {user.address}</p>
//         </div>
//         <button className="recent-orders-button" onClick={openModal}>Recent Orders</button>
//       </div>

//       <Modal
//         isOpen={isModalOpen}
//         onRequestClose={closeModal}
//         contentLabel="Recent Orders"
//         className="profile-modal"
//         overlayClassName="overlay"
//       >
//         <h2>Recent Orders</h2>
//         {recentOrders.length > 0 ? (
//           <ul>
//             {recentOrders.map((order, index) => {
//               const aggregatedItems = aggregateItems(order.items);
//               return (
//                 <li key={index}>
//                   {aggregatedItems.map((item) => (
//                     <div key={item.id} className="order-item">
//                       <span className="item-name">{item.name} x {item.quantity}</span>
//                       <span className="item-price">₹{item.totalPrice.toFixed(2)}</span>
//                     </div>
//                   ))}
//                   <br/>
//                   <div className="total-amount-containerp">
//                     <span className="total-amount-labelp"><strong>Total Amount: ₹{order.totalAmount}</strong></span>
//                   </div>
//                   <hr />
//                   <br/>
//                 </li>
//               );
//             })}
//           </ul>
//         ) : (
//           <p>No recent orders</p>
//         )}
//         <button onClick={closeModal}>Close</button>
//       </Modal>
//     </div>
//   );
// };

// export default Profile;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import jsPDF from "jspdf";
import "../styles/Profile.css";

// Set the app element
Modal.setAppElement('#root'); 

const Profile = ({ user, recentOrders }) => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState("");
  const [dayMessage, setDayMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes();
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12;
      const timeString = `${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}${ampm}`;
      setCurrentTime(timeString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const today = new Date().getDay();
    setDayMessage(`Happy ${daysOfWeek[today]}!`);

    return () => clearInterval(interval);
  }, []);

  if (!user) {
    navigate("/login");
    return null;
  }

  const aggregateItems = (items) => {
    const itemMap = {};
    items.forEach(item => {
      if (itemMap[item.name]) {
        itemMap[item.name].quantity += 1;
        itemMap[item.name].totalPrice += item.price;
      } else {
        itemMap[item.name] = { ...item, quantity: 1, totalPrice: item.price };
      }
    });
    return Object.values(itemMap);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const printOrders = () => {
    const doc = new jsPDF();
    let yOffset = 30;

    doc.setFontSize(23); 
    doc.setFont("helvetica", "bold"); 
    doc.text(105, 20, "CAFE DINE", null, null, "center");

    doc.setFontSize(19);
    doc.setFont("helvetica", "normal");
    doc.text(10, yOffset, `Recent Orders for ${user.name}`);
    yOffset += 10; // Add some space after the heading

    recentOrders.forEach((order, index) => {
      const aggregatedItems = aggregateItems(order.items);

      aggregatedItems.forEach((item) => {
        doc.setFontSize(12);
        doc.text(10, yOffset, `${item.name} x ${item.quantity} - Rs.${item.totalPrice.toFixed(2)}`);
        yOffset += 10;
      });

      doc.setFontSize(16);
      doc.text(10, yOffset, `Total Amount: Rs.${order.totalAmount}`);
      yOffset += 5;

      doc.setLineWidth(0.1);
      doc.line(10, yOffset, 200, yOffset); // Horizontal line
      yOffset += 20; // Add some space after the line
    });

    doc.save("Recent_Orders.pdf");
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h1 className="profile-title">Customer Profile</h1>
        <h2 style={{color:"#FBF6A3", textTransform:"capitalize"}}>Hello, {user.name}!</h2>
        <p style={{color:"#FBF6A3"}}>{dayMessage}</p>
        <div className="clock">{currentTime}</div>
        <div className="profile-details">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone Number:</strong> {user.phone}</p>
          <p><strong>Address:</strong> {user.address}</p>
        </div>
        <button className="recent-orders-button" onClick={openModal}>Recent Orders</button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Recent Orders"
        className="profile-modal"
        overlayClassName="overlay"
      >
        <h2>Recent Orders</h2>
        {recentOrders.length > 0 ? (
          <ul>
            {recentOrders.map((order, index) => {
              const aggregatedItems = aggregateItems(order.items);
              return (
                <li key={index}>
                  {aggregatedItems.map((item) => (
                    <div key={item.id} className="order-item">
                      <span className="item-name">{item.name} x {item.quantity}</span>
                      <span className="item-price">₹{item.totalPrice.toFixed(2)}</span>
                    </div>
                  ))}
                  <br/>
                   <div className="total-amount-containerp">
                   <span className="total-amount-labelp"><strong>Total Amount: ₹{order.totalAmount}</strong></span>
                  </div>
                  <hr />
                <br/>
                </li>
              );
            })}
          </ul>
        ) : (
          <p>No recent orders</p>
        )}
        <button onClick={printOrders}>Print</button>
        <button onClick={closeModal} style={{backgroundColor:'#CF1020', marginLeft:'20px'}}>Close</button>
      </Modal>
    </div>
  );
};

export default Profile;

