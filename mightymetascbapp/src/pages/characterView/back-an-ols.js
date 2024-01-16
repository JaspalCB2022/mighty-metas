import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Image} from 'react-native-animatable';
import Zoom from 'react-native-zoom-reanimated';
import {
  BaseCharacter,
  FullCharacter,
  Helmet,
  Weapon,
} from '../../assets/images';
import CharacterComponent from '../../components/Character';

export default CharacterViewComponent = props => {
  return (
    <View
      style={{flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start'}}>
      <CharacterComponent
        partName="BaseCharacter"
        initialPosition={{x: 0, y: 10}}
        imageSource={BaseCharacter}
        style={{width: 130, height: 240}}
      />
      <CharacterComponent
        partName="Helmet"
        initialPosition={{x: 0, y: 20}}
        imageSource={Helmet}
        style={{width: 130, height: 190}}
      />

      <CharacterComponent
        partName="Sword"
        initialPosition={{x: 40, y: 90}}
        imageSource={Weapon}
        style={{width: 80, height: 240}}
      />
      {/* Add more components as needed */}
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
