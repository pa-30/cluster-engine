import { numberWithCommas } from '../utils/format';
import { deleteTransaction ,generateReport, exportReport} from '../features/transactions/transactionSlice'
import { useDispatch } from 'react-redux'
import { useState } from 'react';
import Panel from './Panel';
import Spinner from './Spinner'; 



export const Transaction = ({ transaction }) => {
    
  const dispatch = useDispatch()
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isReportGenerated, setIsReportGenerated] = useState(false);
  console.log("Single transaction", transaction)

  const openModal = () => {
    setIsOpen(true);
  }
  const closeModal = () => {
    setIsOpen(false);
  }
  const handleGenerateReport = async () => {
    setIsLoading(true);
    try {
      await dispatch(generateReport(transaction));
      // Optionally handle success
      setIsReportGenerated(true); 
    } catch (error) {
      // Optionally handle error
      console.error('Failed to generate report:', error);
      setIsReportGenerated(false); 
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportReport = async () => {
    setIsLoading(true);
    try {
      await dispatch(exportReport(transaction.id));
      // Optionally handle success
    } catch (error) {
      // Optionally handle error
      console.error('Failed to export report:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ marginBottom: '15px', paddingBottom: '10px' }}>
      {isLoading && <Spinner />}
      <li>
        <h5 style={{ padding: '25px 0',  margin:'0' }}> {transaction.name}</h5>
          
      <button onClick={() => dispatch(deleteTransaction(transaction.id))} className="delete-btn"><i className="fas fa-trash-alt"></i></button>
      <button onClick={openModal} className="edit-btn"><i className="fas fa-pen-square"></i></button>
      <div className='action-buttons'>
      <button className="action-btn" onClick={handleGenerateReport}  >Generate Report</button>
      <button className="action-btn"  onClick={handleExportReport} disabled={!isReportGenerated} style={{ 
              backgroundColor: isReportGenerated ? '#4CAF50' : '#CCCCCC', 
              color: isReportGenerated ? '#FFFFFF' : '#666666',
              cursor: isReportGenerated ? 'pointer' : 'not-allowed'
            }}>Export</button>
      </div>
      <Panel modalIsOpen={modalIsOpen} closeModal={closeModal } transaction={transaction}/>   
    </li>
    </div>
    
  );
};
