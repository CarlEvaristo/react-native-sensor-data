import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Magnetometer } from 'expo-sensors';
import {Dimensions} from 'react-native';  

// MAGNETOMETER OBV VALUE (MIDDLE OF STRING) MEEST SUCCESVOL?

export default function Compass() {
  const [even, setEven] = React.useState(0)
  const [unEven, setUneven] = React.useState(0)

  const [data, setData] = useState(0);
  const [subscription, setSubscription] = useState(null);

  const _subscribe = () => {
    setSubscription(
      Magnetometer.addListener(result => {

        const xLength = result.x.toString().length
        const yLength = result.y.toString().length
        const zLength = result.z.toString().length

        if (xLength > 10 && yLength > 10 && zLength > 10) {
          const x = parseFloat(result.x.toString().at(-5))
          const y = parseFloat(result.y.toString().at(-5))
          const z = parseFloat(result.z.toString().at(-5))
          const rn = (x + y + z).toString().at(-1)
          console.log(rn)
          setData(rn)
        }
      })
    );
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);

  useEffect(() => {
    if (data % 2 !== 0) {
      setUneven(prev => prev + 1)
    } 
    if (data % 2 === 0) {
      setEven(prev => prev + 1)
    }

    console.log(even + " - " + unEven)
  },[data])


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