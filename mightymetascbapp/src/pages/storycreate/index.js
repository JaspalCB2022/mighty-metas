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
} from '../../assets/images';

import styles from './styles';
import {useSelector} from 'react-redux';
import {selectUserSessionId} from '../../api/userSessionSlice';
import {getUserSessionIdFromStorage} from '../../helper/session';

export const StoryCreate = props => {
  // const {data, isLoading, isFetching, isError, isSuccess, refetch, error} =
  //   useGamestoreQuery();
  const [askStory, setAskStory] = React.useState({});
  const [storyData, setStoryData] = React.useState({});

  const [loading, setLoading] = React.useState(false);
  const [enableInput, setEnableInput] = React.useState(false);
  const [somethingInput, setSomethingInput] = React.useState('');

  const [askQuery, {data, isLoading, isError, error}] = useAskQueryMutation();

  const session_id = useSelector(selectUserSessionId);

  console.log('>>session_id >>>>', session_id);

  const [
    generateStory,
    {
      data: createstory,
      isLoading: Loading,
      isError: Error,
      error: getStoryError,
    },
  ] = useGenerateStoryMutation();

  console.log('error >>>3443?>>', error);

  const onChangeSomethingInputHandler = value => {
    setSomethingInput(value);
  };

  const getAskQuery = async () => {
    const formdata = new FormData();
    formdata.append('session_id', session_id);
    const response = await askQuery(formdata);
    setStoryData(response);
    console.log('Data> response >>', response);
  };

  const getsessions = async () => {
    const retrievedUserSessionId = await getUserSessionIdFromStorage();
    console.log('Retrieved User Session ID:', retrievedUserSessionId);
  };

  const getFullStory = async item => {
    setLoading(true);
    if (Object.keys(item).length > 0) {
      const optionvalue = item?.option?.toLowerCase();
      if (
        optionvalue == '{something else}' ||
        optionvalue == '{ something else }' ||
        optionvalue == 'something else' ||
        optionvalue == 'something else.'
      ) {
        setEnableInput(true);
      } else {
        setEnableInput(false);

        const formdata = new FormData();
        formdata.append('prompt', item.option);
        const response = await generateStory(formdata);
        //console.log('response>>>response>>', response);
        if (
          response &&
          'options' in response?.data &&
          response?.data?.options?.length > 0
        ) {
          setAskStory(response.data);
        } else {
          props.navigation.navigate('storyview', {
            storydata: response.data,
          });
        }
      }
    }
    setLoading(false);
  };

  React.useEffect(() => {
    if (Object.keys(storyData).length > 0) {
      getAskQuery();
    }
    // refetch();
  }, [storyData]);

  return (
    <>
      {isLoading ? (
        <LoadingComponent />
      ) : (
        <ImageBackground
          source={DarkBG}
          style={styles.mainbgcontainer}
          resizeMode={'cover'}>
          <View style={{flex: 2}} />
          <View style={{flex: 13, marginTop: 0}}>
            <ImageBackground
              source={pop_BG}
              style={styles.textbgcontainer}
              resizeMode={'cover'}>
              <View style={{paddingTop: 80, paddingBottom: 200}}>
                {isError || Error ? (
                  <View style={{justifyContent: 'center'}}>
                    <Text
                      style={styles.fontStyle}>{`Some Error Occurred!`}</Text>
                  </View>
                ) : (
                  <ScrollView showsVerticalScrollIndicator={false}>
                    <Text style={styles.fontStyle}>{askStory?.response}</Text>
                    <Text style={styles.fontStyle}>{askStory?.question}</Text>
                    {askStory?.options?.map((item, index) => {
                      //console.log('askStory?.options >>>', askStory?.options);
                      return (
                        <View
                          key={index}
                          source={boxBG}
                          resizeMode={'cover'}
                          style={styles.optionView}>
                          <TouchableOpacity onPress={() => getFullStory(item)}>
                            <Text style={styles.optionText}>
                              {item?.option}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      );
                    })}
                    {enableInput && (
                      <View style={{flexDirection: 'row'}}>
                        <View style={{flex: 1}}>
                          <Image
                            source={LogoIconImage}
                            style={{
                              height: 35,
                              width: 25,
                            }}
                            resizeMode={'cover'}
                          />
                        </View>

                        <View
                        // style={{
                        //   position: 'absolute',
                        //   left: 30,
                        //   top: 0,
                        //   right: 0,
                        //   bottom: 0,
                        //   justifyContent: 'center',
                        //     }}
                        >
                          <TextInput
                            autoFocus={true}
                            style={styles.input}
                            onChangeText={onChangeSomethingInputHandler}
                            value={somethingInput}
                            placeholder={'What do you do?'}
                            placeholderTextColor={'#AF7862'}
                            keyboardType={'web-search'}
                          />
                        </View>
                      </View>
                    )}

                    {loading && (
                      <View style={styles.loaderView}>
                        <ActivityIndicator size="large" color="#fff" />
                      </View>
                    )}
                  </ScrollView>
                )}
              </View>
            </ImageBackground>
          </View>
        </ImageBackground>
      )}
    </>
  );
};
