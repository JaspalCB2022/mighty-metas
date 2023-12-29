import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Animated,
  Easing,
} from 'react-native';
import {pop_BG, boxBG, LogoIconImage} from '../../assets/images';
import styles from './style';
import TypingText from '../../components/TypingText';

const StoryContent = props => {
  const {
    storyObj,
    scroll_View,
    scrollEnd,
    fadeAnim,
    fadeInstAnim,
    fadeOptinAnim,
    enableInput,
    getFullStory,
    setShowQuestionsOptions,
    setShowOptions,
  } = props;

  return (
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
      {storyObj?.response && (
        <Animated.View style={{opacity: fadeAnim}}>
          <TypingText
            text={storyObj?.response}
            color="black" // Adjust color, textSize, and other props as needed
            textSize={18}
            //onFinish={() => console.log('Typing animation finished!')}
            onFinish={() => {
              setShowOptions(true);
              fadeInstAnim.setValue(1);
            }}
          />
        </Animated.View>
      )}

      {showOptions && storyObj?.instruction && (
        <Animated.View style={{opacity: fadeInstAnim}}>
          <TypingText
            text={storyObj?.instruction}
            color="black" // Adjust color, textSize, and other props as needed
            textSize={18}
            onFinish={() => {
              setShowQuestionsOptions(true);
              fadeOptinAnim.setValue(1);
            }}
          />
          {/* <Text style={{...styles.fontStyle}}>
                        {storyObj?.instruction}
                      </Text> */}
        </Animated.View>
      )}

      {showQuestionsOptions && storyObj?.options && (
        <Animated.View style={{opacity: fadeOptinAnim}}>
          {storyObj?.options?.map((item, index) => {
            return (
              <View
                key={index}
                source={boxBG}
                resizeMode={'cover'}
                style={{
                  ...styles.optionView,
                }}>
                <TouchableOpacity onPress={() => getFullStory(item)}>
                  <Text style={styles.optionText}>{item?.option}</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </Animated.View>
      )}
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
  );
};

export default StoryContent;
