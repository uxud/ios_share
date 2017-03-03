/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  ActionSheetIOS, // gir mulighet til å dele en file med en annen app f.eks mail, pdf-viwer etc.
  Platform,
  TouchableHighlight,
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import RNFS from 'react-native-fs'; // gir tilgang til native fil behandling

export default class ios_share extends Component {


  SharingIsCaring(){

    var mainpath = RNFS.MainBundlePath;
    if (Platform.OS == 'android'){

      mainpath = RNFS.DocumentDirectoryPath;
    }

    let path = mainpath + '/test.txt';
    console.log(path);

      // sørger for at side for deling popper opp, url til filen som skal deles med appen er også med
   ActionSheetIOS.showShareActionSheetWithOptions({
     url: '/data/user/0/com.ios_share/files/test.txt'
   },
   (error) => console.warn(error.message),
   (completed, method) => {
     var text;
     if (completed) {
       text = `Shared via ${method}`;
     } else {
       text = 'You didn\'t share';
     }
     console.log(text);
   });

}



  render() {

    // create a path you want to write to
  var mainpath = RNFS.MainBundlePath;
  if (Platform.OS == 'android'){
    mainpath = RNFS.DocumentDirectoryPath;
  }
  let path = mainpath + '/test.txt';
  RNFS.writeFile(path, 'Hello World!', 'utf8')
    .then((success) => {
      console.log('File written');
    })
    .catch((err) => {
      console.log(err.message);
    });

    return (
      <View style={styles.container}>
        <TouchableHighlight underlayColor='gray' justifyContent='center' alignItems='center' onPress={this.SharingIsCaring}>
          <Text>S H A R E</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('ios_share', () => ios_share);
