// // src/pages/NotFoundPage.js
// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import '../styles/NotFoundPage.css';

// function NotFoundPage() {
//   const navigate = useNavigate();

//   const handleGoHome = () => {
//     navigate('/');
//   };

//   return (
//     <div className="not-found-container">
//       <h1>404 - Not Found</h1>
//       <p>Sorry, the page you are looking for does not exist.</p>
//       <button onClick={handleGoHome}>Go Back to Home</button>
//     </div>
//   );
// }

// export default NotFoundPage;


// src/pages/NotFoundPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/NotFoundPage.css';

function NotFoundPage() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="not-found-background">
      <div className="not-found-container">
        <h1>404 - Not Found</h1>
        <p>Sorry, the page you are looking for does not exist.</p>
        <button onClick={handleGoHome}>Go Back to Home</button>
      </div>
    </div>
  );
}

export default NotFoundPage;
