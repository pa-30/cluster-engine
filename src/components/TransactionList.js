import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Pagination from 'react-responsive-pagination';
import { Transaction } from './Transaction';
import { generateReport, exportReport } from '../features/transactions/transactionSlice';
import { toast } from 'react-toastify';

export const TransactionList = () => {
  const { transactions} = useSelector((state) => state.transactions);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (transactions) {
      setTotal(Math.ceil(transactions.length / 10));
      const filteredItems = transactions.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.url.toLowerCase().includes(searchTerm.toLowerCase())
      );
      const startIdx = Math.max(0, 10 * (currentPage - 1));
      const endIdx = Math.min(10 * currentPage, filteredItems.length);
      setItems(filteredItems.slice(startIdx, endIdx));
    }
  }, [currentPage, transactions, searchTerm]);

  const handleGenerateReport = (transactionId) => {
    dispatch(generateReport(transactionId));
    // Optionally, you can handle success or failure here
  };

  const handleExportReport = (transactionId) => {
    dispatch(exportReport(transactionId));
    // Optionally, you can handle success or failure here
  };

  
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset pagination when searching
  };

  return (
    <>
      <h3>Clusters</h3>
      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          placeholder="Search by Cluster Name or URL"
          value={searchTerm}
          onChange={handleSearch}
          style={{ padding: '8px', width: '93vw', marginTop:'40px', marginBottom: '20px', height: '60px',position: 'relative'}}
        />
      </div>
      <ul className="list">
        {items.map((item) => (
          <Transaction key={item.id} transaction={item} handleGenerateReport={handleGenerateReport} handleExportReport={handleExportReport} />
        ))}
      </ul>
      <Pagination
        current={currentPage}
        total={total}
        onPageChange={setCurrentPage}
      />
    </>
  );
};


// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import Pagination from 'react-responsive-pagination';
// import { Transaction } from './Transaction';
// import { generateReport, exportReport } from '../features/transactions/transactionSlice';

// export const TransactionList = () => {
//   const { transactions } = useSelector((state) => state.transactions);
//   const dispatch = useDispatch();
//   const [currentPage, setCurrentPage] = useState(1);
//   const [total, setTotal] = useState(1);
//   const [items, setItems] = useState([]);

//   useEffect(() => {
//     if (transactions) {
//       setTotal(Math.ceil(transactions.length / 10));
//       const startIdx = Math.max(0, 10 * (currentPage - 1));
//       const endIdx = Math.min(10 * currentPage, transactions.length);
//       setItems(transactions.slice(startIdx, endIdx));
//     }
//   }, [currentPage, transactions]);

//   const handleGenerateReport = (transactionId) => {
//     dispatch(generateReport(transactionId));
//     // Optionally, you can handle success or failure here
//   };

//   const handleExportReport = (transactionId) => {
//     dispatch(exportReport(transactionId));
//     // Optionally, you can handle success or failure here
//   };

//   return (
//     <>
//       <h3>Clusters</h3>
//         <ul className="list">
//             <div style={{ display: 'flex', flexDirection: 'column' }}>
//             <li>
//             <h5 style={{ padding: '10px' }}>  <b>Cluster Name </b></h5>
            
//             </li>
//             </div>
//             {items.map((item) => (
//             <Transaction key={item.id} transaction={item} />
//             ))}
//         </ul>
//       <Pagination
//         current={currentPage}
//         total={total}
//         onPageChange={setCurrentPage}
//       />
//     </>
//   );
// };
