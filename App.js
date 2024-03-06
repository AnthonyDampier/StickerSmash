import {useState} from 'react';
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import Button from './components/Button'; 
import ImageViewer from './components/ImageViewer';
import IconButton from './components/IconButton';
import CircleButton from './components/CircleButton';
import EmojiPicker from './components/EmojiPicker';
import EmojiList from './components/EmojiList';
import EmojiSticker from './components/EmojiSticker';

const PlaceholderImage = require("./assets/images/background-image.png");

export default function App() {
  const [selectImage, setSelectedImage] = useState(null);
  const [pickedEmoji, setPickedEmoji] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showAppOptions, setShowAppOptions] = useState(false);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    } else {
      alert("You must select a photo.");
    }
  };

  // menu section
  const onReset = () => {
    setShowAppOptions(false);
  };

  const onSaveImageAsync = async () => {
    //
  }

  // emoji picker section
  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };


  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <ImageViewer 
            placeholderImageSource={PlaceholderImage} 
            selectImage={selectImage}
          />
          {pickedEmoji && ( <EmojiSticker imageSize={40} stickerSource={pickedEmoji} /> )}
        </View>
        {showAppOptions ? (
                  <View style={styles.optionsContainer}>
                  <View style={styles.optionsRow}>
                    <IconButton icon="refresh" label="Reset" onPress={onReset} />
                    <CircleButton onPress={onAddSticker} />
                    <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync} />
                  </View>
                </View>
        ) : (
          <View style={styles.footerContainer}>
            <Button theme="primary" label="Choose a photo" onPress={pickImageAsync} />
            <Button label="Use this photo" onPress={() => setShowAppOptions(true)} />
          </View>
        )}
        <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
          <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
        </EmojiPicker>

        <StatusBar style="auto" />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
