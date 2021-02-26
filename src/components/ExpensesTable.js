import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as WalletActions } from '../actions/wallet';

import styles from '../styles/components/ExpensesTable.module.css';

class ExpensesTable extends Component {
  renderExpense(expense) {
    const { removeExpense } = this.props;
    const { value, description, currency,
      method, tag, exchangeRates, id } = expense;
    const currencyData = exchangeRates[currency];
    const convertedValue = +currencyData.ask * +value;
    return (
      <tr key={ id }>
        <td>{ description }</td>
        <td>{ tag }</td>
        <td>{ method }</td>
        <td>{ value }</td>
        <td>{ currencyData.name }</td>
        <td>{ Math.round(currencyData.ask * 100) / 100 }</td>
        <td>{ Math.round(convertedValue * 100) / 100 }</td>
        <td>Real</td>
        <td>
          <button
            data-testid="delete-btn"
            type="button"
            onClick={ () => removeExpense(id) }
          >
            Excluir
          </button>
          <button
            data-testid="edit-btn"
            type="button"
            onClick={ () => removeExpense(id) }
          >
            Editar
          </button>
        </td>
      </tr>
    );
  }

  render() {
    const { expenses } = this.props;
    return (
      <table className={ styles.expensesTable }>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          { expenses.map((expense) => this.renderExpense(expense)) }
        </tbody>
      </table>
    );
  }
}

ExpensesTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  removeExpense: PropTypes.func.isRequired,
};

const mapStateToProps = ({ wallet }) => ({
  expenses: wallet.expenses,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(WalletActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTable);
