import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Image} from 'react-native-animatable';
import Zoom from 'react-native-zoom-reanimated';
import {
  BaseCharacter,
  Breastplate,
  FullCharacter,
  Helmet,
  Shield,
  Shoes,
  Waist,
  Weapon,
} from '../../assets/images';
import CharacterComponent from '../../components/Character';

export default CharacterViewComponent = props => {
  return (
    <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
      <CharacterComponent
        partName="BaseCharacter"
        initialPosition={{x: 0, y: 10}}
        imageSource={BaseCharacter}
        style={{width: 150, height: 250, top: 120}}
      />
      <CharacterComponent
        partName="Breastplate"
        initialPosition={{x: -14, y: 189}}
        imageSource={Breastplate}
        style={{width: 125, height: 190}}
      />

      <CharacterComponent
        partName="Sword"
        initialPosition={{x: -70, y: 189}}
        imageSource={Weapon}
        style={{width: 80, height: 144}}
      />

      <CharacterComponent
        partName="Helmet"
        initialPosition={{x: -5, y: -8}}
        imageSource={Helmet}
        style={{width: 125, height: 320}}
      />

      <CharacterComponent
        partName="Shoes"
        initialPosition={{x: -5, y: 260}}
        imageSource={Shoes}
        style={{width: 91, height: 187}}
      />

      <CharacterComponent
        partName="Waist"
        initialPosition={{x: 2, y: 230}}
        imageSource={Waist}
        style={{width: 85, height: 190}}
      />

      <CharacterComponent
        partName="Shield"
        initialPosition={{x: 53, y: 230}}
        imageSource={Shield}
        style={{width: 170, height: 144}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});
