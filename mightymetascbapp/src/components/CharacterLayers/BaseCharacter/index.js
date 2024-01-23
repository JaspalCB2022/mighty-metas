import React, {useEffect, useRef} from 'react';
import {
  View,
  Image,
  StyleSheet,
  ImageBackground,
  ScrollView,
} from 'react-native';
import {BaseCharacter} from '../../../assets/images';

export const BaseCharacterImgComponent = props => {
  const textContainerRef = useRef(null);

  return (
    <View ref={textContainerRef}>
      <ImageBackground
        source={BaseCharacter}
        style={styles.imageView}
        resizeMode={'contain'}>
        {props.children}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  imageView: {
    height: 450,
    width: 260,
    alignSelf: 'center',
  },
});
