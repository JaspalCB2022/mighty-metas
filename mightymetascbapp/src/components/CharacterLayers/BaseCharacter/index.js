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

  //   const baseCharacterPositionHandler = () => {
  //     textContainerRef.current.measure(
  //       (left, top, width, height, pageX, pageY) => {
  //         console.log(
  //           'left, top, width, height, pageX, pageY',
  //           left,
  //           top,
  //           width,
  //           height,
  //           pageX,
  //           pageY,
  //         );
  //       },
  //     );
  //   };

  const baseCharacterPositionHandler = event => {
    const layout = event.nativeEvent.layout;
    console.log('height:', layout.height);
    console.log('width:', layout.width);
    console.log('x:', layout.x);
    console.log('y:', layout.y);
  };

  //   useEffect(() => {
  //     baseCharacterPositionHandler();
  //   }, []);
  return (
    // <ScrollView>
    <View
      //onLayout={event => baseCharacterPositionHandler(event)}
      ref={textContainerRef}>
      <ImageBackground
        source={BaseCharacter}
        style={styles.imageView}
        resizeMode={'contain'}>
        {props.children}
      </ImageBackground>
    </View>
    // </ScrollView>
  );
};

const styles = StyleSheet.create({
  imageView: {
    height: 420,
    width: 260,
    alignSelf: 'center',
  },
});
