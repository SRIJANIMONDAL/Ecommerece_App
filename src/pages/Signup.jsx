// import React, { useEffect, useState } from "react";
// import Papa from "papaparse";
// import { useNavigate } from "react-router-dom";
// import "./Signup.css";

// const Signup = () => {
//   const [csvUsers, setCsvUsers] = useState([]);
//   const [selectedEmail, setSelectedEmail] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     Papa.parse("/sampled_users.csv", {
//       download: true,
//       header: true,
//       complete: (results) => {
//         const filteredUsers = results.data.filter(
//           (user) => user.email && user.email.trim() !== ""
//         );
//         setCsvUsers(filteredUsers);
//       },
//       error: (err) => {
//         console.error("CSV Parsing Error:", err);
//       },
//     });
//   }, []);

//   const handleSignup = (e) => {
//     e.preventDefault();
//     const user = csvUsers.find((u) => u.email === selectedEmail);
//     if (user) {
//       localStorage.setItem("user", JSON.stringify(user));
//       alert(`Signed up & Logged in as ${user.username}`);
//       navigate("/");
//     }
//   };

//   return (
//     <div className="signup-container">
//       <div className="signup-box">
//         <h2>Sign Up</h2>
//         <form onSubmit={handleSignup}>
//           <label>Select Email</label>
//           <select
//             value={selectedEmail}
//             onChange={(e) => setSelectedEmail(e.target.value)}
//             required
//           >
//             <option value="">-- Select your email --</option>
//             {csvUsers.map((user, index) => (
//               <option key={index} value={user.email}>
//                 {user.email}
//               </option>
//             ))}
//           </select>

//           <button type="submit" className="signup-btn">
//             Sign Up & Login
//           </button>
//         </form>
//         <p className="login-link">
//           Already signed up? <a href="/login">Login</a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Signup;

// import React, { useEffect, useState } from "react";
// import Papa from "papaparse";
// import { useNavigate } from "react-router-dom";
// import "./Signup.css";

// const Signup = () => {
//   const [csvUsers, setCsvUsers] = useState([]);
//   const [selectedEmail, setSelectedEmail] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     Papa.parse("/sampled_users.csv", {
//       download: true,
//       header: true,
//       complete: (results) => {
//         const filteredUsers = results.data.filter(
//           (user) => user.email && user.email.trim() !== ""
//         );
//         setCsvUsers(filteredUsers);
//       },
//       error: (err) => {
//         console.error("CSV Parsing Error:", err);
//       },
//     });
//   }, []);

//   const handleSignup = (e) => {
//     e.preventDefault();
//     const user = csvUsers.find((u) => u.email === selectedEmail);
//     if (user) {
//       localStorage.setItem("user", JSON.stringify(user));
//       localStorage.setItem("loggedInEmail", user.email); // ✅ important
//       alert(`Signed up & Logged in as ${user.username}`);
//       navigate("/");
//     }
//   };

//   return (
//     <div className="signup-container">
//       <div className="signup-box">
//         <h2>Sign Up</h2>
//         <form onSubmit={handleSignup}>
//           <label>Select Email</label>
//           <select
//             value={selectedEmail}
//             onChange={(e) => setSelectedEmail(e.target.value)}
//             required
//           >
//             <option value="">-- Select your email --</option>
//             {csvUsers.map((user, index) => (
//               <option key={index} value={user.email}>
//                 {user.email}
//               </option>
//             ))}
//           </select>

//           <button type="submit" className="signup-btn">
//             Sign Up & Login
//           </button>
//         </form>
//         <p className="login-link">
//           Already signed up? <a href="/login">Login</a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Signup;
import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

const Signup = ({ handleLogin }) => {
  const [csvUsers, setCsvUsers] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    Papa.parse("/sampled_users.csv", {
      download: true,
      header: true,
      complete: (results) => {
        const filteredUsers = results.data.filter(
          (user) => user.email && user.email.trim() !== ""
        );
        setCsvUsers(filteredUsers);
      },
      error: (err) => {
        console.error("CSV Parsing Error:", err);
      },
    });
  }, []);

  const handleSignup = (e) => {
    e.preventDefault();
    const user = csvUsers.find((u) => u.email === selectedEmail);
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("loggedInEmail", user.email);
      alert(`Signed up & Logged in as ${user.username}`);
      handleLogin(); // ✅ This sets isLoggedIn to true in App.jsx
      navigate("/");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Sign Up</h2>
        <form onSubmit={handleSignup}>
          <label>Select Email</label>
          <select
            value={selectedEmail}
            onChange={(e) => setSelectedEmail(e.target.value)}
            required
          >
            <option value="">-- Select your email --</option>
            {csvUsers.map((user, index) => (
              <option key={index} value={user.email}>
                {user.email}
              </option>
            ))}
          </select>

          <button type="submit" className="signup-btn">
            Sign Up & Login
          </button>
        </form>
        <p className="login-link">
          Already signed up? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
