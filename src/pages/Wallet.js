import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addWallet, fetchCurrencies } from '../actions';
import InputText from '../components/InputText';
import Select from '../components/Select';

const metodos = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
const categorias = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
const ROUND_UP = 4;
const DECIMAL = 10;

const ObjectToArray = (object) => {
  const array = Object.keys(object);
  array.splice(1, 1);
  return array;
};

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: metodos[0],
      tag: categorias[0],
      totalValue: 0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.renderInputs = this.renderInputs.bind(this);
    this.renderSelects = this.renderSelects.bind(this);
    this.addExpenseToWallet = this.addExpenseToWallet.bind(this);
    this.resetFields = this.resetFields.bind(this);
    this.roundUp = this.roundUp.bind(this);
    this.walletTableHeader = this.walletTableHeader.bind(this);
  }

  componentDidMount() {
    const { fetchCurrency } = this.props;
    fetchCurrency();
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  resetFields() {
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  }

  roundUp(num, decimal) {
    const n = parseFloat(num);
    return parseFloat((n + (ROUND_UP / ((DECIMAL ** (decimal + 1))))).toFixed(decimal));
  }

  async addExpenseToWallet() {
    const { value, description, currency, method, tag, totalValue } = this.state;
    const { addToWallet, fetchCurrency } = this.props;
    await fetchCurrency();
    const { currencies } = this.props;
    const expense = { value, description, currency, method, tag, currencies };
    console.log(expense);
    addToWallet(expense);
    const total = parseFloat(value) * parseFloat(currencies[currency].ask);
    this.setState({
      totalValue: totalValue + total,
    });
    this.resetFields();
  }

  walletTableHeader() {
    return (
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
      </thead>);
  }

  walletTable() {
    const { expenses } = this.props;
    return expenses.map((expense) => (
      <tbody key={ expense.id }>
        <tr>
          <td>{expense.description}</td>
          <td>{expense.tag}</td>
          <td>{expense.method}</td>
          <td>{`${this.roundUp(expense.value, 2)}`}</td>
          <td>{expense.exchangeRates[expense.currency].name}</td>
          <td>{this.roundUp(expense.exchangeRates[expense.currency].ask, 2)}</td>
          <td>
            {this.roundUp(parseFloat(expense.exchangeRates[expense.currency].ask)
            * parseFloat(expense.value), 2)}
          </td>
          <td>Real</td>
        </tr>
      </tbody>));
  }

  renderInputs() {
    const { value, description } = this.state;
    return (
      <>
        <InputText
          name="value"
          dataTest="value-input"
          value={ value }
          onChange={ this.handleChange }
        >
          Valor:
        </InputText>
        <InputText
          name="description"
          dataTest="description-input"
          value={ description }
          onChange={ this.handleChange }
        >
          Descrição:
        </InputText>
      </>
    );
  }

  renderSelects() {
    const { currency, method, tag } = this.state;
    const { currencies } = this.props;
    return (
      <>
        <Select
          name="currency"
          dataTest="currency-input"
          value={ currency }
          options={ ObjectToArray(currencies) }
          onChange={ this.handleChange }
        >
          Moeda:
        </Select>
        <Select
          name="method"
          dataTest="method-input"
          value={ method }
          options={ metodos }
          onChange={ this.handleChange }
        >
          Método de Pagamento:
        </Select>
        <Select
          name="tag"
          dataTest="tag-input"
          value={ tag }
          options={ categorias }
          onChange={ this.handleChange }
        >
          Método de Pagamento:
        </Select>
      </>
    );
  }

  render() {
    const { email } = this.props;
    const { totalValue } = this.state;
    return (
      <main>
        <header>
          <span data-testid="email-field">{`Email: ${email}`}</span>
          <span data-testid="total-field">
            {`Despesa total: ${totalValue}`}
          </span>
          <span data-testid="header-currency-field">BRL</span>
        </header>
        <section>
          <form>
            {this.renderInputs()}
            {this.renderSelects()}
            <button
              type="button"
              onClick={ this.addExpenseToWallet }
            >
              Adicionar despesa
            </button>
          </form>
          <table>
            {this.walletTableHeader()}
            {this.walletTable()}
          </table>
        </section>
      </main>
    );
  }
}

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  fetchCurrency: PropTypes.func.isRequired,
  addToWallet: PropTypes.func.isRequired,
  currencies: PropTypes.shape(
    PropTypes.object.isRequired,
  ).isRequired,
  expenses: PropTypes.shape().isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrency: () => dispatch(fetchCurrencies()),
  addToWallet: (object) => dispatch(addWallet(object)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
