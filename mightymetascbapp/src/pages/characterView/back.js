import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  View,
  findNodeHandle,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Animated,
  // Animated,
} from 'react-native';
import {BaseCharacterImgComponent} from '../../components/CharacterLayers/BaseCharacter';
import {HelmetImgComponent} from '../../components/CharacterLayers/Helmet';
import {WeaponImgComponent} from '../../components/CharacterLayers/Weapon';
import {ShieldImgComponent} from '../../components/CharacterLayers/Shield';
import {ShoesImgComponent} from '../../components/CharacterLayers/Shoes';
import {BreastplateImgComponent} from '../../components/CharacterLayers/Breastplate';
import {WaistImgComponent} from '../../components/CharacterLayers/Waist';
// import {GestureHandlerRootView} from 'react-native-gesture-handler';
// import {Image} from 'react-native-animatable';
// import {FullCharacter} from '../../assets/images';
// import {PinchGestureHandler, State} from 'react-native-gesture-handler';

// import {
//   heightPercentageToDP as hp,
//   widthPercentageToDP as wp,
// } from 'react-native-responsive-screen';
// import Animated from 'react-native-reanimated';
// import ZoomableImage from '../../components/ZoomImage';
import {PinchGestureHandler, State} from 'react-native-gesture-handler';

export default CharacterViewComponent = props => {
  console.log('goToPlayNewGameHandler >>');

  const elementPositionHandler = event => {
    //console.log('Shoes event >>>', event);
    //console.log('Shoes event.nativeEvent >>>', event.nativeEvent);
    const layout = event.nativeEvent.layout;
    console.log('Shoes height:', layout.height);
    console.log('Shoes width:', layout.width);
    console.log('Shoes x:', layout.x);
    console.log('Shoes y:', layout.y);
  };

  // Animated values for movement and rotation
  const animatedX = new Animated.Value(0);
  const animatedY = new Animated.Value(0);
  const animatedScrollX = new Animated.Value(0);
  const animatedScale = new Animated.Value(1);

  const animatedRotation = new Animated.Value(0);

  // Animated value for zoom
  const animatedZoom = new Animated.Value(1);

  // Function to handle pinch gestures for zoom
  const onPinchGestureEvent = Animated.event(
    [{nativeEvent: {scale: animatedZoom}}],
    {useNativeDriver: true},
  );

  // Effect to update animations when props or animated values change
  useEffect(() => {
    // Update animated values based on your logic (e.g., keyword detection)
    // Example: Animated.timing(animatedX, { toValue: newX, duration: 500 }).start();
    // Perform similar updates for animatedY, animatedRotation, and other components
    // Example: Update X position based on a keyword or character interaction
    // Animated.timing(animatedX, {toValue: newX, duration: 500}).start();
    // // Example: Update Y position based on another condition
    // Animated.timing(animatedY, {toValue: newY, duration: 500}).start();
    // // Example: Rotate the character based on a specific event
    // Animated.timing(animatedRotation, {
    //   toValue: newRotation,
    //   duration: 500,
    // }).start();
  }, [props]);

  return (
    <View style={styles.container}>
      {/* <ScrollView> */}
      <PinchGestureHandler
        onGestureEvent={onPinchGestureEvent}
        onHandlerStateChange={event => {
          if (event.nativeEvent.state === State.END) {
            // Handle the end of pinch gesture if needed
          }
        }}>
        <Animated.View
          style={{
            overflow: 'scroll',
            transform: [
              {translateX: animatedX},
              {translateY: animatedY},
              {
                rotate: animatedRotation.interpolate({
                  inputRange: [0, 360],
                  outputRange: ['0deg', '360deg'],
                }),
              },
              {scale: animatedZoom},
            ],
          }}
          useNativeDriver={true}
          // style={{
          //   //flex: 1,
          //   backgroundColor: 'green',
          //   transform: [{scale: animatedScale}],
          //   overflow: 'hidden', // Ensure the scaled content doesn't overflow the container
          // }}
        >
          {/* <ScrollView
            horizontal
            showsHorizontalScrollIndicator={true}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: animatedScrollX}}}],
              {useNativeDriver: true},
            )}
            scrollEventThrottle={16}> */}
          <BaseCharacterImgComponent>
            <HelmetImgComponent
              // style={{transform: [{scale: animatedScale}]}}
              {...props}
            />
            <BreastplateImgComponent
              //style={{transform: [{scale: animatedScale}]}}
              {...props}
            />
            <ShoesImgComponent
              //style={{transform: [{scale: animatedScale}]}}
              {...props}
            />
            <WaistImgComponent
              //style={{transform: [{scale: animatedScale}]}}
              {...props}
            />
            <WeaponImgComponent
              //style={{transform: [{scale: animatedScale}]}}
              {...props}
            />
            <ShieldImgComponent
              //style={{transform: [{scale: animatedScale}]}}
              {...props}
            />
          </BaseCharacterImgComponent>
          {/* </ScrollView> */}
        </Animated.View>
      </PinchGestureHandler>
      {/* </ScrollView> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    //height: '100%',
    //width: '100%',
    // justifyContent: 'center',
    // alignSelf: 'center',
    // alignContent: 'center',
  },
});
