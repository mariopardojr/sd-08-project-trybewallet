import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { loginAction } from '../actions';
import styles from '../styles/Login.module.css';
import walletIcon from '../icons/walletIcon.svg';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      disabled: true,
      password: '',
      redirect: false,
    };

    this.formValidation = this.formValidation.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  formValidation() {
    const { email, password } = this.state;
    const PASSWORD_LENGTH = 6;
    const regexEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    const emailIsValid = regexEmail.test(email);
    const passwordIsValid = password.length >= PASSWORD_LENGTH;
    const disabled = !(emailIsValid && passwordIsValid);
    this.setState({
      disabled,
    });
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    }, () => this.formValidation());
  }

  handleClick() {
    const { email } = this.state;
    const { signIn } = this.props;
    signIn(email);
    this.setState({
      redirect: true,
    });
  }

  render() {
    const { email, disabled, redirect } = this.state;
    return (
      <main>
        <div className={ styles.container }>
          <div className={ styles.loginHeader }>
            <h2>Trybe Wallet</h2>
            <img className={ styles.icon } src={ walletIcon } alt="Wallet Icon" />
          </div>
          <form>
            <div className={ styles.inputField }>
              <input
                type="text"
                name="email"
                value={ email }
                placeholder="email"
                data-testid="email-input"
                onChange={ this.handleChange }
              />
            </div>
            <div className={ styles.inputField }>
              <input
                type="password"
                name="password"
                placeholder="senha"
                data-testid="password-input"
                onChange={ this.handleChange }
              />
            </div>
            <div className={ styles.inputField }>
              <button
                type="button"
                disabled={ disabled }
                onClick={ this.handleClick }
              >
                Entrar
              </button>
            </div>
            { redirect ? <Redirect to="/carteira" /> : '' }
          </form>
        </div>
      </main>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  signIn: (email) => dispatch(loginAction(email)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  signIn: PropTypes.func.isRequired,
};
