import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Load from './Load';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputName: '',
      nameLoad: false,
    };
    this.inUser = this.inUser.bind(this);
  }

  componentDidMount() {
    this.inUser();
  }

  inUser() {
    getUser()
      .then((data) => (this.setState({
        inputName: data.name,
        nameLoad: true,
      })));
  }

  render() {
    const { inputName, nameLoad } = this.state;
    return (
      <>
        <div id="header">
          <header id="nameLogin">
            { nameLoad ? <h1>{ inputName }</h1> : <Load /> }
          </header>
        <div id="navbar">
          <nav className="nav nav-pills nav-justified">
            <Link to="/search" class="nav-link" aria-current="page">Procurar</Link>
            <Link to="/favorites" className="nav-link">Favoritas</Link>
            <Link to="/profile" className="nav-link">Perfil</Link>
          </nav>
        </div>
        </div>
    </>
    );
  }
}

export default Header;
