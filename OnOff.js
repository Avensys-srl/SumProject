import React, {useState} from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';

const OnOff = ({status}) => {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  return (
    <View style={styles.mainContainer}>
      <View>
        <View>
          <TouchableOpacity onPress={handleToggle} style={styles.container}>
            <View style={[styles.circle, isToggled && styles.circleActive]} />
          </TouchableOpacity>
        </View>
        <View
          style={styles.onOffStyle}>
          <Text>Off</Text>
          <Text>On</Text>
        </View>
      </View>
      <View>
        <Text style={styles.text}>{status}</Text>
      </View>
    </View>
  );
};

const circleSize = 30;
const containerWidth = circleSize * 4;

const styles = StyleSheet.create({
  mainContainer: {
    borderWidth: 2,
    borderColor: 'black',
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 30,
    borderRadius: 12,
    width: '93%',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: 'white',
    marginTop: 8
  },
  container: {
    height: circleSize,
    width: containerWidth,
    backgroundColor: 'white',
    borderRadius: circleSize / 2,
    justifyContent: 'center',
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'black',
  },
  circle: {
    height: circleSize,
    width: circleSize,
    borderRadius: circleSize / 2,
    backgroundColor: 'gray',
    borderWidth: 2,
    borderColor: 'black',
    position: 'absolute',
    left: 0,
  },
  circleActive: {
    left: containerWidth - circleSize,
    backgroundColor: 'green',
  },
  text: {
    fontSize: 18,
    marginLeft: 8,
    marginTop: -20
  },
  onOffStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  }
});

export default OnOff;


/**
 * return (
    <View style={styles.container}>
      {keys.length > 0 ? (
        <ScrollView>
          {keys.map(key => {
            if (['Location', 'Project', 'Apartment', 'Room'].includes(key)) {
              return null;
            }
            return (
              <View key={key} style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[
                    styles.touchable,
                    toggleState[key] ? styles.on : styles.off,
                  ]}
                  onPress={() => handleButtonPress(key)}
                >
                  <View style={styles.contentContainer}>
                    <Text>{key}</Text>
                    {contentVisible[key] && (
                      <Image
                        source={require('./assets/eye-slash-icon-red.png')}
                        style={styles.image}
                      />
                    )}
                  </View>
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>
      ) : (
        <Text style={styles.messageText}>Upload an Excel File</Text>
      )}
    </View>
  );
 */