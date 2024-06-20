import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../components/Spinner';
import { getTransactions, reset } from '../features/transactions/transactionSlice';
// import { Balance } from '../components/Balance';
// import { IncomeExpenses } from '../components/IncomeExpenses';
import { TransactionList } from '../components/TransactionList';
// import { TransactionCharts } from '../components/charts';

function Dashboard() {
  const dispatch = useDispatch();
  const { isLoading, isError, message } = useSelector((state) => state.transactions);

  // const [chart, setChart] = useState(false);
  // const [hist, setHist] = useState(true);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(getTransactions());

    return () => {
      dispatch(reset());
    };
  }, [isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  // const handleChart = () => { 
  //   setChart(true); 
  //   setHist(false);
  // };

  // const handleHistory = () => { 
  //   setHist(true);
  //   setChart(false);
  // };

  return (
    <>
            {
        isLoading ? <Spinner /> :
          <>

      <section className='heading'>
        <h3><i>Validate your Clusters in one go !!!!</i></h3>
        {/* <Balance /> */}
      </section>
      {/* <IncomeExpenses /> */}
      
      <section>
      <TransactionList />
      </section>
      {/* <section className='content'>
        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
          <button onClick={handleHistory} style={{ marginRight: '5px' }} className="btn btn-block">History</button>
          <button onClick={handleChart} style={{ marginLeft: '5px' }}  className="btn btn-block">Charts</button>
        </div>
        {chart && <TransactionCharts />}
        {hist && <TransactionList />}
      </section> */}
      </> }
    </>
  );
}

export default Dashboard;
