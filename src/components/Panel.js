import Modal from 'react-modal';
import { useState } from 'react';
import { updateTransaction } from '../features/transactions/transactionSlice'
import { useDispatch } from 'react-redux'

function Panel({modalIsOpen, closeModal, transaction}) {
    const dispatch = useDispatch();
    const [id, setId] = useState(transaction.id)
    const [name, setName] = useState(transaction.name);
    const [url, setUrl] = useState(transaction.url);
    const [token, setToken] = useState(transaction.token)
    const [open, setOpen] = useState(false);

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '50%',
      zIndex: '200',
    },
  };
  const onSubmit = e => {
    e.preventDefault();

    const newTransaction = {
      id:id,
      name,
      url,
      token
    }

    dispatch(updateTransaction(newTransaction));
    
  }
  
  return (
    <>
    {/* <button onClick={modalIsOpen} className="btn btn-block">Add Cluster</button> */}
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      ariaHideApp={false}
    >
      <h3>Update cluster</h3>
      <button onClick={closeModal} className='close-btn'>x</button>
      <form onSubmit={onSubmit} style={{ marginBottom: '10px' }}>
        <div style={{padding:'5px'}}>          <label className="form-label" style={{ marginBottom: '10px' }}>Cluster Name</label>
        <input type="text" value={name} onChange={(e) => {setName(e.target.value);}} placeholder="Enter cluster name..." required />
        </div>
       <div style={{padding:'5px'}}>         
        <label className="form-label" style={{ marginBottom: '10px' }}>Cluster URL</label>
        <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Enter cluster url..." required />
        </div>
        <div style={{padding:'5px'}}>         
        <label className="form-label" style={{ marginBottom: '10px' }}>Cluster token</label>
          <input type="text" value={token} onChange={(e) => setToken(e.target.value)} placeholder="Enter cluster token..." required />
        </div>

        <button className="btn" style={{marginTop:'30px', marginBottom: '25px' }}>Add</button>
      </form>
    </Modal>
  </>
  )
}
export default Panel