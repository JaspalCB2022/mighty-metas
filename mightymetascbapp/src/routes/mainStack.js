import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainPage from '../pages/main';
import PlayType from '../pages/playtype';
import StoryCreate from '../pages/storycreate';
import StoryView from '../pages/storyView/index';
import CharacterViewComponent from '../pages/characterView/index';
import ZoomableImage from '../components/ZoomImage';
import MergeImageComponent from '../pages/mergeImage/index';

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
      <Stack.Screen name="characterview" component={CharacterViewComponent} />
      <Stack.Screen name="zoomview" component={ZoomableImage} />
      <Stack.Screen
        name="MergeImageComponent"
        component={MergeImageComponent}
      />
    </Stack.Navigator>
  );
};
