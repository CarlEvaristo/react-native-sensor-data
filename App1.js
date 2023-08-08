import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {Dimensions} from 'react-native';  
import { Barometer } from 'expo-sensors';
// BAROMETER OBV TIME DIFFERENCE
export default function App() {
  const [even, setEven] = React.useState(0)
  const [unEven, setUneven] = React.useState(0)

  const [date, setDate] = useState([Date.now(), Date.now()]);
  const [subscription, setSubscription] = useState(null);

  const subscribe = () => {
    setSubscription(Barometer.addListener(() => {
      setDate(prev => [prev[1], Date.now()])
    }));
  };

  const unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    subscribe();
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const rn = date[1] - date[0]
    let rnNew = rn.toString()[rn.toString().length - 1]
    rnNew = parseInt(rnNew)

    const evenNrs = [2, 4, 6, 8]
    const unevenNrs = [1, 3, 5, 7] 

    if (unevenNrs.includes(rnNew)) {
      setUneven(prev => prev + 1)
    } 
    if (evenNrs.includes(rnNew)) {
      setEven(prev1 => prev1 + 1)
    }
    console.log(even + " - " + unEven)
  },[date])


  return (
    <View style={styles.main}>
      {/* <Text style={styles.text}>Magnetometer:</Text>
      <Text style={styles.text}>x: {data.x}</Text>
      <Text style={styles.text}>y: {data.y}</Text>
      <Text style={styles.text}>z: {data.z}</Text> */}
    </View>
  );
}


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  main: {
    width: windowWidth,
    height: windowHeight,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: "white",
    margin: 50,
  },
  text: {
    fontSize: 30,
  }
})