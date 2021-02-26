import React, { Component } from 'react';
import { connect } from 'react-redux';
import getAPI from '../services/requestAPI';
import { actionCurruncies } from '../actions';

class FormExpense extends Component {
  componentDidMount() {
    const { showCurrencies } = this.props;
    const api = getAPI();
    showCurrencies(api);
  }

  render() {
    return (
      <section>

        <form>
          <label htmlFor="value">
            Despensa:
            <input
              type="text"
              id="value"
              data-testid="value-input"
              value={ null }
              name="value"
              onChange={ null }
            />
          </label>

          <label htmlFor="description">
            Description:
            <input
              type="text"
              id="description"
              data-testid="description-input"
              value={ null }
              name="description"
              onChange={ null }
            />
          </label>

          <span>Moeda:</span>
          <select
            data-testid="currency-input"
            value={ null }
            name="currency"
            onChange={ null }
          >
            <option>USD</option>
          </select>

        </form>
      </section>
    );
  }
}
// const mapStateToProps = (state) => ({
//   test: state.wallet.currencies,
// });

const mapDispactToProps = (dispatch) => ({
  showCurrencies: (value) => dispatch(actionCurruncies(value)),
});

export default connect(null, mapDispactToProps)(FormExpense);
