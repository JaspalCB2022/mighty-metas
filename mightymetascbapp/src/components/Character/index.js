import React, {useRef, useState} from 'react';
import {View, Animated, Text, Image} from 'react-native';

const CharacterComponent = ({
  partName,
  initialPosition,
  initialScale,
  imageSource,
  style,
}) => {
  const [scale] = useState(new Animated.Value(initialScale || 1));
  const [position] = useState(
    new Animated.ValueXY(initialPosition || {x: 0, y: 0}),
  );

  const handleZoom = () => {
    Animated.timing(scale, {
      toValue: 2, // Change this value based on your zoom requirements
      duration: 500, // Adjust the duration as needed
      useNativeDriver: true,
    }).start();
  };
  const handleResetZoom = () => {
    Animated.timing(scale, {
      toValue: initialScale || 1,
      duration: 500, // Adjust the duration as needed
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={{
        position: 'absolute',
        transform: [
          {translateX: position.x},
          {translateY: position.y},
          {scale},
        ],
      }}>
      <Image source={imageSource} style={style} />
      <Text onPress={handleZoom}>{partName}</Text>
      <Text onPress={handleResetZoom}>Reset Zoom</Text>
      {/* Additional content for the character part */}
    </Animated.View>
  );
};

export default CharacterComponent;
