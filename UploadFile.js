import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, PermissionsAndroid} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import XLSX from 'xlsx';
import RNFS from 'react-native-fs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomBottomNavigation from './CustomBottomNavigation';
import {CustomStyles} from './styles';

const UploadFile = () => {
  const [fileName, setFileName] = useState('');
  useEffect(() => {
    // Request storage permissions if necessary
    // Handle permission requests as needed
  }, []);

  const requestStoragePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Storage permission granted');
        } else {
          console.log('Storage permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const pickDocument = async () => {
    try {
      requestStoragePermission();
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.xlsx],
      });
      if (result[0].uri) {
        const excelFileData = await RNFS.readFile(result[0].uri, 'base64');
        const workbook = XLSX.read(excelFileData, {type: 'base64'});
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const excelData = XLSX.utils.sheet_to_json(worksheet);
        const excelDataString = JSON.stringify(excelData);
        try {
          await AsyncStorage.setItem('excelData', excelDataString);
          console.log('Array salvato con successo!');
          setFileName(result[0].name);
          console.log('Excel data:', excelData);
        } catch (error) {
          console.error("Errore nel salvataggio dell'array: ", error);
        }
      } else {
        console.log('Selected document URI is undefined.');
      }
    } catch (error) {
      console.log('Error picking document:', error);
    }
  };

  return (
    <View style={{height: '100%'}}>
      <View>
        <Text style={styles.headingText}>Upload and Read Excel File</Text>
        <Text onPress={pickDocument} style={CustomStyles.BlueButton}>
          Pick Excel File
        </Text>
        <Text style={CustomStyles.BtnText}>
          {fileName && `Selected File: ${fileName}`}
        </Text>
      </View>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'flex-end'}}>
        <CustomBottomNavigation />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headingText: {
    fontSize: 20,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    paddingBottom: 15,
    paddingTop: 15,
  },
  fileNameDisplay: {
    fontSize: 15,
    paddingBottom: 15,
    paddingTop: 15,
  },
});

export default UploadFile;
