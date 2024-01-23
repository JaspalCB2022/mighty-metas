import React, {useState, useEffect, useRef} from 'react';
import {View, Text, Image} from 'react-native';
import mergeImages from 'merge-images';
import {
  BaseCharacter,
  Breastplate,
  Helmet,
  Shield,
  Shoes,
  Waist,
  Weapon,
} from '../../assets/images';
import Canvas from 'react-native-canvas';

const MergeImageComponent = () => {
  const [mergedImage, setMergedImage] = useState(null);
  const canvasRef = useRef(null);

  const renderCanvasHandler = async () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;

      const context = canvas.getContext('2d');

      //image.src = 'path/to/your/image.jpg';
      mergeImages([
        BaseCharacter,
        Helmet,
        Weapon,
        Breastplate,
        Waist,
        Shield,
        Shoes,
      ])
        .then(b64 => {
          //setMergedImage(b64);
          const image = new Image();
          console.log('>>>', b64);
          image.src = b64;
        })
        .catch(err => {
          console.log('errr >>', err);
        });

      await new Promise(resolve => {
        image.onload = resolve;
      });

      // Draw the image on the canvas
      context.drawImage(image, 10, 10, 200, 200);
    }
  };

  useEffect(() => {
    renderCanvasHandler();
  }, []);

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>{`1`}</Text>
      {/* {mergedImage && (
        <Image source={{uri: mergedImage}} style={{width: 200, height: 300}} />
      )} */}
      <Canvas ref={canvasRef} style={{width: 300, height: 300}} />
    </View>
  );
};

export default MergeImageComponent;
