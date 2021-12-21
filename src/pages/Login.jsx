import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Load from '../components/Load';
import '../App.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      inputName: '',
      buttonDisable: true,
      buttClick: false,
      load: false,
    };
  }

  handleInputName = (event) => {
    const { value } = event.target;
    this.setState({ inputName: value }, () => {
      this.isButtonDisabled();
    });
  }

  onClickButt = (event) => {
    event.preventDefault();
    const { inputName } = this.state;
    this.setState({ buttClick: true });
    createUser({ name: inputName })
      .then(() => this.setState({ load: true }));
  }

  isButtonDisabled = () => {
    const minLength = 3;
    const { inputName } = this.state;
    if (inputName.length >= minLength) {
      this.setState({ buttonDisable: false });
    } else {
      this.setState({ buttonDisable: true });
    }
  }

  validateUser() {
    const { load } = this.state;
    if (load) return <Redirect to="/search" />;
    return <Load />;
  }

  render() {
    const { buttonDisable, buttClick } = this.state;
    return (
      buttClick
        ? this.validateUser()
        : (
          <div id="login" className="input-group mb-3">
            <form>
              <label htmlFor="name">
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  aria-describedby="button-addon2"
                  placeholder="Nome do usuário"
                  onChange={ this.handleInputName }
                />
              </label>
              <button
                type="submit"
                className="btn btn-outline-secondary"
                disabled={ buttonDisable }
                onClick={ this.onClickButt }
              >
                Entrar
              </button>
            </form>
          </div>
        ));
        
  }
}

export default Login;
