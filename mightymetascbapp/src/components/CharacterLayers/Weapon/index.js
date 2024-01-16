import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {Weapon} from '../../../assets/images';

export const WeaponImgComponent = props => {
  return (
    <View>
      <Image source={Weapon} style={styles.imageView} resizeMode={'contain'} />
    </View>
  );
};

const styles = StyleSheet.create({
  imageView: {
    height: 281,
    width: 223,
    right: 105,
    bottom: 515,
  },
});
