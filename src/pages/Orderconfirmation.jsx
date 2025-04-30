// import React, { useEffect, useState } from 'react';
// import { useLocation, Link } from 'react-router-dom';
// import jsPDF from 'jspdf';
// import autoTable from 'jspdf-autotable';
// import Papa from 'papaparse';
// import './Orderconfirmation.css';

// const OrderConfirmation = () => {
//   const { state } = useLocation();
//   const { name, address, paymentMethod, product, cart, total } = state || {};

//   const [productData, setProductData] = useState([]);

//   const orderId = `CR${Math.floor(Math.random() * 1000000)}`;

//   useEffect(() => {
//     fetch('/curated_product_sample.csv')
//       .then((res) => res.text())
//       .then((text) => {
//         Papa.parse(text, {
//           header: true,
//           skipEmptyLines: true,
//           complete: (result) => {
//             setProductData(result.data);
//           },
//         });
//       });
//   }, []);

//   const getDetailsByName = (name) => {
//     const match = productData.find(
//       (p) => p.ProductID === name || p.ModelID === name
//     );
//     return {
//       model: match?.ModelID || name,
//       brand: match?.BrandName || 'Unknown Brand',
//       category: match?.CategoryName || 'Unknown Category',
//     };
//   };

//   const generateInvoice = () => {
//     const doc = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });

//     const now = new Date();
//     const formattedDateTime = now.toLocaleString('en-IN', {
//       dateStyle: 'long',
//       timeStyle: 'short',
//     });

//     const logo = new Image();
//     logo.src = '/logo.png';

//     logo.onload = () => {
//       doc.addImage(logo, 'PNG', 90, 10, 30, 30);

//       doc.setFontSize(18);
//       doc.text('NovaCart - Invoice', 105, 50, null, null, 'center');

//       const y = 60;
//       doc.setFontSize(12);
//       doc.text(`Order ID: #${orderId}`, 20, y);
//       doc.text(`Customer: ${name}`, 20, y + 8);
//       doc.text(`Address: ${address}`, 20, y + 16);
//       doc.text(`Date & Time: ${formattedDateTime}`, 20, y + 24);
//       doc.text(`Payment Mode: ${paymentMethod}`, 20, y + 32);

//       const items = product
//         ? [[
//             getDetailsByName(product.name).model,
//             getDetailsByName(product.name).brand,
//             getDetailsByName(product.name).category,
//             `${product.price.toFixed(2)}`
//           ]]
//         : cart.map((item) => [
//             getDetailsByName(item.name).model,
//             getDetailsByName(item.name).brand,
//             getDetailsByName(item.name).category,
//             `${item.price.toFixed(2)}`
//           ]);

//       const totalAmount = product ? product.price : total;

//       autoTable(doc, {
//         startY: y + 40,
//         head: [['Product (ModelID)', 'Brand', 'Category', 'Price']],
//         body: items,
//         margin: { left: 20, right: 20 },
//       });

//       const finalY = doc.lastAutoTable?.finalY || y + 60;
//       doc.setFontSize(13);
//       doc.text(`Total: ${totalAmount.toFixed(2)}`, 20, finalY + 10);


//       doc.save('invoice.pdf');
//     };
//   };

//   return (
//     <div className="confirmation-container">
//       <div className="confirmation-card">
//         <h1>🎉 Thank You for Your Order!</h1>
//         <p>Your order has been placed successfully.</p>
//         <p><strong>Name:</strong> {name}</p>
//         <p><strong>Payment:</strong> {paymentMethod}</p>

//         <div className="order-details">
//           <p><strong>Order ID:</strong> #{orderId}</p>
//           <p><strong>Delivery:</strong> Estimated in 3–5 Business Days</p>
//         </div>

//         <button className="download-btn" onClick={generateInvoice}>
//           📄 Download Invoice
//         </button>
//         <Link to="/products" className="shop-more-btn">🛒 Continue Shopping</Link>
//       </div>
//     </div>
//   );
// };

// export default OrderConfirmation;

import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import Papa from 'papaparse';
import './Orderconfirmation.css';

const OrderConfirmation = () => {
  const { state } = useLocation();
  const { name, address, paymentMethod, product, cart, total } = state || {};

  const [productData, setProductData] = useState([]);

  const orderId = `CR${Math.floor(Math.random() * 1000000)}`;

  useEffect(() => {
    fetch('/curated_product_sample.csv')
      .then((res) => res.text())
      .then((text) => {
        Papa.parse(text, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            setProductData(result.data);
          },
        });
      });
  }, []);

  const getDetailsByName = (name) => {
    const match = productData.find(
      (p) => p.ProductID === name || p.ModelID === name
    );
    return {
      model: match?.ModelID || name,
      brand: match?.BrandName || 'Unknown Brand',
      category: match?.CategoryName || 'Unknown Category',
    };
  };

  const generateInvoice = () => {
    const doc = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });

    const now = new Date();
    const formattedDateTime = now.toLocaleString('en-IN', {
      dateStyle: 'long',
      timeStyle: 'short',
    });

    const logo = new Image();
    logo.src = '/logo.png';

    logo.onload = () => {
      doc.addImage(logo, 'PNG', 90, 10, 30, 30);

      doc.setFontSize(18);
      doc.text('NovaCart - Invoice', 105, 50, null, null, 'center');

      const y = 60;
      doc.setFontSize(12);
      doc.text(`Order ID: #${orderId}`, 20, y);
      doc.text(`Customer: ${name}`, 20, y + 8);
      doc.text(`Address: ${address}`, 20, y + 16);
      doc.text(`Date & Time: ${formattedDateTime}`, 20, y + 24);
      doc.text(`Payment Mode: ${paymentMethod}`, 20, y + 32);

      const items = product
        ? [[
            getDetailsByName(product.name).model,
            getDetailsByName(product.name).brand,
            getDetailsByName(product.name).category,
            `$${product.price.toFixed(2)}`
          ]]
        : cart.map((item) => [
            getDetailsByName(item.name).model,
            getDetailsByName(item.name).brand,
            getDetailsByName(item.name).category,
            `$${item.price.toFixed(2)}`
          ]);

      const totalAmount = product ? product.price : total;

      autoTable(doc, {
        startY: y + 40,
        head: [['Product (ModelID)', 'Brand', 'Category', 'Price']],
        body: items,
        margin: { left: 20, right: 20 },
      });

      const finalY = doc.lastAutoTable?.finalY || y + 60;
      doc.setFontSize(13);
      doc.text(`Total: $${totalAmount.toFixed(2)}`, 20, finalY + 10);

      doc.save('invoice.pdf');
    };
  };

  return (
    <div className="confirmation-container">
      <div className="confirmation-card">
        <h1>🎉 Thank You for Your Order!</h1>
        <p>Your order has been placed successfully.</p>
        <p><strong>Name:</strong> {name}</p>
        <p><strong>Payment:</strong> {paymentMethod}</p>

        <div className="order-details">
          <p><strong>Order ID:</strong> #{orderId}</p>
          <p><strong>Delivery:</strong> Estimated in 3–5 Business Days</p>
        </div>

        <button className="download-btn" onClick={generateInvoice}>
          📄 Download Invoice
        </button>
        <Link to="/products" className="shop-more-btn">🛒 Continue Shopping</Link>
      </div>
    </div>
  );
};

export default OrderConfirmation;
