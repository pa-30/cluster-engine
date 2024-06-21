import { numberWithCommas } from '../utils/format';
import { deleteTransaction ,generateReport, exportReport} from '../features/transactions/transactionSlice'
import { useDispatch } from 'react-redux'
import { useState } from 'react';
import Panel from './Panel';


export const Transaction = ({ transaction }) => {
    
  const dispatch = useDispatch()
  const [modalIsOpen, setIsOpen] = useState(false);
  console.log("Single transaction", transaction)

  const openModal = () => {
    setIsOpen(true);
  }
  const closeModal = () => {
    setIsOpen(false);
  }
  const handleGenerateReport = () => {
    dispatch(generateReport(transaction.id, transaction));
  };

  const handleExportReport = () => {
    dispatch(exportReport(transaction.id));
    
  };

  return (
    <div style={{ marginBottom: '15px', paddingBottom: '10px' }}>
      <li>
        <h5 style={{ padding: '10px' }}> {transaction.name}</h5>
          
      <button onClick={() => dispatch(deleteTransaction(transaction.id))} className="delete-btn"><i className="fas fa-trash-alt"></i></button>
      <button onClick={openModal} className="edit-btn"><i className="fas fa-pen-square"></i></button>
      <div className='action-buttons'>
      <button className="action-btn" onClick={handleGenerateReport}  >Generate Report</button>
      <button className="action-btn"  onClick={handleExportReport} >Export</button>
      </div>
      <Panel modalIsOpen={modalIsOpen} closeModal={closeModal } transaction={transaction}/>   
    </li>
    </div>
    
  );
};
