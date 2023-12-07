import * as React from 'react';
import {View, Text, ImageBackground, Image, ScrollView} from 'react-native';
import {pop_BG, boxBG, chrBG, AttackBG} from '../../assets/images';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import style from './style';

export const StoryView = props => {
  const {storydata} = props.route.params;
  console.log('storydata >>', storydata, typeof storydata);
  return (
    <View style={style.container}>
      <ImageBackground
        source={AttackBG}
        resizeMode={'cover'}
        style={{
          width: wp('100%'), // 100% of the width
          height: hp('100%'),
          flex: 1,
        }}>
        <View style={{flex: 2}} />
        <View style={{flex: 5, marginTop: 0}}>
          <ImageBackground
            source={pop_BG}
            style={{
              width: wp('100%'), // 100% of the width
              height: hp('100%'),
              paddingTop: 60,
            }}
            resizeMode={'cover'}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text
                style={{
                  fontFamily: 'PTSerif-Regular',
                  fontSize: 18,
                  color: 'black',
                  padding: 15,
                  opacity: 1,
                }}>
                {storydata?.response}
              </Text>
            </ScrollView>
          </ImageBackground>
        </View>
      </ImageBackground>
      {/* <View
        style={{
          flex: 2,
          backgroundColor: 'white',
        }}>
        <Image
          source={AttackBG}
          resizeMode={'cover'}
          style={{height: 360, width: wp('100%')}}
        />
      </View> */}
    </View>
  );
};
