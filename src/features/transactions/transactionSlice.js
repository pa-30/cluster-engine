import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import transactionService from './transactionService';
import { toast } from 'react-toastify';

const initialState = {
  transactions: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Create new transaction
export const addTransaction = createAsyncThunk(
  'transactions/add',
  async (transactionData, thunkAPI) => {
    try {
        const response = await transactionService.addTransaction(transactionData);
        toast.success('Transaction added successfully.');
        return response;
    } catch (error) {
        const message =
            (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString();
        toast.error(`Failed to add transaction: ${message}`);
        return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get user transactions
export const getTransactions = createAsyncThunk(
  'transactions/getAll',
  async (_, thunkAPI) => {
    try {
        const response = await transactionService.getTransactions();
        
        return response;
    } catch (error) {
        const message =
            (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString();
        return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update user transaction
export const updateTransaction = createAsyncThunk(
  'transactions/update',
  async (transactionData, thunkAPI) => {
    try {
        const response = await transactionService.updateTransaction(transactionData);
        toast.success('Transaction updated successfully.');
        return response;
    } catch (error) {
        const message =
            (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString();
        toast.error(`Failed to update transaction: ${message}`);
        return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete user transaction
export const deleteTransaction = createAsyncThunk(
  'transactions/delete',
  async (id, thunkAPI) => {
    try {
        const response=await transactionService.deleteTransaction(id);
        toast.success('Transaction deleted successfully.');
        return response;
    } catch (error) {
        const message =
            (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString();
        toast.error(`Failed to delete transaction: ${message}`);
        return thunkAPI.rejectWithValue(message);
        }
  }
);

// Generate report async thunk
export const generateReport = createAsyncThunk(
    'transactions/generateReport',
    async (transactionData, thunkAPI) => {
      try {
        const response= await transactionService.generateReport(transactionData);
        toast.success('Report generated successfully.');
        return response;
      } catch (error) {
        const message =
            (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString();
        toast.error(`Failed to generate report: ${message}`);
        return thunkAPI.rejectWithValue(message);
      }
    }
  );
  
  // Export report async thunk
  export const exportReport = createAsyncThunk(
    'transactions/exportReport',
    async (transactionId, thunkAPI) => {
      try {
        const response = await transactionService.exportReport(transactionId);
        toast.success('Report exported successfully.');
        return response;
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        toast.error(`Failed to export report: ${message}`);
        return thunkAPI.rejectWithValue(message);
      }
    }
  );


export const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
    .addCase(addTransaction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.transactions.unshift(action.payload);
      })
      .addCase(addTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getTransactions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.transactions = action.payload;
      })
      .addCase(getTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateTransaction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.transactions = state.transactions.map((transaction) =>
          transaction.id === action.payload.id ? action.payload : transaction
        );
      })
      .addCase(updateTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteTransaction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.transactions = state.transactions.filter(
          (transaction) => transaction.id !== action.payload.id // Use action.payload directly
        );
      })
      .addCase(deleteTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
    });
  },
});

export const { reset } = transactionSlice.actions;
export default transactionSlice.reducer;
