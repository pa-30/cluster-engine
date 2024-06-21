// transactionService.js

import axios from 'axios';

const API_URL = 'http://localhost:3000/openshift/cluster/';

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000, 
  retry: 3, 
  retryDelay: (retryCount) => {
    return retryCount * 8000;
  },
});


axiosInstance.interceptors.response.use(undefined, (err) => {
  const config = err.config;
  if (!config || !config.retry) return Promise.reject(err);

  config.retryCount = config.retryCount || 0;

  if (config.retryCount >= config.retry) {
    return Promise.reject(err);
  }

  config.retryCount += 1;

  const delay = config.retryDelay ? config.retryDelay(config.retryCount) : 0;

  return new Promise((resolve) => {
    setTimeout(() => resolve(axiosInstance(config)), delay);
  });
});

const handleRequestError = (error) => {
  let errorMessage = '';

  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    errorMessage = error.response.data.message || error.response.statusText;
  } else if (error.request) {
    // The request was made but no response was received
    errorMessage = 'No response from server.';
  } else {
    // Something happened in setting up the request that triggered an Error
    errorMessage = error.message || 'An error occurred.';
  }

  return errorMessage;
};

// Create new transaction
export const addTransaction = async (transactionData) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    },
    retry: 3, // Number of retries for this specific request
  };

  try {
    const response = await axiosInstance.post('', transactionData, config);
    return response.data.data.data;
  } catch (error) {
    const message = handleRequestError(error); // Use handleRequestError here
    throw new Error(message);
  }
};

// Get user transactions
export const getTransactions = async () => {
  const config = {
    retry: 3, // Number of retries for this specific request
  };

  try {
    const response = await axiosInstance.get('', config);
    return response.data.data.data;
  } catch (error) {
    const message = handleRequestError(error); // Use handleRequestError here
    throw new Error(message);
  }
};

// Update user transaction
export const updateTransaction = async (transactionData) => {
  const id = transactionData.id;
  const updateData = {
    name: transactionData.name,
    url: transactionData.url,
    token: transactionData.token
  };

  const config = {
    headers: {
      'Content-Type': 'application/json'
    },
    retry: 3, // Number of retries for this specific request
  };

  try {
    const response = await axiosInstance.put(`${id}`, updateData, config);
    return response.data.data.data;
  } catch (error) {
    const message = handleRequestError(error); // Use handleRequestError here
    throw new Error(message);
  }
};

// Delete user transaction
export const deleteTransaction = async (transactionId) => {
  const config = {
    retry: 3, // Number of retries for this specific request
  };

  try {
    await axiosInstance.delete(`${transactionId}`, config);
    return { id: transactionId }; // Ensure the correct ID is returned
  } catch (error) {
    const message = handleRequestError(error); // Use handleRequestError here
    throw new Error(message);
  }
};

export const generateReport = async (transactionId) => {
    const config = {
        headers: {
                'Content-Type': 'application/json'
        },
        retry: 3, // Number of retries for this specific request
    };
  
    try {
      await axiosInstance.post(`${transactionId}/report`, config);
      return { id: transactionId }; // Ensure the correct ID is returned
    } catch (error) {
      const message = handleRequestError(error); // Use handleRequestError here
      throw new Error(message);
    }
};
  
export const exportReport = async (transactionId) => {
    const config = {
      retry: 3, // Number of retries for this specific request
    };
  
    try {
      await axiosInstance.get(`${transactionId}/report', config);
      return { id: transactionId }; // Ensure the correct ID is returned
    } catch (error) {
      const message = handleRequestError(error); // Use handleRequestError here
      throw new Error(message);
    }
};


const transactionService = {
  addTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
  generateReport,
  exportReport,
};

export default transactionService;


// import axios from 'axios';

// const API_URL = 'http://localhost:3000/openshift/cluster/';

// // Circuit breaker state
// let consecutiveFailures = 0;
// const MAX_CONSECUTIVE_FAILURES = 3;
// let circuitOpen = false;

// const axiosInstance = axios.create({
//   baseURL: API_URL,
//   timeout: 10000, // Timeout in milliseconds (e.g., 10 seconds)
// });

// // Axios interceptor to handle retries
// axiosInstance.interceptors.response.use(undefined, (err) => {
//   if (circuitOpen) {
//     return Promise.reject(new Error('Circuit breaker is open. Please try again later.'));
//   }

//   const config = err.config;
//   if (!config || !config.retry) return Promise.reject(err);

//   config.retryCount = config.retryCount || 0;

//   if (config.retryCount >= config.retry) {
//     consecutiveFailures++;
//     if (consecutiveFailures > MAX_CONSECUTIVE_FAILURES) {
//       circuitOpen = true;
//       setTimeout(() => {
//         circuitOpen = false;
//         consecutiveFailures = 0;
//       }, 10000); // Circuit breaker open duration, e.g., 10 seconds
//     }
//     return Promise.reject(err);
//   }

//   config.retryCount += 1;

//   const delay = config.retryDelay ? config.retryDelay(config.retryCount) : 0;

//   return new Promise((resolve) => {
//     setTimeout(() => resolve(axiosInstance(config)), delay);
//   });
// });

// const handleRequestError = (error) => {
//   let errorMessage = '';

//   if (error.response) {
//     errorMessage = error.response.data.message || error.response.statusText;
//   } else if (error.request) {
//     errorMessage = 'No response from server.';
//   } else {
//     errorMessage = error.message || 'An error occurred.';
//   }

//   return errorMessage;
// };

// // Create new transaction
// export const addTransaction = async (transactionData) => {
//   const config = {
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     retry: 3, // Number of retries for this specific request
//     retryDelay: (retryCount) => retryCount * 1000, // Exponential backoff: 1s, 2s, 4s, etc.
//   };

//   try {
//     const response = await axiosInstance.post('/', transactionData, config);
//     consecutiveFailures = 0; // Reset consecutive failures on success
//     return response.data.data.data;
//   } catch (error) {
//     const message = handleRequestError(error); // Use handleRequestError here
//     throw new Error(message);
//   }
// };

// // Get user transactions
// export const getTransactions = async () => {
//   const config = {
//     retry: 3, // Number of retries for this specific request
//     retryDelay: (retryCount) => retryCount * 1000, // Exponential backoff: 1s, 2s, 4s, etc.
//   };

//   try {
//     const response = await axiosInstance.get('/', config);
//     consecutiveFailures = 0; // Reset consecutive failures on success
//     return response.data.data.data;
//   } catch (error) {
//     const message = handleRequestError(error); // Use handleRequestError here
//     throw new Error(message);
//   }
// };

// // Update user transaction
// export const updateTransaction = async (transactionData) => {
//   const id = transactionData._id;
//   const updateData = {
//     name: transactionData.name,
//     url: transactionData.url,
//     token: transactionData.token,
//   };

//   const config = {
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     retry: 3, // Number of retries for this specific request
//     retryDelay: (retryCount) => retryCount * 1000, // Exponential backoff: 1s, 2s, 4s, etc.
//   };

//   try {
//     const response = await axiosInstance.put(`/${id}`, updateData, config);
//     consecutiveFailures = 0; // Reset consecutive failures on success
//     return response.data.data.data;
//   } catch (error) {
//     const message = handleRequestError(error); // Use handleRequestError here
//     throw new Error(message);
//   }
// };

// // Delete user transaction
// export const deleteTransaction = async (transactionId) => {
//   const config = {
//     retry: 3, // Number of retries for this specific request
//     retryDelay: (retryCount) => retryCount * 1000, // Exponential backoff: 1s, 2s, 4s, etc.
//   };

//   try {
//     const response = await axiosInstance.delete(`/${transactionId}`, config);
//     consecutiveFailures = 0; // Reset consecutive failures on success
//     return response.data.data.data;
//   } catch (error) {
//     const message = handleRequestError(error); // Use handleRequestError here
//     throw new Error(message);
//   }
// };

// const transactionService = {
//   addTransaction,
//   getTransactions,
//   updateTransaction,
//   deleteTransaction,
// };

// export default transactionService;
