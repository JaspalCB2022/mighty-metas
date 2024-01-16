import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {Waist} from '../../../assets/images';

export const WaistImgComponent = () => {
  return (
    <View>
      <Image source={Waist} style={styles.imageView} resizeMode={'contain'} />
    </View>
  );
};

const styles = StyleSheet.create({
  imageView: {
    height: 100,
    width: 150,
    bottom: 200,
    right: 50,
    position: 'absolute',
  },
});
