import { numberWithCommas } from '../utils/format';
import { deleteTransaction } from '../features/transactions/transactionSlice'
import { useDispatch } from 'react-redux'
import { useState } from 'react';
import Panel from './Panel';


export const Transaction = ({ transaction }) => {

  const dispatch = useDispatch()
  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  }
  const closeModal = () => {
    setIsOpen(false);
  }


  return (
     <div style={{display: 'flex', flexDirection: 'column'}}>
      <li >
        <h5>{transaction.name}</h5>
          <span ><h5> {transaction.url}</h5></span>
      <button onClick={() => dispatch(deleteTransaction(transaction.id))} className="delete-btn"><i className="fas fa-trash-alt"></i></button>
      <button onClick={openModal} className="edit-btn"><i className="fas fa-pen-square"></i></button>
      <Panel modalIsOpen={modalIsOpen} closeModal={closeModal } transaction={transaction}/>   
    </li>
    </div>
  )
}
