import React from 'react';
import {ImageBackground} from 'react-native';
import {FullCharacter} from '../../assets/images';
import style from './style';

const CharacterBgImage = props => {
  return (
    <ImageBackground
      source={FullCharacter}
      resizeMode={'cover'}
      style={style.charView}></ImageBackground>
  );
};

export default CharacterBgImage;
