import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Load from './Load';

class MusicCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCheckDisable: false,
      loadFavorite: false,
    };
  }

  componentDidMount() {
    this.restoreFavoriteSong();
  }

  // a função restore vai no localstorage para checar o que está lá e cruzar
  // com o que o musiccard recebeu no album pelo trackID. E caso seja, o checkbox é habilitado

  restoreFavoriteSong = () => {
    const { trackId } = this.props;
    getFavoriteSongs().then((data) => {
      if (data.some((music) => music.trackId === trackId)) {
        this.setState({ isCheckDisable: true });
      }
    });
  }

  saveFavoriteSong = () => {
    const { musicInfo } = this.props;
    this.setState({ loadFavorite: true });
    addSong(musicInfo).then(() => {
      this.setState({ loadFavorite: false });
    });
  }

  handleCheck = () => {
    this.setState({ isCheckDisable: true }, () => {
      this.saveFavoriteSong();
    });
  }

  render() {
    const {
      trackName,
      previewUrl,
      key,
      trackId,
    } = this.props;
    const {
      isCheckDisable,
      loadFavorite,
    } = this.state;

    return (
      <div>
        { loadFavorite ? (
          <Load />
        ) : (
          <>
            <ul>
              <li>{ trackName }</li>
              <audio data-testid="audio-component" src={ previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                <code>audio</code>
                .
              </audio>
            </ul>
            <label htmlFor={ key }>
              Favorita
              <input
                id={ key }
                checked={ isCheckDisable }
                type="checkbox"
                data-testid={ `checkbox-music-${trackId}` }
                onChange={ this.handleCheck }
              />
            </label>
          </>
        )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  key: PropTypes.string.isRequired,
  trackId: PropTypes.string.isRequired,
  musicInfo: PropTypes.shape().isRequired,
};

export default MusicCard;
