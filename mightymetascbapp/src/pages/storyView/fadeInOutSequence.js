import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Animated, {
  withTiming,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

const FadeInOutText = ({scenario}) => {
  const opacity = useSharedValue(0);

  const fadeIn = () => {
    opacity.value = withTiming(1, {duration: 3000});
  };

  const fadeOut = () => {
    opacity.value = withTiming(0, {duration: 1000});
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  React.useEffect(() => {
    fadeIn();
  }, []);

  return (
    <View>
      <Animated.View
        style={[
          {flex: 1, justifyContent: 'center', alignItems: 'center'},
          animatedStyle,
        ]}>
        {/* Your existing component content */}
        <Image
          source={{
            uri: 'http://192.168.29.51:8000/media/generated_images/generated_image.png',
          }}
          style={{width: 200, height: 200}}
        />
        <Text>
          You carefully inspect the room, taking in the details. The walls are
          made of ancient stone, adorned with intricate carvings. Along one
          wall, you notice a set of shelves displaying various weapons and armor
          from different eras. A gladiator's helmet, a pirate's cutlass, and a
          samurai's katana catch your eye. On the opposite wall, a large wooden
          door stands imposingly. There doesn't appear to be any windows in the
          room, making it feel somewhat claustrophobic.
        </Text>
      </Animated.View>

      {/* Add fade-out and fade-in buttons */}
      <TouchableOpacity onPress={fadeOut}>
        <Text>Fade Out</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={fadeIn}>
        <Text>Fade In</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FadeInOutText;
