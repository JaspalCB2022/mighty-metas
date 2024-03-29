import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MainPage} from '../pages/main';
import {PlayType} from '../pages/playtype';
import {StoryCreate} from '../pages/storycreate';
import StoryView from '../pages/storyView/index';

const Stack = createNativeStackNavigator();

export const MainStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="home"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="playtype" component={PlayType} />
      <Stack.Screen name="home" component={MainPage} />
      <Stack.Screen name="storycreate" component={StoryCreate} />
      <Stack.Screen name="storyview" component={StoryView} />
    </Stack.Navigator>
  );
};
