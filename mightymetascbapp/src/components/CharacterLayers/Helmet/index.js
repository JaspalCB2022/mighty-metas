import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {Helmet} from '../../../assets/images';

export const HelmetImgComponent = props => {
  console.log(' props.style >>', props.style);
  return (
    <View>
      <Image source={Helmet} style={styles.imageView} resizeMode={'cover'} />
    </View>
  );
};

const styles = StyleSheet.create({
  imageView: {
    height: 250,
    width: 223,
    top: -85,
    left: 10,
    right: 25,
  },
});
