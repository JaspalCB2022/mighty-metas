import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export default styles = StyleSheet.create({
  fontStyle: {
    fontFamily: 'PTSerif-Regular',
    fontSize: 18,
    color: 'black',
    padding: 15,
    fontWeight: 300,
  },
  optionView: {
    borderColor: '#caa46b',
    borderWidth: 6,
    marginHorizontal: 15,
    marginBottom: 15,
  },
  optionText: {
    fontFamily: 'PTSerif-Regular',
    fontWeight: 'normal',
    fontSize: 18,
    color: 'black',
    padding: 5,
    paddingHorizontal: 15,
  },
  mainbgcontainer: {
    flex: 1,
    width: wp('100%'), // 100% of the width
    height: hp('100%'),
    justifyContent: 'flex-start',
  },
  textbgcontainer: {
    width: wp('100%'), // 100% of the width
    height: hp('100%'),
  },
  loaderView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
  },
  input: {
    fontFamily: 'PTSerif-Regular',
    fontWeight: 'normal',
    fontSize: 18,
    color: 'black',
    height: 60,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'white',
    borderColor: '#E4D6C2',
    borderRadius: 50,
    paddingLeft: 70,
  },
  logoContainer: {
    position: 'absolute',
    left: 20,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  logoBackground: {
    backgroundColor: '#F5EADB',
    paddingTop: 7,
    paddingHorizontal: 15,
    paddingBottom: 5,
    borderRadius: 55,
  },
  logoImage: {
    height: 35,
    width: 25,
  },
});
