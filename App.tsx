import {Text, View} from 'react-native';
import React, {Component} from 'react';
import ImageExplore from './src/blocks/ImageExplore';
import Imagezoom from './src/blocks/Imagezoom';

class App extends Component {
  render() {
    return (
      <View>
        <ImageExplore />
        {/* <Imagezoom /> */}
      </View>
    );
  }
}

export default App;
