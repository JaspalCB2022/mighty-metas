// BackgroundImage.js
import React from 'react';
import {ImageBackground} from 'react-native';
import {FullCharacter, AttackBG} from '../../assets/images';

const BackgroundImage = ({loading, backgroundUrl}) => (
  <ImageBackground
    source={
      loading ? FullCharacter : backgroundUrl ? {uri: backgroundUrl} : AttackBG
    }
    resizeMode={'cover'}
    style={{
      width: '100%',
      height: '100%',
      flex: 1,
    }}
  />
);

export default BackgroundImage;
