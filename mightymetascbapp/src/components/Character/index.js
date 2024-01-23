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
      <Image source={imageSource} style={style} resizeMode={'contain'} />
    </Animated.View>
  );
};

export default CharacterComponent;
