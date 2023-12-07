import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export default style = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: wp('100%'), // 100% of the width
    height: hp('100%'), // 100% of the height
    resizeMode: 'cover', // or 'contain' depending on your needs
  },
  logoflexView2: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  logoImage: {
    height: 130,
    alignItems: 'center',
  },
  buttonsFlexView: {
    flex: 3,
    display: 'flex',
    alignItems: 'center',
  },
  newBTNImage: {
    height: 55,
    marginTop: 50,
  },
  loadBTNImage: {
    height: 55,
    marginTop: 8,
    opacity: 0.3,
  },
  optionsBTNImage: {
    height: 55,
    marginTop: 8,
    opacity: 0.3,
  },
});
