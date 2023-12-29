import * as React from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  ScrollView,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import {
  pop_BG,
  boxBG,
  chrBG,
  AttackBG,
  LogoIconImage,
  FullCharacter,
  StoryBG,
} from '../../assets/images';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import styles from './style';
//import TypingText from '../../components/TypingText';
import {useGenerateStoryMutation} from '../../api/generateStory';
import {useSelector} from 'react-redux';
import {selectUserSessionId} from '../../api/userSessionSlice';
import {demodata} from './demo';
import {createTiming, EasingNode} from 'react-native-reanimated';
import FadeInOutSequence from './fadeInOutSequence';

export const StoryView = props => {
  const {storydata} = props.route.params;
  let scroll_View = React.useRef(null);
  const [somethingInput, setSomethingInput] = React.useState('');
  const [showOptions, setShowOptions] = React.useState(false);
  const [showQuestionsOptions, setShowQuestionsOptions] = React.useState(false);

  const [loading, setLoading] = React.useState(true);

  const session_id = useSelector(selectUserSessionId);
  const [storyObj, setStoryObj] = React.useState(demodata || {});
  const [enableInput, setEnableInput] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState(null);
  const [showFullChar, setShowFullChar] = React.useState(false);
  const [scrollEnd, setScrollEnd] = React.useState(false);

  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const fadeInstAnim = React.useRef(new Animated.Value(0)).current;
  const fadeOptinAnim = React.useRef(new Animated.Value(0)).current;

  const [generateStory, {isError, error}] = useGenerateStoryMutation();

  const getGeneratedStory = async data => {
    setLoading(true);
    setEnableInput(false);
    setScrollEnd(false);
    const formdata = new FormData();
    formdata.append('prompt', data);
    formdata.append('session_id', session_id);
    const response = await generateStory(formdata);

    console.log('response >>>>>', response);

    if (response && response?.data) {
      setStoryObj(response.data);
      //await fadeIn();
    } else {
      setErrorMsg(response?.error || 'An unknown error occurred');
    }
    setLoading(false);
  };

  const getFullStory = async item => {
    //console.log('item getFullStory  >>>', item);
    setEnableInput(false);
    setScrollEnd(false);
    fadeOut();
    if (Object.keys(item).length > 0) {
      const optionvalue = item?.option?.toLowerCase();
      const temparray = [
        '{something else}',
        '{ something else }',
        'something else',
        'something else.',
        '...something else',
      ];
      if (temparray.includes(optionvalue)) {
        scroll_View.scrollToEnd({animated: true});
        setScrollEnd(true);
        setEnableInput(true);
      } else {
        setEnableInput(false);
        setScrollEnd(false);

        getGeneratedStory(item.option);
      }
    }
  };

  const submitSomethingElseHandler = () => {
    // console.log('somethingInput >>', somethingInput);
    if (somethingInput) {
      getGeneratedStory(somethingInput);
      setSomethingInput('');
    }
  };

  React.useEffect(() => {
    getGeneratedStory(storydata);
  }, []);

  React.useEffect(() => {
    if (!loading) {
      scroll_View?.scrollTo({
        x: 0,
        y: 0,
        animated: true,
      });
    }
  }, []);

  const animate = (value, toValue, duration = 1000, delay = 1000) => {
    return Animated.timing(value, {
      toValue: toValue,
      duration: duration,
      useNativeDriver: true,
    });
  };

  // const fadeIn_fadeAnim = createTiming(fadeAnim, {
  //   toValue: 1,
  //   duration: 500,
  //   //easing: EasingNode.in(Easing.ease),
  // });

  // const fadeOut_fadeAnim = createTiming(fadeAnim, {
  //   toValue: 0,
  //   duration: 500,
  //   //easing: EasingNode.out(Easing.ease),
  // });

  // const fadeIn_fadeInstAnim = createTiming(fadeInstAnim, {
  //   toValue: 1,
  //   duration: 500,
  //   //easing: EasingNode.in(Easing.ease),
  // });

  // const fadeOut_fadeInstAnim = createTiming(fadeInstAnim, {
  //   toValue: 0,
  //   duration: 500,
  //   //easing: EasingNode.out(Easing.ease),
  // });

  // const fadeIn_fadeOptinAnim = createTiming(fadeOptinAnim, {
  //   toValue: 1,
  //   duration: 500,
  //   //easing: EasingNode.in(Easing.ease),
  // });

  // const fadeOut_fadeOptinAnim = createTiming(fadeOptinAnim, {
  //   toValue: 0,
  //   duration: 500,
  //   //easing: EasingNode.out(Easing.ease),
  // });

  // const fadeIn = async () => {
  //   await fadeIn_fadeAnim.start();
  //   await fadeIn_fadeInstAnim.start();
  //   await fadeIn_fadeOptinAnim.start();
  //   // Animated.sequence([
  //   //   animate(fadeAnim, 1),
  //   //   animate(fadeInstAnim, 1),
  //   //   animate(fadeOptinAnim, 1),
  //   // ]).start();
  // };
  // const fadeOut = async () => {
  //   await fadeOut_fadeAnim.start();
  //   await fadeOut_fadeInstAnim.start();
  //   await fadeOut_fadeOptinAnim.start();
  //   // Animated.sequence([
  //   //   animate(fadeAnim, 0),
  //   //   animate(fadeInstAnim, 0),
  //   //   animate(fadeOptinAnim, 0),
  //   //   // animate(fadeOptinAnim, 0),
  //   //   // animate(fadeInstAnim, 0),
  //   //   // animate(fadeAnim, 0),
  //   // ]).start();
  //   // Animated.stagger(2000, [
  //   //   animate(fadeOptinAnim, 0),
  //   //   animate(fadeInstAnim, 0),
  //   //   animate(fadeAnim, 0),
  //   // ]).start(() => {
  //   //   setLoading(true);
  //   // });
  // };

  return (
    <View style={styles.container}>
      {/* <Animated.View style={{opacity: loading ? 1 : fadeInstAnim, flex: 1}}> */}
      {/* <BackImage
            loading={loading}
            backendURL={storyObj?.background_url}
            enableFullChar={showFullChar}
            resizeMode={'cover'}
            style={{
              width: wp('100%'), // 100% of the width
              height: hp('100%'),
              flex: 1,
            }}> */}
      <ImageBackground
        source={
          loading
            ? StoryBG
            : storyObj?.background_url
            ? {uri: storyObj?.background_url}
            : AttackBG
        }
        resizeMode={'cover'}
        style={{
          width: wp('100%'), // 100% of the width
          height: hp('100%'),
          flex: 1,
        }}>
        <View style={{flex: 2}} />
        <View style={{flex: 5}}>
          <ImageBackground
            source={pop_BG}
            style={{
              width: wp('100%'), // 100% of the width
              height: hp('100%'),
              paddingTop: 60,
            }}
            resizeMode={'cover'}>
            <View style={{paddingBottom: 195}}>
              {/* <AutoScroll style={styles.scrolling1}> */}
              {isError ? (
                <Text
                  style={{
                    ...styles.fontStyle,
                    color: 'red',
                  }}>{`Try again after sometime.`}</Text>
              ) : (
                <ScrollView
                  ref={ref => {
                    scroll_View = ref;
                  }}
                  onContentSizeChange={() => {
                    if (scrollEnd) {
                      scroll_View.scrollToEnd({animated: true});
                    }
                  }}
                  showsVerticalScrollIndicator={false}>
                  <FadeInOutSequence scenario={storyObj} />
                  {enableInput && (
                    <View>
                      <TextInput
                        autoFocus={true}
                        style={styles.input}
                        value={somethingInput}
                        onChangeText={value => setSomethingInput(value)}
                        placeholder={'What do you do?'}
                        placeholderTextColor={'#AF7862'}
                        keyboardType={'web-search'}
                        onSubmitEditing={submitSomethingElseHandler}
                      />
                      <View style={styles.logoContainer}>
                        <View style={styles.logoBackground}>
                          <Image
                            source={LogoIconImage}
                            style={styles.logoImage}
                            resizeMode={'cover'}
                          />
                        </View>
                      </View>
                    </View>
                  )}
                </ScrollView>
              )}
            </View>
          </ImageBackground>
        </View>
      </ImageBackground>
      {/* </BackImage> */}
      {/* </Animated.View> */}
      {/* {loading && (
            <View style={styles.loaderView}>
              <ActivityIndicator size="large" color="#fff" />
            </View>
          )} */}
    </View>
  );
};
