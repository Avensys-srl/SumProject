import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Dimensions, Image } from 'react-native';
import CustomBottomNavigation from './CustomBottomNavigation';
import HI from './assets/house-icon-original.png';
import PI from './assets/sliders-icon-original.png';
import II from './assets/info-icon-original.png';
import SI from './assets/wrench-icon-original.png';
import ArrowIcon from './assets/arrow-circle-up-icon-White.png';
import ListIcon from './assets/list-icon.png';
import DownloadFile from './assets/download_file.png';
import UploadFile from './assets/Upload_file.png';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  const [isViewOpen1, setIsViewOpen1] = useState(false);
  const [isViewOpen2, setIsViewOpen2] = useState(false);
  const navigation = useNavigation();

  const toggleView1 = () => {
    setIsViewOpen1(!isViewOpen1);
  };

  const toggleView2 = () => {
    setIsViewOpen2(!isViewOpen2);
  };

  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center' }}>
        <TouchableOpacity style={styles.button} onPress={toggleView1}>
          <Text style={styles.buttonText}>File Management</Text>
          <Image source={ArrowIcon} style={styles.arrowIcon} />
        </TouchableOpacity>
        {isViewOpen1 && (
          <View style={styles.subView}>


            <TouchableOpacity style={styles.filemngTO} onPress={() => navigation.navigate('ListofProjects',{})}>
              <Image source={ListIcon} style={styles.iconfileMng}/>
              <Text>List of Projects</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.filemngTO} onPress={() => navigation.navigate('Connectivity',{})}>
              <Image source={DownloadFile} style={styles.iconfileMng}/>
              <Text>Download Data</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.filemngTO} onPress={() => navigation.navigate('UploadFile',{})}>
              <Image source={UploadFile} style={styles.iconfileMng}/>
              <Text>Upload Data</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      
      <View style={{ alignItems: 'center' }}>
        <TouchableOpacity style={styles.button} onPress={toggleView2}>
          <Text style={styles.buttonText}>BMI</Text>
          <Image source={ArrowIcon} style={styles.arrowIcon} />
        </TouchableOpacity>
        {isViewOpen2 && (
          <View style={styles.openedView}>
            <Text>BMI view is open </Text>
          </View>
        )}
      </View>
  
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
        <CustomBottomNavigation HI={HI} PI={PI} II={II} SI={SI} OC={0} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    borderWidth: 1,
    borderColor: 'red',
    justifyContent: 'flex-end'
  },
  buttonText: {
    color: 'white',
  },
  button: {
    width: width * 0.9,
    justifyContent: 'space-between',
    marginTop: 15,
    backgroundColor: '#92d050',
    padding: 10,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 5,
    flexDirection: 'row', // Add flexDirection to place text and image horizontally
  },
  arrowIcon: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
  openedView: {
    padding: 10,
    margin: 10,
  },
  iconfileMng:{
    width:20,
    height:20,
    marginRight:15,
  },
  filemngTO:{
    flexDirection: 'row',
    marginTop:15   
     
  },
  subView:{
    width: width * 0.8,
    justifyContent:'flex-start',
    margin:10,
  }
});

export default HomeScreen;
