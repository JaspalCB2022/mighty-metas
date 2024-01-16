import React, {useEffect, useRef, createRef} from 'react';
import {View, StyleSheet, Text, Button} from 'react-native';
import {Image as RNImage} from 'react-native';
import {FullCharacter} from '../../assets/images';
import {ReactNativeZoomableView} from '@openspacelabs/react-native-zoomable-view';
import {Image} from 'react-native-svg';

const CharacterViewComponent = props => {
  const zoomableViewRef = useRef(null);

  return (
    <View style={styles.container}>
      <View style={{...styles.zoomWrappe, height: 160, width: 200}}>
        <ReactNativeZoomableView
          ref={zoomableViewRef}
          // minZoom={1} // Set minZoom and maxZoom to the same value to disable zooming
          // maxZoom={1}
          contentWidth={150}
          contentHeight={150}
          panBoundaryPadding={400}>
          <RNImage source={FullCharacter} style={{width: 180, height: 280}} />
        </ReactNativeZoomableView>
      </View>

      <View style={styles.controlWrapperLeft}>
        {/* Here you see some examples of moveBy */}
        <Button
          onPress={() => {
            zoomableViewRef.current.moveBy(-30, 0);
            zoomableViewRef.current.zoomTo(1.5);
          }}
          title="⬅️"
          style={{backgroundColor: 'black'}}
        />
        <Button
          onPress={() => {
            zoomableViewRef.current.moveBy(30, 0);
            zoomableViewRef.current.zoomTo(1.5);
          }}
          title="➡️"
          style={{backgroundColor: 'black'}}
        />
        <Button
          onPress={() => {
            zoomableViewRef.current.moveBy(0, -30);
            zoomableViewRef.current.zoomTo(1.5);
          }}
          title="⬆️"
          style={{backgroundColor: 'black'}}
        />
        <Button
          onPress={() => {
            zoomableViewRef.current.moveBy(0, 30);
            zoomableViewRef.current.zoomTo(1.5);
          }}
          title="⬇️"
          style={{backgroundColor: 'black'}}
        />

        {/* Here you see an example of moveTo */}
        <Button
          onPress={() => {
            zoomableViewRef.current.moveTo(300, 200);
            zoomableViewRef.current.zoomTo(1.5);
          }}
          title="Move to"
        />
      </View>

      <View style={styles.controlWrapperRight}>
        {/* Here you see examples of zoomBy */}
        <Button
          onPress={() => {
            zoomableViewRef.current.zoomBy(-0.1);
            zoomableViewRef.current.zoomTo(1.5);
          }}
          title="-"
        />
        <Button
          onPress={() => {
            zoomableViewRef.current.zoomBy(0.1);
            zoomableViewRef.current.zoomTo(1.5);
          }}
          title="+"
        />

        {/* Here you see an example of zoomTo */}
        <Button
          onPress={() => zoomableViewRef.current.zoomTo(1)}
          title="reset"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: 'transparent',
  },
  zoomWrapper: {
    marginTop: 50,
    //borderWidth: 5,
    flexShrink: 1,
  },
  controlWrapperLeft: {
    flex: 3,
  },
});

export default CharacterViewComponent;
