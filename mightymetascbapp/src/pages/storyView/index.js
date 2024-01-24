import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useGenerateStoryMutation} from '../../api/generateStory';
import {useSelector} from 'react-redux';
import {selectUserSessionId} from '../../api/userSessionSlice';
import styles from './style'; // Import styles from a separate file
import {
  FullCharacter,
  LogoIconImage,
  MainFullChar,
  StoryBG,
  boxBG,
  pop_BG,
} from '../../assets/images';
import ClickableText from '../../components/ClickableText';
import LinearGradient from 'react-native-linear-gradient';
import {
  breastplateZoom,
  clickableWords,
  eyeZoom,
  helmetZoom,
  shieldZoom,
  shoesZoom,
  waistZoom,
  weaponsZoom,
} from '../../constants';

const StoryView = ({route}) => {
  const {storydata} = route.params;

  let scrollRef = useRef(null);
  const [somethingInput, setSomethingInput] = useState('');
  const [loading, setLoading] = useState(false);
  const session_id = useSelector(selectUserSessionId);
  const [storyObj, setStoryObj] = useState({});
  const [enableInput, setEnableInput] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [showFullChar, setShowFullChar] = useState(false);
  const [scrollEnd, setScrollEnd] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');
  const [transform, setTransform] = useState(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const fadeInstAnim = useRef(new Animated.Value(0)).current;
  const fadeOptinAnim = useRef(new Animated.Value(0)).current;
  const [generateStory, {isError, error}] = useGenerateStoryMutation();

  useEffect(() => {
    getGeneratedStory(storydata);
  }, []);

  useEffect(() => {
    if (!loading && !showFullChar && Object.keys(storyObj).length > 0) {
      scrollRef?.scrollTo({x: 0, y: 0, animated: true});
    }
  }, [loading, showFullChar]);

  const getGeneratedStory = async data => {
    //console.log('Call to Data > data', data);
    //setLoading(true);
    setEnableInput(false);
    setScrollEnd(false);

    const formdata = new FormData();
    formdata.append('prompt', data);
    formdata.append('session_id', session_id);

    try {
      const response = await generateStory(formdata);
      console.log('response >>', response);
      if (response?.data) {
        //setLoading(false);
        setStoryObj(response.data);
        setShowFullChar(false);
        setSelectedValue('');
        fadeIn();
      } else {
        setErrorMsg(response.error);
        setLoading(false);
        setShowFullChar(false);
      }
    } catch (error) {
      setErrorMsg('Error fetching data');
      setLoading(false);
      setShowFullChar(false);
    }
  };

  const getFullStory = async item => {
    setEnableInput(false);
    setScrollEnd(false);

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
        scrollRef.scrollToEnd({animated: true});
        setScrollEnd(true);
        setEnableInput(true);
        setSelectedValue('');
      } else {
        setSelectedValue(item.option);
        setEnableInput(false);
        setScrollEnd(false);
        fadeOut();
      }
    }
  };

  const submitSomethingElseHandler = () => {
    if (somethingInput) {
      getGeneratedStory(somethingInput);
      setSomethingInput('');
      fadeOut();
    }
  };

  const handleTypingComplete = () => {
    setShowOptions(true);
  };

  const fadeIn = () => {
    Animated.sequence([
      animate(fadeAnim, 1, 1000),
      animate(fadeInstAnim, 1, 3000),
      animate(fadeOptinAnim, 1, 4000),
    ]).start();
  };

  const fadeOut = () => {
    //setLoading(false);
    Animated.sequence([
      Animated.timing(fadeOptinAnim, {
        toValue: 0,
        duration: 4000,
        //easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(fadeInstAnim, {
        toValue: 0,
        duration: 3000,
        //easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        //easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start(() => {
      checkAllTextFadedOut();
    });
  };

  const checkAllTextFadedOut = () => {
    const isAllTextFadedOut =
      fadeOptinAnim.__getValue() === 0 &&
      fadeInstAnim.__getValue() === 0 &&
      fadeAnim.__getValue() === 0;

    if (isAllTextFadedOut) {
      console.log('All text has faded out!');
      // Perform your desired action here
      //setLoading(true);
      setShowFullChar(true);
      setTransform(null);
      getGeneratedStory(selectedValue);
    }
  };

  const animate = (value, toValue, duration) => {
    return Animated.timing(value, {
      toValue,
      duration,
      easing: Easing.linear,
      useNativeDriver: true,
    });
  };

  const breastplateZoomHandler = () => {
    setTransform({
      height: 400,
      width: 250,
      transform: [{scale: 3}, {translateX: 20}, {translateY: -80}],
    });
  };

  const shieldZoomHandler = () => {
    setTransform({
      height: 400,
      width: 250,
      transform: [{scale: 1.7}, {translateX: -80}, {translateY: -90}],
    });
  };

  const waistZoomHandler = () => {
    setTransform({
      height: 400,
      width: 250,
      transform: [{scale: 4}, {translateX: 20}, {translateY: -120}],
    });
  };

  const eyeZoomHandler = () => {
    setTransform({
      height: 290,
      width: 250,
      transform: [{scale: 3.5}, {translateX: 30}, {translateY: 30}],
    });
  };

  const shoesZoomHandler = () => {
    setTransform({
      height: 400,
      width: 250,
      bottom: 12,
      transform: [{scale: 3.0}, {translateX: 10}, {translateY: -140}],
    });
  };

  const helmetZoomHandler = () => {
    setTransform({
      height: 290,
      width: 250,
      transform: [{scale: 2}, {translateX: 30}, {translateY: 85}],
    });
  };

  const weaponsZoomHandler = () => {
    setTransform({
      height: 350,
      width: 250,
      transform: [{scale: 2.5}, {translateX: 90}, {translateY: -25}],
    });
  };

  const handleWordClick = word => {
    //const weaponsZoom = ;

    if (weaponsZoom.includes(word.toLowerCase())) {
      weaponsZoomHandler();
    } else if (helmetZoom.includes(word.toLowerCase())) {
      helmetZoomHandler();
    } else if (eyeZoom.includes(word.toLowerCase())) {
      eyeZoomHandler();
    } else if (breastplateZoom.includes(word.toLowerCase())) {
      breastplateZoomHandler();
    } else if (shoesZoom.includes(word.toLowerCase())) {
      shoesZoomHandler();
    } else if (shieldZoom.includes(word.toLowerCase())) {
      shieldZoomHandler();
    } else if (waistZoom.includes(word.toLowerCase())) {
      waistZoomHandler();
    } else {
      setTransform(null);
    }
  };

  const renderAutoZoomHandler = storyObj => {
    if (Object.keys(storyObj).length > 0 && storyObj?.response) {
      const words = storyObj?.response.split(/\s+/);
      words.map((word, index) => {
        const isClickable = clickableWords.includes(word.toLowerCase());
        if (isClickable) {
          handleWordClick(word);
        }
      });
    }
  };

  React.useEffect(() => {
    renderAutoZoomHandler(storyObj);
  }, [storyObj]);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={showFullChar ? MainFullChar : StoryBG}
        resizeMode={'cover'}
        style={{
          width: wp('100%'),
          height: hp('100%'),
          flex: 1,
          position: 'relative',
        }}>
        {!showFullChar && (
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}>
            <View
              style={{
                height: 370,
                overflow: 'hidden',
                position: 'absolute',
                //backgroundColor: '#f386',
                bottom: 5,
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={FullCharacter}
                style={
                  transform
                    ? transform
                    : {
                        height: 350,
                        width: 210,
                      }
                }
              />
            </View>
            <LinearGradient
              colors={['transparent', 'transparent']}
              style={{height: 50, width: '100%'}}
            />
          </View>
        )}
        {!showFullChar && (
          <View style={{flex: 1}}>
            <Animated.View style={{opacity: fadeAnim, flex: 1}}>
              <ImageBackground
                source={pop_BG}
                style={{
                  width: wp('100%'),
                  height: hp('100%'),
                  // paddingTop: 40,
                  // marginTop: 70,
                }}
                resizeMode={'cover'}>
                <View style={{paddingBottom: 195}}>
                  {isError ? (
                    <Text
                      style={{
                        ...styles.fontStyle,
                        color: 'red',
                      }}>{`Try again after sometime.`}</Text>
                  ) : (
                    <ScrollView
                      ref={ref => {
                        scrollRef = ref;
                      }}
                      onContentSizeChange={() => {
                        if (scrollEnd) {
                          scrollRef.scrollToEnd({animated: true});
                        }
                      }}
                      style={{marginBottom: 128}}
                      showsVerticalScrollIndicator={false}>
                      <Animated.View
                        style={{
                          opacity: fadeAnim,
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                          padding: 15,
                        }}>
                        <ClickableText
                          text={storyObj?.response}
                          //clickableWords={}
                          onPress={handleWordClick}
                          style={{
                            fontFamily: 'PTSerif-Regular',
                            fontSize: 18,
                            color: 'black',
                          }}
                        />
                      </Animated.View>

                      <Animated.View
                        style={{
                          opacity: fadeInstAnim,
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                          padding: 15,
                        }}>
                        <ClickableText
                          text={storyObj?.instruction}
                          onPress={handleWordClick}
                          style={{...styles.fontStyle, padding: 1}}
                        />
                      </Animated.View>

                      <Animated.View style={{opacity: fadeOptinAnim}}>
                        {storyObj?.options?.map((item, index) => (
                          <Animated.View
                            key={index}
                            source={boxBG}
                            resizeMode={'cover'}
                            style={{
                              ...styles.optionView,
                            }}>
                            <TouchableOpacity
                              style={{
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                padding: 5,
                              }}
                              onPress={() => getFullStory(item)}>
                              <Text style={{...styles.optionText, padding: 0}}>
                                {item?.option}
                              </Text>
                              {/* <ClickableText
                                text={item?.option}
                                onPress={handleWordClick}
                                style={{...styles.optionText, padding: 0}}
                              /> */}
                            </TouchableOpacity>
                          </Animated.View>
                        ))}
                      </Animated.View>

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
            </Animated.View>
          </View>
        )}
      </ImageBackground>
    </View>
  );
};

export default StoryView;
