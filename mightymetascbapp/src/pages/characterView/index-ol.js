import React from 'react';
import {View, StyleSheet} from 'react-native';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  State,
} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedGestureHandler,
} from 'react-native-reanimated';
import HelmetImgComponent from '../../components/CharacterLayers/Helmet';
import ShoesImgComponent from '../../components/CharacterLayers/Shoes';

const CharacterViewComponent = () => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = translateX.value;
      ctx.startY = translateY.value;
    },
    onActive: (event, ctx) => {
      translateX.value = ctx.startX + event.translationX;
      translateY.value = ctx.startY + event.translationY;
    },
  });

  return (
    <View style={styles.container}>
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onGestureEvent}>
        <Animated.View>
          <HelmetImgComponent
            position={{x: translateX.value, y: translateY.value}}
            rotation={0}
            zoom={1}
          />
        </Animated.View>
      </PanGestureHandler>
      {/* <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onGestureEvent}>
        <Animated.View>
          <ShoesImgComponent
            position={{x: translateX.value, y: translateY.value}}
            rotation={0}
            zoom={1}
          />
        </Animated.View>
      </PanGestureHandler> */}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default CharacterViewComponent;
