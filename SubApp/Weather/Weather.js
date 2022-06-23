import { Text, View, StyleSheet, PermissionsAndroid } from 'react-native'
import React, { Component } from 'react'
import Geolocation from 'react-native-geolocation-service';
  
export class Weather extends Component {

state={
  lat: null,
  lon: null,
};

componentDidMount(){
  this.getLocation();
}
  getLocation= async ()=> {

const grandted= await PermissionsAndroid.request(
PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
);

if (grandted==PermissionsAndroid.RESULTS.GRANDTED) {
  Geolocation.getCurrentPosition(
    (position) => {
      console.log(position);
      this.setState({
        lat: position.coords.latitude,
        lan: position.coords.longitude,
      })
    },
    (error) => {
      // See error code charts below.
      console.log(error.code, error.message);
    },
    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
);
}

  };

getWeather=async ()=>{
if (this.state.lat!=null) {
  const response= await fetch(`https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}`)
}
};

  render() {
    return (
      <View 
      style={{
        flex:1,
        backgroundColor: 'white',
      }}>
        <Text style={styles.title}>Weather</Text>
      </View>
    )
  }
}


const styles = StyleSheet.create({
    title: {
        fontSize: 50,
    },
});