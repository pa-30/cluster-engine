import React from 'react';
import { AddTransaction } from '../components/AddTransaction';

function Header() {
  return (
    <header className='header'>
      <div className='logo' style={{ display: 'flex', alignItems: 'center',justifyContent: 'space-between', marginBottom: '0' }}>
        <div><h2 style={{ fontWeight: 'bold' }}>Cluster Validation Engine</h2>
        <i>Indradhanus</i></div>
      </div>
      <div>
        <AddTransaction />
      </div>
    </header>
  );
}

export default Header;

