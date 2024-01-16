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
  mobile_view_BG,
  newBTN,
  logoImage,
  loadBTN,
  optionsBTN,
} from '../../assets/images';
import {generateUserSessionId} from '../../helper/session';
import {useDispatch} from 'react-redux';
import {setUserSessionId} from '../../api/userSessionSlice';

export default MainPage = props => {
  // const userSessionId = generateUserSessionId();
  // saveUserSessionIdToStorage(userSessionId);

  const dispatch = useDispatch();
  React.useEffect(() => {
    const sessionID = generateUserSessionId();
    dispatch(setUserSessionId(sessionID));
    //console.log('sessionID>>>>>>', sessionID);
  }, []);

  const goToPlayNewGameHandler = () => {
    props.navigation.navigate('playtype');
  };
  return (
    <View style={styles.container}>
      <ImageBackground source={mobile_view_BG} style={styles.backgroundImage}>
        <View style={styles.logoflexView2}>
          <Image
            source={logoImage}
            style={styles.logoImage}
            resizeMode={'contain'}
          />
        </View>
        <View style={styles.buttonsFlexView}>
          <TouchableOpacity onPress={goToPlayNewGameHandler}>
            <Image
              source={newBTN}
              style={styles.newBTNImage}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
          <Image
            source={loadBTN}
            style={styles.loadBTNImage}
            resizeMode={'contain'}
          />
          <Image
            source={optionsBTN}
            style={styles.optionsBTNImage}
            resizeMode={'contain'}
          />
        </View>
      </ImageBackground>
    </View>
  );
};
