import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Magnetometer } from 'expo-sensors';
import {Dimensions} from 'react-native';  
// MAGNETOMETER OBV TIME DIFFERENCE
export default function Compass() {
  const [even, setEven] = React.useState(0)
  const [unEven, setUneven] = React.useState(0)

  const [date, setDate] = useState([Date.now(), Date.now()]);
  const [subscription, setSubscription] = useState(null);

  const _subscribe = () => {
    setSubscription(
      Magnetometer.addListener(result => {
        setDate(prev => [prev[1], Date.now()])

        // const xLength = result.x.toString().length
        // const yLength = result.y.toString().length
        // const zLength = result.z.toString().length

        // const xNew = result.x.toString()[xLength - data.z]
        // const yNew = result.y.toString()[yLength - data.y]
        // const zNew = result.z.toString()[zLength - data.x]

        // if (xLength > 15 && yLength > 15 && zLength > 15) {
          // console.log({
          //   x: result.x.toString()[xLength - 4],
          //   y: result.y.toString()[yLength - 4],
          //   z: result.z.toString()[zLength - 4],
          // });
        //   setData({
        //     x: result.x.toString()[xLength - 4],
        //     y: result.y.toString()[yLength - 4],
        //     z: result.z.toString()[zLength - 4],
        //   });
        // }
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
    const rn = date[1] - date[0]
    let rnNew = rn.toString()[rn.toString().length - 1]
    rnNew = parseInt(rnNew)

    const evenNrs = [2, 3, 4,]
    const unevenNrs =[5, 6, 7,] 

    if (rnNew % 2 !== 0) {
      setUneven(prev => prev + 1)
    } 
    if (rnNew % 2 === 0) {
      setEven(prev => prev + 1)
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