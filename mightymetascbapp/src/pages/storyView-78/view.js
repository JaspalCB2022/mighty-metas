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
import BackImage from './BackImage';
//import demoData from './demo';

export const StoryView = props => {
  const {storydata} = props.route.params;
  let scroll_View = React.useRef(null);
  const [somethingInput, setSomethingInput] = React.useState('');
  const [showOptions, setShowOptions] = React.useState(false);
  const [showQuestionsOptions, setShowQuestionsOptions] = React.useState(false);

  const [loading, setLoading] = React.useState(true);

  const session_id = useSelector(selectUserSessionId);
  const [storyObj, setStoryObj] = React.useState({});
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
    if (response && response?.data) {
      setStoryObj(response.data);
      fadeIn();
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

  const fadeIn = () => {
    Animated.stagger(4000, [
      animate(fadeAnim, 1),
      animate(fadeInstAnim, 1),
      animate(fadeOptinAnim, 1),
    ]).start();
  };
  const fadeOut = () => {
    Animated.sequence([
      animate(fadeOptinAnim, 0),
      animate(fadeInstAnim, 0),
      animate(fadeAnim, 0),
    ]).start();
    // Animated.stagger(2000, [
    //   animate(fadeOptinAnim, 0),
    //   animate(fadeInstAnim, 0),
    //   animate(fadeAnim, 0),
    // ]).start(() => {
    //   setLoading(true);
    // });
  };

  return (
    <>
      <ImageBackground
        source={StoryBG}
        resizeMode={'cover'}
        style={styles.container}>
        <View
          style={{
            flex: 2,
            backgroundColor: 'transparent',
            alignItems: 'center',
          }}>
          <Image
            source={FullCharacter}
            style={{
              height: 350,
              width: 220,
              position: 'absolute',
              bottom: 0,
            }}
          />
        </View>

        <View style={[styles.storyContentView, {opacity: 1}]}>
          <ImageBackground
            source={pop_BG}
            style={style.charView}
            resizeMode={'cover'}>
            {isError ? (
              <Text
                style={{
                  ...styles.fontStyle,
                  color: 'red',
                }}>
                {errorMsg}
              </Text>
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

                {storyObj?.options?.map((item, index) => {
                  return (
                    <Animated.View
                      key={index}
                      source={boxBG}
                      resizeMode={'cover'}
                      style={{
                        ...styles.optionView,
                        opacity: fadeOptinAnim,
                      }}>
                      <TouchableOpacity onPress={() => getFullStory(item)}>
                        <Text style={styles.optionText}>{item?.option}</Text>
                      </TouchableOpacity>
                    </Animated.View>
                  );
                })}

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
          </ImageBackground>
        </View>
      </ImageBackground>

      {
        // <View style={styles.container}>
        //   {/* <Animated.View style={{opacity: loading ? 1 : fadeInstAnim, flex: 1}}> */}
        //   {/* <BackImage
        //     loading={loading}
        //     backendURL={storyObj?.background_url}
        //     enableFullChar={showFullChar}
        //     resizeMode={'cover'}
        //     style={{
        //       width: wp('100%'), // 100% of the width
        //       height: hp('100%'),
        //       flex: 1,
        //     }}> */}
        //   <ImageBackground
        //     source={
        //       loading
        //         ? FullCharacter
        //         : storyObj?.background_url
        //         ? {uri: storyObj?.background_url}
        //         : AttackBG
        //     }
        //     resizeMode={'cover'}
        //     style={{
        //       width: wp('100%'), // 100% of the width
        //       height: hp('100%'),
        //       flex: 1,
        //     }}>
        //     <View style={{flex: 2}} />
        //     <View style={{flex: 5}}>
        //       <Animated.View style={{opacity: fadeInstAnim, flex: 1}}>
        //         <ImageBackground
        //           source={pop_BG}
        //           style={{
        //             width: wp('100%'), // 100% of the width
        //             height: hp('100%'),
        //             paddingTop: 60,
        //           }}
        //           resizeMode={'cover'}>
        //           <View style={{paddingBottom: 195}}>
        //             {/* <AutoScroll style={styles.scrolling1}> */}
        //             {isError ? (
        //               <Text
        //                 style={{
        //                   ...styles.fontStyle,
        //                   color: 'red',
        //                 }}>{`Try again after sometime.`}</Text>
        //             ) : (
        //               <ScrollView
        //                 ref={ref => {
        //                   scroll_View = ref;
        //                 }}
        //                 onContentSizeChange={() => {
        //                   if (scrollEnd) {
        //                     scroll_View.scrollToEnd({animated: true});
        //                   }
        //                 }}
        //                 showsVerticalScrollIndicator={false}>
        //                 {/* <Text
        //                 style={{
        //                   fontFamily: 'PTSerif-Regular',
        //                   fontSize: 18,
        //                   color: 'black',
        //                   padding: 15,
        //                   opacity: 1,
        //                 }}>
        //                 {storyObj?.response}
        //               </Text> */}
        //                 <Animated.View style={{opacity: fadeAnim}}>
        //                   <Text
        //                     style={{
        //                       fontFamily: 'PTSerif-Regular',
        //                       fontSize: 18,
        //                       color: 'black',
        //                       padding: 15,
        //                     }}>
        //                     {storyObj?.response}
        //                   </Text>
        //                 </Animated.View>
        //                 {/* {storyObj?.response && (
        //                 <TypingText
        //                   text={storyObj?.response}
        //                   color="black" // Adjust color, textSize, and other props as needed
        //                   textSize={18}
        //                   //onFinish={() => console.log('Typing animation finished!')}
        //                   onFinish={handleTypingComplete}
        //                 />
        //               )} */}
        //                 {/* <Text style={styles.fontStyle}>{storyObj?.instruction}</Text> */}
        //                 <Animated.View style={{opacity: fadeInstAnim}}>
        //                   <Text style={{...styles.fontStyle}}>
        //                     {storyObj?.instruction}
        //                   </Text>
        //                 </Animated.View>
        //                 {/* {showOptions && storyObj?.question && (
        //                 <TypingText
        //                   text={storyObj?.question}
        //                   color="black" // Adjust color, textSize, and other props as needed
        //                   textSize={18}
        //                   onFinish={() => setShowQuestionsOptions(true)}
        //                 />
        //               )} */}
        //                 <Animated.View style={{opacity: fadeOptinAnim}}>
        //                   {storyObj?.options?.map((item, index) => {
        //                     //console.log('askStory?.options >>>', askStory?.options);
        //                     return (
        //                       <Animated.View
        //                         key={index}
        //                         source={boxBG}
        //                         resizeMode={'cover'}
        //                         style={{
        //                           ...styles.optionView,
        //                         }}>
        //                         <TouchableOpacity
        //                           onPress={() => getFullStory(item)}>
        //                           <Text style={styles.optionText}>
        //                             {item?.option}
        //                           </Text>
        //                           {/* <TypingText
        //                           text={item?.option}
        //                           color="black" // Adjust color, textSize, and other props as needed
        //                           textSize={18}
        //                           onFinish={handleFinishTyping}
        //                         /> */}
        //                         </TouchableOpacity>
        //                       </Animated.View>
        //                     );
        //                   })}
        //                 </Animated.View>
        //                 {enableInput && (
        //                   <View>
        //                     <TextInput
        //                       autoFocus={true}
        //                       style={styles.input}
        //                       value={somethingInput}
        //                       onChangeText={value => setSomethingInput(value)}
        //                       placeholder={'What do you do?'}
        //                       placeholderTextColor={'#AF7862'}
        //                       keyboardType={'web-search'}
        //                       onSubmitEditing={submitSomethingElseHandler}
        //                     />
        //                     <View style={styles.logoContainer}>
        //                       <View style={styles.logoBackground}>
        //                         <Image
        //                           source={LogoIconImage}
        //                           style={styles.logoImage}
        //                           resizeMode={'cover'}
        //                         />
        //                       </View>
        //                     </View>
        //                   </View>
        //                 )}
        //               </ScrollView>
        //             )}
        //           </View>
        //         </ImageBackground>
        //       </Animated.View>
        //     </View>
        //   </ImageBackground>
        //   {/* </BackImage> */}
        //   {/* </Animated.View> */}
        //   {/* {loading && (
        //     <View style={styles.loaderView}>
        //       <ActivityIndicator size="large" color="#fff" />
        //     </View>
        //   )} */}
        // </View>
      }
    </>
  );
};
