// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const LogoutButton = () => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem('loggedInUser');
//     navigate('/login');
//   };

//   return (
//     <button
//       onClick={handleLogout}
//       style={{
//         padding: '10px 20px',
//         backgroundColor: '#ff4d4d',
//         color: 'white',
//         border: 'none',
//         borderRadius: '5px',
//         cursor: 'pointer',
//         fontWeight: 'bold'
//       }}
//     >
//       Logout
//     </button>
//   );
// };

// export default LogoutButton;

import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear localStorage or session data
    localStorage.removeItem('loggedInUser');

    // Redirect to login page
    navigate('/login');
  };

  return (
    <button onClick={handleLogout} style={styles.button}>
      Logout
    </button>
  );
};

const styles = {
  button: {
    padding: '10px 20px',
    backgroundColor: '#ff4d4d',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
};

export default LogoutButton;
