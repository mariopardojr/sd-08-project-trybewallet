import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { table } from '../store/service';
import { deleteExpense } from '../actions';

class Table extends React.Component {
  constructor() {
    super();

    this.table = this.table.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(id) {
    const { deleteExp } = this.props;
    deleteExp(id);
  }

  table() {
    const { expenses } = this.props;
    return expenses.map(
      ({ id, description, method, tag, exchangeRates, currency, value }) => (
        <tr key={ id }>
          <td>{ description }</td>
          <td>{tag}</td>
          <td>{ method }</td>
          <td>{value }</td>
          <td>{ exchangeRates[currency].name }</td>
          <td>{ parseFloat(exchangeRates[currency].ask).toFixed(2) }</td>
          <td>{ (value * exchangeRates[currency].ask).toFixed(2) }</td>
          <td>Real</td>
          <button
            type="button"
            data-testid="delete-btn"
            onClick={ () => this.handleClick(id) }
          >
            Deletar
          </button>
        </tr>
      ),
    );
  }

  render() {
    return (
      <table>
        <tr>
          {
            table.map((tab, index) => <th key={ index }>{ tab }</th>)
          }
        </tr>
        <tbody>
          {this.table()}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExp: (id) => dispatch(deleteExpense(id)),
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteExp: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);