import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Load from '../components/Load';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      inputArtist: '',
      buttSearchDisable: true,
      resultAPI: [],
      searchName: '',
      verifyApi: true,
      returnMessageApi: '',
      showResult: false,
    };
  }

  handleInputArtist = (event) => {
    const { value } = event.target;
    this.setState({ inputArtist: value }, () => {
      this.setState({
        buttSearchDisable: this.isButtonSearchDisabled(),
        searchName: value,
      });
    });
  }

  isButtonSearchDisabled = () => {
    const minLength = 2;
    const { inputArtist } = this.state;
    if (inputArtist.length >= minLength) return false;
    return true;
  }

  showButt = (event) => {
    event.preventDefault();
    const { searchName } = this.state;
    this.setState({
      inputArtist: '',
      verifyApi: false,
    }, () => {
      searchAlbumsAPI(searchName)
        .then((data) => {
          this.setState({
            resultAPI: [...data],
            verifyApi: true,
            showResult: true,
          }, () => this.getMessageReturnApi());
        });
    });
  }

  getMessageReturnApi = () => {
    const { resultAPI, searchName } = this.state;
    if (resultAPI.length > 0) {
      this.setState({ returnMessageApi: `Resultado de álbuns de: ${searchName}` });
    } else {
      this.setState({ returnMessageApi: 'Nenhum álbum foi encontrado' });
    }
  }

  render() {
    const { buttSearchDisable,
      verifyApi,
      returnMessageApi,
      showResult,
      resultAPI,
    } = this.state;
    return (
      <>
        <div data-testid="page-search">
          <Header />
          { verifyApi
            ? (
              <form id="inputSearch" className="input-group mb-3">
                <input
                  placeholder="Nome do artista"
                  type="text"
                  className="form-control"
                  aria-describedby="button-addon2"
                  minLength="2"
                  onChange={ this.handleInputArtist }
                />
                <button
                  type="submit"
                  className="btn btn-outline-secondary"
                  disabled={ buttSearchDisable }
                  onClick={ this.showButt }
                >
                  Procurar
                </button>
              </form>)
            : <Load /> }
        </div>
        <div id="music">
          { showResult
            ? (
              <ul>
                <span>{ returnMessageApi }</span>
                { resultAPI.map((artist) => (
                  <Link
                    to={ `/album/${artist.collectionId}` }
                    key={ artist.collectionId }
                    data-testid={ `link-to-album-${artist.collectionId}` }
                  >
                    <img alt={ artist.collectionName } src={ artist.artworkUrl100 } />
                    <li>{ artist.collectionName }</li>
                  </Link>
                )) }
              </ul>
            )
            : <span>{ returnMessageApi }</span> }
        </div>
      </>
    );
  }
  
}

export default Search;