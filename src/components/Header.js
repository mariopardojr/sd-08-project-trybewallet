import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import walletIcon from '../icons/walletIcon.svg';
import styles from '../styles/Header.module.css';

class Header extends React.Component {
  constructor() {
    super();

    this.getTotalExpenses = this.getTotalExpenses.bind(this);
  }

  getTotalExpenses() {
    const { expenses } = this.props;
    const totalExpenses = expenses.reduce((total, current) => {
      const expenseCurrency = current.exchangeRates[current.currency].ask;
      const expenseValue = parseFloat((current.value * expenseCurrency).toFixed(2));
      total += expenseValue;
      return total;
    }, 0);
    return totalExpenses;
  }

  render() {
    const { email } = this.props;
    return (
      <header>
        <div className={ styles.title }>
          <img className={ styles.icon } src={ walletIcon } alt="Wallet Icon" />
          <h2>Trybe Wallet</h2>
        </div>
        <div className={ styles.userInfo }>
          <span data-testid="email-field">{`Email: ${email}`}</span>
          <span
            data-testid="total-field"
          >
            {`Despesa Total: R$ ${this.getTotalExpenses()} `}
            <span data-testid="header-currency-field">BRL</span>
          </span>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.any).isRequired,
};
