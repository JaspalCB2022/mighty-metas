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
  {/* <Text
                        style={{
                          fontFamily: 'PTSerif-Regular',
                          fontSize: 18,
                          color: 'black',
                          padding: 15,
                          opacity: 1,
                        }}>
                        {storyObj?.response}
                      </Text> */}
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
  {/* {storyObj?.response && (
                        <TypingText
                          text={storyObj?.response}
                          color="black" // Adjust color, textSize, and other props as needed
                          textSize={18}
                          //onFinish={() => console.log('Typing animation finished!')}
                          onFinish={handleTypingComplete}
                        />
                      )} */}
  {/* <Text style={styles.fontStyle}>{storyObj?.instruction}</Text> */}
  <Animated.View style={{opacity: fadeInstAnim}}>
    <Text style={{...styles.fontStyle}}>{storyObj?.instruction}</Text>
  </Animated.View>
  {/* {showOptions && storyObj?.question && (
                        <TypingText
                          text={storyObj?.question}
                          color="black" // Adjust color, textSize, and other props as needed
                          textSize={18}
                          onFinish={() => setShowQuestionsOptions(true)}
                        />
                      )} */}
  <Animated.View style={{opacity: fadeOptinAnim}}>
    {storyObj?.options?.map((item, index) => {
      //console.log('askStory?.options >>>', askStory?.options);
      return (
        <Animated.View
          key={index}
          source={boxBG}
          resizeMode={'cover'}
          style={{
            ...styles.optionView,
          }}>
          <TouchableOpacity onPress={() => getFullStory(item)}>
            <Text style={styles.optionText}>{item?.option}</Text>
            {/* <TypingText
                                  text={item?.option}
                                  color="black" // Adjust color, textSize, and other props as needed
                                  textSize={18}
                                  onFinish={handleFinishTyping}
                                /> */}
          </TouchableOpacity>
        </Animated.View>
      );
    })}
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
</ScrollView>;
