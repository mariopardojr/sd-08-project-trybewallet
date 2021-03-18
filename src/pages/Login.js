import React from 'react';
import PropTypes from 'prop-types';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      disabled: true,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  validateLogin() {
    const { email, password } = this.state;

    const VALID_EMAIL = /^[\w]+@([\w]+\.)+[\w]$/gi;
    const VALID_PASSWORD = password.length;
    const minLength = 6;
    if (VALID_EMAIL.test(email) && VALID_PASSWORD >= minLength) {
      return this.setState(
        {
          disabled: false,
        },
      );
    }
    return (this.setState(
      {
        disabled: true,
      },
    ));
  }

  handleClick() {
    const path = '/carteira';
    const { history } = this.props;
    history.push(path);
  }

  handleChange({ target }) {
    const { name } = target;
    this.setState(
      {
        [name]: target.value,
      },
      () => {
        this.validateLogin();
      },
    );
  }

  render() {
    const { disabled } = this.state;
    return (
      <div>
        <input
          type="text"
          name="email"
          data-testid="email-input"
          onChange={ this.handleChange }
        />
        <input
          type="password"
          name="password"
          data-testid="password-input"
          onChange={ this.handleChange }
        />
        <button
          type="submit"
          onClick={ this.handleClick }
          disabled={ disabled }
        >
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
