// // components/UserLogger.jsx
// import React, { useEffect, useState } from "react";

// const Userlogger = () => {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     const stored = localStorage.getItem("loggedUsers");
//     if (stored) {
//       setUsers(JSON.parse(stored));
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("loggedUsers", JSON.stringify(users));
//   }, [users]);

//   const logUser = (user) => {
//     setUsers(prev => [...prev, { ...user, time: new Date().toLocaleString() }]);
//   };

//   const convertToCSV = (data) => {
//     const headers = Object.keys(data[0]).join(",") + "\n";
//     const rows = data.map(user => Object.values(user).join(",")).join("\n");
//     return headers + rows;
//   };

//   const downloadCSV = () => {
//     if (!users.length) return;
//     const csv = convertToCSV(users);
//     const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
//     const link = document.createElement("a");
//     link.href = URL.createObjectURL(blob);
//     link.setAttribute("download", "login_users.csv");
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   return (
//     <div style={{ marginTop: "20px" }}>
//       <button onClick={downloadCSV}>Export Login Users CSV</button>
//     </div>
//   );
// };

// export default Userlogger;

import React from "react";

const Userlogger = () => {
  const downloadCSV = () => {
    const users = JSON.parse(localStorage.getItem("loggedUsers")) || [];
    if (!users.length) {
      alert("No login data to export.");
      return;
    }

    const headers = Object.keys(users[0]).join(",") + "\n";
    const rows = users.map(user => Object.values(user).join(",")).join("\n");
    const csv = headers + rows;

    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "logged_users.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ marginTop: "20px", textAlign: "center" }}>
      <button onClick={downloadCSV}>📥 Download Login Users CSV</button>
    </div>
  );
};

export default Userlogger;
