import * as React from 'react';
import {View, Text, ImageBackground} from 'react-native';
import {LoadingBG} from '../../assets/images';

export const LoadingComponent = () => {
  return (
    <ImageBackground
      source={LoadingBG}
      style={{flex: 1}}
      resizeMode={'cover'}></ImageBackground>
  );
};
