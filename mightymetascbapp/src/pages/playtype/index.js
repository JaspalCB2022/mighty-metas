import * as React from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import styles from './style';
import {
  adventure_BG,
  selectStoryType,
  adventureImage,
  arena_BG,
  arenaImage,
  random_BG,
  randomImage,
} from '../../assets/images';

export default PlayType = props => {
  const {navigation} = props;

  const goToArenaStoryHandler = () => {
    //navigation.navigate('storycreate');
    navigation.navigate('characterview'); //('storycreate');
    //navigation.navigate('MergeImageComponent');
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainflexcontainer}>
        <Image
          source={selectStoryType}
          style={{height: 142}}
          resizeMode={'contain'}
        />
      </View>
      <View style={{flex: 2}}>
        <ImageBackground
          source={adventure_BG}
          resizeMode={'cover'}
          style={styles.adventureView}>
          <Image
            source={adventureImage}
            style={styles.adventureImageView}
            resizeMode={'contain'}
          />
        </ImageBackground>
      </View>
      <View style={{flex: 2}}>
        <ImageBackground
          source={arena_BG}
          resizeMode={'cover'}
          style={styles.arenaView}>
          <TouchableOpacity onPress={goToArenaStoryHandler}>
            <Image
              source={arenaImage}
              style={styles.arenaImageView}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
        </ImageBackground>
      </View>
      <View style={{flex: 2}}>
        <ImageBackground
          source={random_BG}
          resizeMode={'cover'}
          style={styles.randomView}>
          <Image
            source={randomImage}
            style={styles.randomImageView}
            resizeMode={'contain'}
          />
        </ImageBackground>
      </View>
    </View>
  );
};
