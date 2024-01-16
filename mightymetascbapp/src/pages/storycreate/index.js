import * as React from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  TextInput,
  KeyboardAvoidingView,
  RefreshControl,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  useAskQueryMutation,
  useGenerateStoryMutation,
} from '../../api/generateStory';
import {LoadingComponent} from '../../components/Loading';
import {
  pop_BG,
  boxBG,
  chrBG,
  MainBG,
  DarkBG,
  LogoIconImage,
  InputLogoBG,
} from '../../assets/images';

import styles from './styles';
import {useSelector} from 'react-redux';
import {selectUserSessionId} from '../../api/userSessionSlice';
import {getUserSessionIdFromStorage} from '../../helper/session';
import TypingText from '../../components/TypingText';
import demoData from './demo';

export default StoryCreate = props => {
  // const {data, isLoading, isFetching, isError, isSuccess, refetch, error} =
  //   useGamestoreQuery();
  let scroll_View = React.useRef(null);

  const [askStory, setAskStory] = React.useState({});
  const [storyData, setStoryData] = React.useState(demoData || {});

  const [loading, setLoading] = React.useState(false);
  const [enableInput, setEnableInput] = React.useState(false);
  const [somethingInput, setSomethingInput] = React.useState('');
  const [refreshing, setRefreshing] = React.useState(false);
  const [scrollEnd, setScrollEnd] = React.useState(false);

  const [askQuery, {isLoading, isError, error}] = useAskQueryMutation();
  const session_id = useSelector(selectUserSessionId);

  const getAskQuery = async () => {
    setEnableInput(false);
    setScrollEnd(false);
    const formdata = new FormData();
    formdata.append('session_id', session_id);
    const response = await askQuery(formdata);
    //console.log('response >>', JSON.stringify(response));
    setStoryData(response.data);
  };

  const onRefresh = () => {
    setRefreshing(true);
    getAskQuery();
    setRefreshing(false);
  };

  const getGenerateStory = async data => {
    props.navigation.navigate('storyview', {
      storydata: data,
    });
  };

  const submitSomethingElseHandler = () => {
    if (somethingInput) {
      getGenerateStory(somethingInput);
      setSomethingInput('');
    }
  };
  const getFullStory = async item => {
    setScrollEnd(false);
    setEnableInput(false);
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
        setScrollEnd(true);
        setEnableInput(true);
      } else {
        setEnableInput(false);
        setScrollEnd(false);

        getGenerateStory(item.option);
      }
    }
  };

  // React.useEffect(() => {
  //   getAskQuery();
  // }, []);

  return (
    <>
      {isLoading ? (
        <LoadingComponent />
      ) : (
        <ImageBackground
          source={DarkBG}
          style={styles.mainbgcontainer}
          resizeMode={'cover'}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{flex: 1}}>
            <View style={{flex: 2}} />
            <View style={{flex: 13, marginTop: 0}}>
              <ImageBackground
                source={pop_BG}
                style={styles.textbgcontainer}
                resizeMode={'cover'}>
                <View style={{paddingTop: 80, paddingBottom: 98}}>
                  {isError ? (
                    <TouchableWithoutFeedback onPress={onRefresh}>
                      <View
                        style={{
                          justifyContent: 'center',
                          alignContent: 'center',
                          alignSelf: 'center',
                          marginTop: 150,
                        }}>
                        <TypingText
                          text={`Try again after sometime.`}
                          color={styles.fontStyle.color}
                          textSize={styles.fontStyle.fontSize}
                        />
                        {/* <TypingText text={`Retry`} style={styles.fontStyle} /> */}
                        {/* <Text
                          style={
                            styles.fontStyle
                          }>{`Try again after sometime.`}</Text>
                        <Text style={styles.fontStyle}>{`Retry`}</Text> */}
                      </View>
                    </TouchableWithoutFeedback>
                  ) : (
                    <ScrollView
                      ref={ref => {
                        scroll_View = ref;
                      }}
                      showsVerticalScrollIndicator={false}
                      refreshControl={
                        <RefreshControl
                          refreshing={refreshing}
                          onRefresh={onRefresh}
                        />
                      }
                      onContentSizeChange={() => {
                        if (scrollEnd) {
                          scroll_View.scrollToEnd({animated: true});
                        }
                      }}
                      keyboardShouldPersistTaps={'handled'}>
                      {/* <TypingText
                        text={storyData?.response}
                        style={styles.fontStyle.color}
                        color={'black'}
                        textSize={styles.fontStyle.fontSize}
                      />
                      <TypingText
                        text={storyData?.question}
                        style={styles.fontStyle.color}
                        color={'black'}
                        textSize={styles.fontStyle.fontSize}
                        blinkingCursorAnimationDuration={500}
                      /> */}
                      <Text style={styles.fontStyle}>
                        {storyData?.response}
                      </Text>

                      {/* {renderEquipments(storyData?.equipment)} */}
                      {storyData?.equipment?.map((item, index) => {
                        const tempkeys = Object.keys(item)[0];
                        console.log(tempkeys);

                        return (
                          <View
                            key={index}
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'flex-start',
                            }}>
                            <Text
                              style={{
                                ...styles.optionText,
                                paddingHorizontal: 0,
                                paddingLeft: 15,
                                //fontWeight: '500',
                              }}>{`${index + 1}. ${tempkeys}:`}</Text>
                            <Text
                              style={{
                                ...styles.optionText,
                                paddingHorizontal: 0,
                                paddingLeft: 5,
                                flexWrap: 'wrap',
                                paddingRight: 15,

                                //fontWeight: '500',
                              }}>
                              {`${item[tempkeys]}`}
                            </Text>
                          </View>
                        );
                      })}

                      {/* <TypingText
                        text={storyData?.question}
                        style={styles.fontStyle}
                      /> */}
                      <Text style={styles.fontStyle}>
                        {storyData?.instruction}
                      </Text>
                      {storyData?.options?.map((item, index) => {
                        //console.log('askStory?.options >>>', askStory?.options);
                        return (
                          <View
                            key={index}
                            source={boxBG}
                            resizeMode={'cover'}
                            style={styles.optionView}>
                            <TouchableOpacity
                              onPress={() => getFullStory(item)}>
                              <Text style={styles.optionText}>
                                {item?.option}
                              </Text>
                            </TouchableOpacity>
                          </View>
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
                </View>
              </ImageBackground>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      )}
      {loading && (
        <View style={styles.loaderView}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}
    </>
  );
};
