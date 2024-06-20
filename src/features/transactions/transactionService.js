import axios from 'axios';

const API_URL = 'openshift/cluster/';

// Create new transaction
const addTransaction = async (transactionData) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    },
  }
  const response = await axios.post(API_URL, transactionData, config);
  return response.data.data.data
}

// Get user transactions
const getTransactions = async () => {
  
  const response = await axios.get(API_URL)
  return response.data.data.data
}

// Update user transaction
const updateTransaction = async (transactionData) => {
  const id = transactionData._id
  const updateData = {
    name: transactionData.name,
    url: transactionData.url,
    token: transactionData.token
  }

  const response = await axios.put(API_URL  + id , updateData)

  return response.data.data.data
}

// Delete user transaction
const deleteTransaction = async (transactionId) => {
  const response = await axios.delete(API_URL + transactionId)
  return response.data.data.data
}

const transactionService = {
  addTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
}

export default transactionService
