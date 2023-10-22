import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

const DownloadService = () => {
  return (
    <View>
      <View style={styles.topContainer}>
        <TouchableOpacity style={styles.touchableOpacity}>
          <Text style={styles.text}>filter change [h]</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.touchableOpacity}>
          <Text style={styles.text}>wrong filter degree counter</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.touchableOpacity}>
          <Text style={styles.text}>filter reset counter [qty]</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.topContainer}>
        <TouchableOpacity style={styles.touchableOpacity}>
          <Text style={styles.text}>Motor run time [days]</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DownloadService;

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 12,
  },
  touchableOpacity: {
    borderWidth: 2,
    borderColor: 'red',
    paddingVertical: 6,
    paddingHorizontal: 12,
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    borderRadius: 6,
    backgroundColor: 'orange',
  },
  text: {fontSize: 14, fontWeight: '500', color: 'black'},
});
