import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {Breastplate} from '../../../assets/images';

export const BreastplateImgComponent = props => {
  return (
    <View>
      <Image
        source={Breastplate}
        style={styles.imageView}
        resizeMode={'contain'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imageView: {
    height: 250,
    width: 235,
    bottom: 100,
    right: 10,
    position: 'relative',
  },
});
