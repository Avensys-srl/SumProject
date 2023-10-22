import {StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import UploadFile from './UploadFile';
import ListofProjects from './ListofProjects';
import DisplayData from './DisplayData';
import SettingsScreen from './SettingsScreen';
import 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomHeaderBackButton from './CustomHeaderBackButton';
import CustomUpArrowIcon from './CustomUpArrowIcon';
import DownloadData from './DownloadData';
import Connectivity from './Connectivity';
import VerificationParameters from './VerificationParameters';
import StartUpVerification from './StartUpVerification';
import EditData from './EditData';
import DownloadingReport from './DownloadingReport';
import DownloadService from './DownloadService';
import {PermissionsAndroid} from 'react-native';
import {Colors} from './styles';

const Stack = createStackNavigator();

// Definisci un array di permessi che desideri richiedere
const permissions = [
  PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
  PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
  PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
  PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO,
  // Aggiungi altri permessi qui se necessario
];

const requestStoragePermission = async () => {
  try {
    const granted = await PermissionsAndroid.requestMultiple(permissions);
    for (const permission in granted) {
      if (granted[permission] === PermissionsAndroid.RESULTS.GRANTED) {
        console.log(`${permission} è stato concesso.`);
        // Gestisci il permesso concesso qui
      } else {
        console.log(`${permission} è stato negato.`);
        // Gestisci il permesso negato qui
      }
    }
  } catch (error) {
    console.warn(error);
  }
};

const NavigationUpload = () => {
  useEffect(() => {
    clearLocalStorage();
  }, []);

  const clearLocalStorage = async () => {
    try {
      await AsyncStorage.clear();
      console.log('Local storage data cleared.');
    } catch (error) {
      console.error('Error clearing local storage data:', error);
    }
  };

  requestStoragePermission();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{headerShown: false}}></Stack.Screen>
        <Stack.Screen
          name="UploadFile"
          component={UploadFile}
          options={{
            headerTitle: 'Upload File',
            headerStyle: {
              backgroundColor: Colors.LIGHT_GREEN,
            },
            headerLeft: () => <CustomHeaderBackButton />,
            headerTitleStyle: {
              color: 'white',
              fontSize: 20,
              marginStart: 8,
              textDecorationLine: 'underline',
            },
          }}></Stack.Screen>
        <Stack.Screen
          name="ListofProjects"
          component={ListofProjects}
          options={{
            headerTitle: 'List of Projects',
            headerStyle: {
              backgroundColor: Colors.LIGHT_GREEN,
            },
            headerLeft: () => <CustomHeaderBackButton />,
            headerTitleStyle: {
              color: 'white',
              fontSize: 20,
              marginStart: 8,
              textDecorationLine: 'underline',
            },
            headerRight: () => <CustomUpArrowIcon />,
          }}></Stack.Screen>
        <Stack.Screen
          name="DisplayData"
          component={DisplayData}
          options={{
            headerTitle: 'Design Parameters',
            headerStyle: {
              backgroundColor: Colors.LIGHT_GREEN,
            },
            headerLeft: () => <CustomHeaderBackButton />,
            headerTitleStyle: {
              color: 'white',
              fontSize: 20,
              marginStart: 8,
              textDecorationLine: 'underline',
            },
          }}></Stack.Screen>
        <Stack.Screen
          name="SettingsScreen"
          component={SettingsScreen}
          options={{
            headerTitle: 'Visibility Room Param',
            headerStyle: {
              backgroundColor: Colors.LIGHT_GREEN,
            },
            headerLeft: () => <CustomHeaderBackButton />,
            headerTitleStyle: {
              color: 'white',
              fontSize: 20,
              marginStart: 8,
              textDecorationLine: 'underline',
            },
          }}
        />
        <Stack.Screen
          name="DownloadData"
          component={DownloadData}
          options={{
            headerTitle: 'Verification Parameters',
            headerStyle: {
              backgroundColor: Colors.LIGHT_GREEN,
            },
            headerLeft: () => <CustomHeaderBackButton />,
            headerTitleStyle: {
              color: 'white',
              fontSize: 20,
              marginStart: 8,
              textDecorationLine: 'underline',
            },
          }}
        />

        <Stack.Screen
          name="Connectivity"
          component={Connectivity}
          options={{
            headerTitle: 'Connectivity',
            headerStyle: {
              backgroundColor: Colors.LIGHT_GREEN,
            },
            headerLeft: () => <CustomHeaderBackButton />,
            headerRight: () => <CustomUpArrowIcon />,
            headerTitleStyle: {
              color: 'white',
              fontSize: 20,
              marginStart: 8,
              textDecorationLine: 'underline',
            },
          }}
        />

        <Stack.Screen
          name="VerificationParameters"
          component={VerificationParameters}
          options={{
            headerTitle: 'Verification Parameters',
            headerStyle: {
              backgroundColor: Colors.LIGHT_GREEN,
            },
            headerLeft: () => <CustomHeaderBackButton />,
            headerRight: () => <CustomUpArrowIcon />,
            headerTitleStyle: {
              color: 'white',
              fontSize: 20,
              marginStart: 8,
              textDecorationLine: 'underline',
            },
          }}
        />

        <Stack.Screen
          name="StartUpVerification"
          component={StartUpVerification}
          options={{
            headerTitle: 'Startup par. verification',
            headerStyle: {
              backgroundColor: 'orange',
            },
            headerLeft: () => <CustomHeaderBackButton />,
            headerRight: () => <CustomUpArrowIcon />,
            headerTitleStyle: {
              color: 'white',
              fontSize: 20,
              marginStart: 8,
              textDecorationLine: 'underline',
            },
          }}
        />

        <Stack.Screen
          name="EditData"
          component={EditData}
          options={{
            headerTitle: 'Startup par. verification',
            headerStyle: {
              backgroundColor: 'orange',
            },
            headerLeft: () => <CustomHeaderBackButton />,
            headerRight: () => <CustomUpArrowIcon />,
            headerTitleStyle: {
              color: 'white',
              fontSize: 20,
              marginStart: 8,
              textDecorationLine: 'underline',
            },
          }}
        />

        <Stack.Screen
          name="DownloadingReport"
          component={DownloadingReport}
          options={{
            headerTitle: 'Downloading Report',
            headerStyle: {
              backgroundColor: Colors.LIGHT_GREEN,
            },
            headerLeft: () => <CustomHeaderBackButton />,
            headerRight: () => <CustomUpArrowIcon />,
            headerTitleStyle: {
              color: 'white',
              fontSize: 20,
              marginStart: 8,
              textDecorationLine: 'underline',
            },
          }}
        />

        <Stack.Screen
          name="DownloadService"
          component={DownloadService}
          options={{
            headerTitle: 'service',
            headerStyle: {
              backgroundColor: 'red',
            },
            headerLeft: () => <CustomHeaderBackButton />,
            headerTitleStyle: {
              color: 'white',
              fontSize: 20,
              marginStart: 8,
              textDecorationLine: 'underline',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavigationUpload;

const styles = StyleSheet.create({});
