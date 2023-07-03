import {PermissionsAndroid, Alert, Modal} from 'react-native';
import {Component} from 'react';
import ImageViewer from 'react-native-image-zoom-viewer';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import {CameraRoll} from '@react-native-camera-roll/camera-roll';

interface Options {
  title?: string;
  message?: string;
  cancelText?: string;
  mediaType: any;
  saveToPhotos: boolean;
}

interface IProps {
  navigation?: any;
}
interface IState {
  photo: string;
  photoCollection: Array<any>;
  modal: boolean;
  imagePath: string;
}

class ImageExploreController extends Component<IProps, IState> {
  state = {
    photo: '',
    photoCollection: [],
    modal: false,
    imagePath: '',
  };

  componentDidMount() {
    this.requestGalleryPermission();
  }

  requestGalleryPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      if (granted === (await PermissionsAndroid.RESULTS.GRANTED)) {
        console.log('You can use the Gallery');
      } else {
        console.log('Gallery permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  handleChooseImage = () => {
    const options: Options = {
      title: 'Select an image',
      mediaType: 'photo',
      saveToPhotos: true,
    };

    launchImageLibrary(options, (response: any) => {
      if (response.didCancel) {
        console.log('User canceled');
      } else if (response.errorCode) {
        console.log('Error picking image: ', response.error);
      } else {
        let eachPhoto = {
          id: Date.now(),
          photo: response.assets[0].uri,
        };
        this.setState({
          photo: response.assets[0].uri,
          photoCollection: [...this.state.photoCollection, eachPhoto],
        });
      }
    });
  };

  handleDownloadImage = async (imageUrl: string) => {
    CameraRoll.save(imageUrl, {type: 'photo', album: 'string'});
    console.log('HI');
  };
  openCamera = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
        saveToPhotos: true,
      },
    };
    launchCamera(options, (res: any) => {
      console.log('Response = ', res);
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
        Alert.alert(res.customButton);
      } else {
        let eachPhoto = {
          photo: res.assets[0].uri,
        };
        this.setState({
          photo: res.assets[0].uri,
          photoCollection: [...this.state.photoCollection, eachPhoto],
        });
      }
    });
  };
}

export default ImageExploreController;
