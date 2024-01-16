import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {Shield, Shoes} from '../../../assets/images';

export const ShieldImgComponent = () => {
  return (
    <View>
      <Image source={Shield} style={styles.imageView} resizeMode={'contain'} />
    </View>
  );
};

const styles = StyleSheet.create({
  imageView: {
    height: 275,
    width: 300,
    bottom: 720,
    left: 90,
  },
});
