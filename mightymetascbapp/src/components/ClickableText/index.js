import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {clickableWords} from '../../constants';

export default ClickableText = ({text, onPress, style}) => {
  console.log('text >>>', text);

  //   const clickableWords = [
  //     'helmet',
  //     'breastplate',
  //     'breastplate,',
  //     'waist',
  //     'waist,',
  //     'shoes',
  //     'shoes,',
  //     'shield',
  //     'shield,',
  //     'weapon',
  //     'weapon.',
  //     'weapons',
  //     'sword',
  //     'helmet,',
  //     'eye',
  //     'eyes',
  //     'eye.',
  //   ];
  const renderTextWithLinks = () => {
    if (text) {
      const words = text.split(/\s+/);
      return words.map((word, index) => {
        // Check if the current word is clickable
        const isClickable = clickableWords.includes(word.toLowerCase());

        return isClickable ? (
          <TouchableOpacity key={index} onPress={() => onPress(word)}>
            <Text style={{...style, textDecorationLine: 'underline'}}>
              {word}{' '}
            </Text>
          </TouchableOpacity>
        ) : (
          <Text style={style} key={index}>
            {word}{' '}
          </Text>
        );
      });
    }
  };

  return renderTextWithLinks();
};
