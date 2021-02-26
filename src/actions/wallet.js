import api from '../services';

export const Types = {
  ADD_EXPENSE: 'ADD_EXPENSE',
  ADD_EXPENSE_WITH_COINS: 'ADD_EXPENSE_WITH_COINS',
};

export const Creators = {
  addExpense: (expense) => ({
    type: Types.ADD_EXPENSE,
    payload: expense,
  }),
  addExpenseWithCoins: (expense) => async (dispatch) => {
    const coins = await api.getCoins();
    dispatch(Creators.addExpense({ ...expense, exchangeRates: coins }));
  },
};