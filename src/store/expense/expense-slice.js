const { createSlice } = require("@reduxjs/toolkit");

export const expenseSlice = createSlice({
  name: "expenseSlice",
  initialState: {
    expenseList: [
      { name: "Apple", price: 1.0 },
      { name: "Laptop", price: 1000.0 },
    ],
  },
  reducers: {
    addExpenseAction: (currentSlice, action) => {
      currentSlice.expenseList.push(action.payload);
    },
  },
});

export const { addExpenseAction } = expenseSlice.actions;
