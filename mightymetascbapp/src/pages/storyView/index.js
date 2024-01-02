// Import necessary modules and components

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
  LogoIconImage,
  MainBg,
  MainFullChar,
  boxBG,
  pop_BG,
} from '../../assets/images';

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
  }, [loading]);

  const getGeneratedStory = async data => {
    //console.log('Call to Data > data', data);
    setEnableInput(false);
    setScrollEnd(false);

    const formdata = new FormData();
    formdata.append('prompt', data);
    formdata.append('session_id', session_id);

    try {
      const response = await generateStory(formdata);
      if (response?.data) {
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
      //console.log('All text has faded out!');
      // Perform your desired action here
      //setLoading(true);
      setShowFullChar(true);
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
  // : storyObj?.background_url
  //             ? {uri: storyObj?.background_url}
  return (
    <View style={styles.container}>
      <ImageBackground
        source={showFullChar ? MainFullChar : MainBg}
        resizeMode={'cover'}
        style={{
          width: wp('100%'),
          height: hp('100%'),
          flex: 1,
        }}>
        {!showFullChar && <View style={{flex: 2}} />}
        {!showFullChar && (
          <View style={{flex: 5}}>
            <Animated.View style={{opacity: fadeAnim, flex: 1}}>
              <ImageBackground
                source={pop_BG}
                style={{
                  width: wp('100%'),
                  height: hp('100%'),
                  paddingTop: 60,
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
                      showsVerticalScrollIndicator={false}>
                      <Animated.View style={{opacity: fadeAnim}}>
                        <Text
                          style={{
                            fontFamily: 'PTSerif-Regular',
                            fontSize: 18,
                            color: 'black',
                            padding: 15,
                          }}>
                          {storyObj?.response}
                        </Text>
                      </Animated.View>

                      <Animated.View style={{opacity: fadeInstAnim}}>
                        <Text style={{...styles.fontStyle}}>
                          {storyObj?.instruction}
                        </Text>
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
                              onPress={() => getFullStory(item)}>
                              <Text style={styles.optionText}>
                                {item?.option}
                              </Text>
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
