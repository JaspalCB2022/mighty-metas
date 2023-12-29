<ImageBackground source={StoryBG} resizeMode={'cover'} style={styles.container}>
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
            <Text style={{...styles.fontStyle}}>{storyObj?.instruction}</Text>
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
</ImageBackground>;
