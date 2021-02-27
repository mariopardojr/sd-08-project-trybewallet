import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MethodSelection extends Component {
  render() {
    const { value, changeInput } = this.props;

    return (
      <label htmlFor="method">
        Método de pagamento:
        <select
          name="method"
          type="text"
          value={ value }
          onChange={ changeInput }
          data-testid="method-input"
        >
          <option key="choose" value="">Forma de pagamento</option>
          <option key="money" value="money">Dinheiro</option>
          <option key="debit" value="debit">Cartão de débito</option>
          <option key="credit" value="credit">Cartão de crédito</option>
        </select>
      </label>
    );
  }
}

MethodSelection.propTypes = {
  value: PropTypes.string.isRequired,
  changeInput: PropTypes.func.isRequired,
};

export default MethodSelection;