import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  FlatList,
  Modal,
  Alert,
  ActivityIndicator,
  Platform,
} from 'react-native';
import React from 'react';
import ImageExploreController from './ImageExploreController';
import {moderateScale} from '../../Metrics';
import ImageViewer from 'react-native-image-zoom-viewer';
import {PERMISSIONS} from 'react-native-permissions';

const {height, width} = Dimensions.get('window');

class ImageExplore extends ImageExploreController {
  images = [
    {
      url: this.state.imagePath,
    },
  ];
  render() {
    const images = [
      {
        // Simplest usage.
        url: this.state.imagePath,

        width: 700,
        height: 700,
        // Optional, if you know the image size, you can set the optimization performance

        // You can pass props to <Image />.
        props: {
          // headers: ...
        },
      },
    ];
    console.log(this.state.imagePath, 'imagee');
    return (
      <SafeAreaView style={styles.bgMainContainer}>
        <View style={{height: moderateScale(600)}}>
          {this.state.photoCollection.length !== 0 ? (
            <FlatList
              style={{width: width}}
              numColumns={3}
              data={this.state.photoCollection}
              renderItem={({item}: {item: any}) => {
                return (
                  <TouchableOpacity
                    // onLongPress={() => this.handleDownloadImage(item.photo)}
                    onPress={() =>
                      this.setState({modal: true, imagePath: item.photo})
                    }
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <Image
                      style={{
                        width: 100,
                        height: 100,
                        borderRadius: 10,
                        marginBottom: 10,
                        marginLeft: 17,
                        marginRight: 10,
                      }}
                      source={{uri: item.photo}}
                    />
                  </TouchableOpacity>
                );
              }}
              keyExtractor={item => item.id}
            />
          ) : (
            <View></View>
          )}
        </View>

        <View style={{}}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <View
              style={{
                top: 0,
              }}>
              <TouchableOpacity
                style={{
                  height: 40,
                  width: 140,
                  backgroundColor: 'blue',
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 20,
                  borderRadius: 10,
                  marginRight: 16,
                }}
                onPress={async () => {
                  if (Platform.OS === 'ios') {
                    this.requestPermissions(PERMISSIONS.IOS.PHOTO_LIBRARY);
                  } else {
                    this.requestPermissions(
                      PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
                    );
                  }
                  // await this.requestGalleryPermission();
                  await this.handleChooseImage();
                }}>
                <Text
                  style={{
                    color: '#ffffff',
                    textAlign: 'center',
                    fontSize: 16,
                  }}>
                  ChooseImage
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  height: 40,
                  width: 140,
                  backgroundColor: 'blue',
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 20,
                  borderRadius: 10,
                  marginRight: 16,
                }}
                onPress={async () => {
                  // await this.requestGalleryPermission();
                  await this.openCamera();
                }}>
                <Text
                  style={{
                    color: '#ffffff',
                    textAlign: 'center',
                    fontSize: 16,
                  }}>
                  OpenCamera
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modal}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            this.setState({modal: !this.state.modal});
          }}>
          <View
            style={{
              flex: 1,
              backgroundColor: '#000000aa',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            <View
              style={{
                backgroundColor: '#ffffff',
                margin: 50,
                padding: 40,
                borderRadius: 10,
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                width: '90%',
              }}>
              <ImageViewer imageUrls={this.images} />
              <Image
                style={{width: '100%', height: 500}}
                source={{uri: this.state.imagePath}}
              />
            </View>
          </View>
        </Modal> */}
        <Modal
          visible={this.state.modal}
          transparent={true}
          onRequestClose={() => {
            this.setState({modal: !this.state.modal});
          }}>
          <ImageViewer
            onLongPress={() => this.handleDownloadImage(this.state.imagePath)}
            saveToLocalByLongPress={true}
            enableImageZoom={true}
            imageUrls={images}
          />
        </Modal>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  bgMainContainer: {
    backgroundColor: '#ffffff',
    height: height,
  },
});

export default ImageExplore;
