import React, {useState, useRef, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {BaseCharacterImgComponent} from '../../components/CharacterLayers/BaseCharacter';
import {HelmetImgComponent} from '../../components/CharacterLayers/Helmet';
import {WeaponImgComponent} from '../../components/CharacterLayers/Weapon';
import {ShieldImgComponent} from '../../components/CharacterLayers/Shield';
import {ShoesImgComponent} from '../../components/CharacterLayers/Shoes';
import {BreastplateImgComponent} from '../../components/CharacterLayers/Breastplate';
import {WaistImgComponent} from '../../components/CharacterLayers/Waist';

export default CharacterViewComponent = props => {
  return (
    <View style={styles.container}>
      <BaseCharacterImgComponent>
        <HelmetImgComponent {...props} />
        <BreastplateImgComponent {...props} />
        <ShoesImgComponent {...props} />
        <WaistImgComponent {...props} />
        <WeaponImgComponent {...props} />
        <ShieldImgComponent {...props} />
      </BaseCharacterImgComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});
