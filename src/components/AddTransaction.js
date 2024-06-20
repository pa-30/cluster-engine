import { useState } from 'react';
import { addTransaction } from '../features/transactions/transactionSlice';
import { useDispatch } from 'react-redux';
import Modal from 'react-modal';

export const AddTransaction = () => {
  const dispatch = useDispatch();
  
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [token, setToken] = useState('')
  const [open, setOpen] = useState(false);

  const onSubmit = e => {
    e.preventDefault();
    const newTransaction = {
      name,
      url,
      token
    };
    dispatch(addTransaction(newTransaction));
  };

  // const handleInputChangeAccount = (e) => {
  //   setAccount(e.target.value);
  // };

  // const handleInputChangeCategory = (e) => {
  //   setText(e.target.value);
  // };

  // const handleInputChangeNote = (e) => {
  //   setNote(e.target.value);
  // };

  const openModalAdd = () => {
    setOpen(true);
  };

  const closeModalAdd = () => {
    setOpen(false);
  };

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

  return (
    <>
      <button onClick={openModalAdd} className="btn btn-block">Add Cluster</button>
      <Modal
        isOpen={open}
        onRequestClose={closeModalAdd}
        style={customStyles}
        ariaHideApp={false}
      >
        <h3>Add new cluster</h3>
        <button onClick={closeModalAdd} className='close-btn'>x</button>
        <form onSubmit={onSubmit} style={{ marginBottom: '10px' }}>
          <div style={{padding:'5px'}}>          <label className="form-label" style={{ marginBottom: '10px' }}>Cluster Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter cluster name..." required />
          </div>
<div style={{padding:'5px'}}>          <label className="form-label" style={{ marginBottom: '10px' }}>Cluster URL</label>
          <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Enter cluster url..." required />
          </div>
<div style={{padding:'5px'}}>          <label className="form-label" style={{ marginBottom: '10px' }}>Cluster token</label>
          <input type="text" value={token} onChange={(e) => setToken(e.target.value)} placeholder="Enter cluster token..." required />
        </div>

          <button className="btn" style={{marginTop:'30px', marginBottom: '25px' }}>Add</button>
        </form>
      </Modal>
    </>
  );
};
