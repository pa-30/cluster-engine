import React, { useState , useEffect , useMemo } from 'react';
import { useSelector } from 'react-redux';
import Pagination from 'react-responsive-pagination';
import { Transaction } from './Transaction';

export const TransactionList = () => {
  const {transactions} = useSelector(state => state.transactions)
  const [currentPage, setCurrentPage] = useState(1);
  const [total,setTotal] = useState(1)
  const [item,setItem] = useState([])
  console.log("transactions list", transactions)
  useEffect(() =>{

    setTotal(Math.ceil(transactions.length/10))
    var strt = Math.max(0,10*(currentPage-1))
    var end = Math.max(10*(currentPage-1),currentPage*10)
    // console.log(strt,end)
    setItem(transactions.slice(strt,end))
    console.log(transactions)
  },[currentPage,transactions])

//  console.log(chart)
// console.log("Assaults")
  return (
    <>
      <h3>Clusters</h3>
      <ul className="list"> 
        {item.map(item => (<Transaction key={item.id} transaction={item} />))}
        <Pagination
          current={currentPage}
          total={total}
          onPageChange={setCurrentPage}
        />
      </ul>
      
    </>
  )
}
