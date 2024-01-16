import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {Shoes} from '../../../assets/images';
import {Animated} from 'react-native';
import {PinchGestureHandler, State} from 'react-native-gesture-handler';

export const ShoesImgComponent = () => {
  const animatedX = new Animated.Value(0);
  const animatedY = new Animated.Value(0);
  const animatedRotation = new Animated.Value(0);

  // Animated value for zoom
  const animatedZoom = new Animated.Value(1);

  // Function to handle pinch gestures for zoom
  const onPinchGestureEvent = Animated.event(
    [{nativeEvent: {scale: animatedZoom}}],
    {useNativeDriver: false},
  );

  const shoesPositionHandler = event => {
    console.log('Shoes event >>>', event);

    console.log('Shoes event.nativeEvent >>>', event.nativeEvent);
    const layout = event.nativeEvent.layout;
    console.log('Shoes height:', layout.height);
    console.log('Shoes width:', layout.width);
    console.log('Shoes x:', layout.x);
    console.log('Shoes y:', layout.y);
  };

  return (
    <Image
      onLayout={event => {
        shoesPositionHandler(event);
      }}
      source={Shoes}
      style={styles.imageView}
      resizeMode={'contain'}
    />
  );
};

const styles = StyleSheet.create({
  imageView: {
    height: 102,
    width: 225.5,
    bottom: 150,
    left: 8.5,
    //transform: [{rotateX: '18deg'}],
  },
});
