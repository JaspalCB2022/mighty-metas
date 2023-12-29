import React, {Component} from 'react';
import {Text, View} from 'react-native';
import PropTypes from 'prop-types';

export default class TypingText extends Component {
  constructor() {
    super();

    this.index = 0;

    this.typing_timer = -1;

    this.blinking_cursor_timer = -1;

    this.state = {text: '', blinking_cursor_color: 'transparent'};
  }

  componentDidMount() {
    this.typingAnimation();
    this.blinkingCursorAnimation();
  }

  componentWillUnmout() {
    clearTimeout(this.typing_timer);

    this.typing_timer = -1;

    clearInterval(this.blinking_cursor_timer);

    this.blinking_cursor_timer = -1;
  }

  typingAnimation = () => {
    clearTimeout(this.typing_timer);

    this.typing_timer = -1;

    if (this.index < this.props.text.length) {
      if (this.refs.animatedText) {
        this.setState(
          {text: this.state.text + this.props.text.charAt(this.index)},
          () => {
            this.index++;

            this.typing_timer = setTimeout(() => {
              this.typingAnimation();
            }, this.props.typingAnimationDuration);
          },
        );
      }
    } else {
      // Typing animation is completed, invoke onFinish event
      if (this.props.onFinish) {
        this.props.onFinish();
      }
      clearInterval(this.blinking_cursor_timer);
    }
  };

  blinkingCursorAnimation = () => {
    this.blinking_cursor_timer = setInterval(() => {
      if (this.refs.animatedText) {
        if (this.state.blinking_cursor_color == 'transparent')
          this.setState({blinking_cursor_color: this.props.color});
        else this.setState({blinking_cursor_color: 'transparent'});
      }
    }, this.props.blinkingCursorAnimationDuration);
  };

  render() {
    return (
      <View>
        <Text
          ref="animatedText"
          style={{
            color: this.props.color,
            fontSize: this.props.textSize,
            textAlign: 'left',
            fontFamily: 'PTSerif-Regular',
            padding: 15,
          }}>
          {this.state.text}
          <Text style={{color: this.state.blinking_cursor_color}}>|</Text>
        </Text>
      </View>
    );
  }
}

TypingText.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  textSize: PropTypes.number,
  typingAnimationDuration: PropTypes.number,
  blinkingCursorAnimationDuration: PropTypes.number,
  onFinish: PropTypes.func,
};

TypingText.defaultProps = {
  text: 'Default Typing Animated Text.',
  color: 'rgb( 77, 192, 103 )',
  textSize: 30,
  fontFamily: 'PTSerif-Regular',
  typingAnimationDuration: 50,
  blinkingCursorAnimationDuration: 190,
};
