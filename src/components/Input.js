import React from 'react';

class Input extends React.Component {
  render() {
    const { children, name, datatestid, onChange, value } = this.props;
    return (
      <label htmlFor={ name }>
        { children }
        <input
          value={ value }
          onChange={ onChange }
          name={ name }
          data-testid={ datatestid }
        />
      </label>
    );
  }
}

Input.propTypes = {
  children: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  datatestid: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default Input;
