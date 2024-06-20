// import React, { useState , useEffect , useMemo } from 'react';
// import { useSelector } from 'react-redux';
// import Pagination from 'react-responsive-pagination';
// import { Transaction } from './Transaction';

// export const TransactionList = () => {
//   const {transactions} = useSelector(state => state.transactions)
//   const [currentPage, setCurrentPage] = useState(1);
//   const [total,setTotal] = useState(1)
//   const [item,setItem] = useState([])
//   console.log("transactions list", transactions)
//   useEffect(() =>{

//     setTotal(Math.ceil(transactions.length/10))
//     var strt = Math.max(0,10*(currentPage-1))
//     var end = Math.max(10*(currentPage-1),currentPage*10)
//     setItem(transactions.slice(strt,end))
//     console.log(transactions)
//   },[currentPage,transactions])

//   return (
//     <>
//       <h3>Clusters</h3>
//       <ul className="list"> 
//         {item.map(item => (<Transaction key={item.id} transaction={item} />))}
//         <Pagination
//           current={currentPage}
//           total={total}
//           onPageChange={setCurrentPage}
//         />
//       </ul>
      
//     </>
//   )
// }


import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Pagination from 'react-responsive-pagination';
import { Transaction } from './Transaction';

export const TransactionList = () => {
  const { transactions } = useSelector(state => state.transactions);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [items, setItems] = useState([]);
  console.log(transactions)
  useEffect(() => {
    if (transactions) {
      setTotal(Math.ceil(transactions.length / 10));
      const startIdx = Math.max(0, 10 * (currentPage - 1));
      const endIdx = Math.min(10 * currentPage, transactions.length);
      setItems(transactions.slice(startIdx, endIdx));
    }
  }, [currentPage, transactions]);

  if (!transactions) {
    return <p>No transactions found.</p>; // Handle case where transactions is undefined
  }

  return (
    <>
      <h3>Transactions</h3>
      <ul className="list">
      <div style={{display: 'flex', flexDirection: 'column'}}>
      <li >
        <h5>Cluster Name</h5>
          <span ><h5> Cluster Endpoint</h5></span>
          </li>
          </div>
        {items.map(item => (
          <Transaction key={item.id} transaction={item} />
        ))}
        <Pagination
          current={currentPage}
          total={total}
          onPageChange={setCurrentPage}
        />
      </ul>
    </>
  );
};
