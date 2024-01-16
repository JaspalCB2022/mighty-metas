import React, {useRef} from 'react';
import {View, Image, useWindowDimensions} from 'react-native';
import {FullCharacter} from '../../assets/images';
import Zoom from 'react-native-zoom-reanimated';

const ZoomableImage = () => {
  const deviceWidth = useWindowDimensions().width;
  const imageHeight = 340;
  const imageWidth = 300;
  return (
    <View style={{flex: 1}}>
      <Zoom>
        <Image
          source={FullCharacter}
          resizeMode="contain"
          style={{
            width: deviceWidth,
            height: (imageHeight * deviceWidth) / imageWidth,
          }}
        />
      </Zoom>
    </View>
  );
};

export default ZoomableImage;
