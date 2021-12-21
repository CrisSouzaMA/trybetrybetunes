import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusic from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

// desestruturação do ID feita porque lint pede que seja feita ao inves de colocar direto no state

class Album extends React.Component {
  constructor(props) {
    super(props);
    const {
      match: {
        params: { id },
      },
    } = this.props;
    this.state = {
      id,
      artistName: '',
      nameColect: '',
      artworkUrl100: '',
      allMusics: [],
    };
  }

  componentDidMount() {
    // assim que o componente for montado irá chamar a função
    this.getIdSearched();
  }

  getIdSearched = () => {
    const { id } = this.state;
    getMusic(id)
      .then((data) => {
        this.setState({
          artistName: data[0].artistName,
          nameColect: data[0].collectionName,
          artworkUrl100: data[0].artworkUrl100,
        }, () => {
          this.setState({ allMusics: [...data] });
        });
      });
  }

  render() {
    const { artistName,
      nameColect,
      artworkUrl100,
      allMusics } = this.state;

    return (
      <div id="albumSelect">
        <Header />
        <h3>Album</h3>
        <img src={ artworkUrl100 } alt={ nameColect } />
        <h4 data-testid="album-name">{ nameColect }</h4>
        <h4 data-testid="artist-name">{ artistName }</h4>
        { allMusics.map((music, index) => (
          index === 0 ? null : <MusicCard
            key={ music.trackId }
            trackName={ music.trackName }
            trackId={ music.trackId }
            previewUrl={ music.previewUrl }
            musicInfo={ music }
          />
        )) }
      </div>
      
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
