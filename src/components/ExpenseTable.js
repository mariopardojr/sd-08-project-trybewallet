import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class ExpenseTable extends React.Component {
  expenseItemTable(expense) {
    const { value, currency, exchangeRates, method, id, tag, description } = expense;
    const { name, ask } = exchangeRates[currency];
    return (
      <tr key={ id }>
        <th><span role="cell">{ description }</span></th>
        <th><span role="cell">{ tag }</span></th>
        <th><span role="cell">{ method }</span></th>
        <th><span role="cell">{ value }</span></th>
        <th><span role="cell">{ name }</span></th>
        <th><span role="cell">{Math.round(ask * 100) / 100}</span></th>
        <th><span role="cell">{Math.round(ask * value * 100) / 100}</span></th>
        <th><span role="cell">Real</span></th>
      </tr>
    );
  }

  render() {
    const { expenses } = this.props;
    return (
      <table className="table-component">
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
          { expenses.map((expense) => this.expenseItemTable(expense)) }
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps, null)(ExpenseTable);

ExpenseTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};
