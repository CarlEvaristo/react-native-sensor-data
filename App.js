import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import {Dimensions} from 'react-native';  

// MAGNETOMETER OBV VALUE (MIDDLE OF STRING) MEEST SUCCESVOL?

export default function Compass() {
  const [count, setCount] = React.useState(0)
  const [isSlow, setIsSlow] = React.useState(false)
  const [time, setTime] = React.useState([Date.now(), Date.now()])
  const [previousData, setPreviousData] = React.useState([])

  const [data, setData] = useState({
    x:0,
    y:0,
    z:0,
  });

  const [subscription, setSubscription] = useState(null);

  const _subscribe = () => {
    Accelerometer.setUpdateInterval(20);

    setSubscription(
      Accelerometer.addListener(result => setData(result)),
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
    console.log(data.x, data.y, data.z)
    const xLength = data.x.toString().length
    const yLength = data.y.toString().length
    const zLength = data.z.toString().length

    if (xLength > 10 && yLength > 10 && zLength > 10) { 
      
      let randNum = (data.x / data.y / data.z)

      if (!previousData.includes(randNum)) {
        console.log("RANDNUM ", randNum)
        setPreviousData(prev2 => [...prev2, randNum])

        const randNumShort = randNum.toString().at(-11)
        console.log(randNumShort)
        
        if (randNumShort < 5) {
          setCount(prev => prev - 1)
        } else {
          setCount(prev => prev + 1)
        }
      }
    }
  },[data])

  useEffect(()=>{
    if ((time[1] - time[0]) > 500) {
      setIsSlow(true)
    }
    if ((time[1] - time[0]) < 10) {
      setIsSlow(false)
    }
  }, [time])

  useEffect(()=>{
    setTime(prev => [prev[1], Date.now()])
  }, [previousData])

  
  return (
    <View style={styles.main}>
      <Text style={styles.text}>Accelerometer:</Text>
      <Text style={styles.text}>Difference: {count}</Text>
      <Text style={styles.text}>array length: {previousData.length}</Text>
      <Text style={styles.text}>{isSlow ? "MOVE PHONE!!" : "yes"}</Text>

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