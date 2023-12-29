import React, {useState} from 'react';
import {ImageBackground, ActivityIndicator} from 'react-native';
import {AttackBG, FullCharacter} from '../../assets/images';
import styles from './style';

const BackImage = props => {
  console.log('props >>>', props);
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadStart = () => {
    console.log('Image loading started');
    // You can perform actions like showing a loading indicator
    setIsLoading(true);
  };

  const handleLoadEnd = () => {
    console.log('Image loading finished');
    // You can perform actions like hiding a loading indicator
    setIsLoading(false);
  };

  if (props.loading) {
    return (
      <ImageBackground source={FullCharacter} {...props}>
        {props.children}
      </ImageBackground>
    );
  }
  if (props.backendURL) {
    return (
      <ImageBackground
        source={{uri: props.backendURL}}
        onLoadStart={handleLoadStart}
        onLoadEnd={handleLoadEnd}
        {...props}>
        {isLoading && (
          <ActivityIndicator
            style={styles.loadingIndicator}
            size="large"
            color="#ffffff"
          />
        )}

        {props.children}
      </ImageBackground>
    );
  }
  if (props.enableFullChar) {
    return (
      <ImageBackground source={FullCharacter} {...props}>
        {props.children}
      </ImageBackground>
    );
  } else {
    return props.children;
  }
};

export default BackImage;
