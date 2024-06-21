// import React, { useState, useEffect, useMemo } from 'react';
// import { useSelector } from 'react-redux';
// import Pagination from 'react-responsive-pagination';
// import { Transaction } from './Transaction';
// import SearchBar from './searchbar';

// export const TransactionList = () => {
//   const transactionsState = useSelector((state) => state.transaction);
//   const transactions = transactionsState ? transactionsState.transactions : [];
//   const [currentPage, setCurrentPage] = useState(1);
//   const [items, setItems] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');

//   // Filter transactions based on search query
//   const filteredTransactions = useMemo(() => {
//     return transactions.filter((transaction) =>
//       transaction.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       transaction.url.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//   }, [transactions, searchQuery]);

//   // Update items when currentPage or filteredTransactions change
//   useEffect(() => {
//     const startIdx = Math.max(0, 10 * (currentPage - 1));
//     const endIdx = Math.min(10 * currentPage, filteredTransactions.length);
//     setItems(filteredTransactions.slice(startIdx, endIdx));
//   }, [currentPage, filteredTransactions]);

//   // Reset currentPage to 1 when searchQuery changes
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [searchQuery]);

//   if (!transactions || transactions.length === 0) {
//     return <p>No transactions found.</p>;
//   }

//   return (
//     <>
//       <SearchBar onSearch={setSearchQuery} />
//       <h3>Transactions</h3>
//       <ul className="list">
//         <div style={{ display: 'flex', flexDirection: 'column' }}>
//           <li>
//             <h5>Cluster Name</h5>
//             <span>
//               <h5>Cluster Endpoint</h5>
//             </span>
//           </li>
//         </div>
//         {items.map((item) => (
//           <Transaction key={item.id} transaction={item} />
//         ))}
//       </ul>
//       <Pagination
//         current={currentPage}
//         total={Math.ceil(filteredTransactions.length / 10)}
//         onPageChange={setCurrentPage}
//       />
//     </>
//   );
// };



import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Pagination from 'react-responsive-pagination';
import { Transaction } from './Transaction';
import { generateReport, exportReport } from '../features/transactions/transactionSlice';

export const TransactionList = () => {
  const { transactions } = useSelector((state) => state.transactions);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (transactions) {
      setTotal(Math.ceil(transactions.length / 10));
      const startIdx = Math.max(0, 10 * (currentPage - 1));
      const endIdx = Math.min(10 * currentPage, transactions.length);
      setItems(transactions.slice(startIdx, endIdx));
    }
  }, [currentPage, transactions]);

  const handleGenerateReport = (transactionId) => {
    dispatch(generateReport(transactionId));
    // Optionally, you can handle success or failure here
  };

  const handleExportReport = (transactionId) => {
    dispatch(exportReport(transactionId));
    // Optionally, you can handle success or failure here
  };

  return (
    <>
      <h3>Clusters</h3>
      <ul className="list">
        {items.map((item) => (
          <li key={item.id}>
            <Transaction transaction={item} />
            <div>
              <button  className="btn" onClick={() => handleGenerateReport(item.id)} style={{marginTop:'30px', marginBottom: '25px',  }} >Generate Report</button>
              <button  className="btn" onClick={() => handleExportReport(item.id)} style={{marginTop:'30px', marginBottom: '25px' }}>Export</button>
            </div>
          </li>
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
