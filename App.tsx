import React, { useEffect, useState, useRef } from "react";
import { requestForegroundPermissionsAsync, getCurrentPositionAsync, LocationObject, watchPositionAsync, LocationAccuracy } from "expo-location"
import { View, TouchableOpacity, Text, Image } from "react-native";
import { styles } from "./styles"
import MapView, { Marker } from "react-native-maps";
import { Modalize } from "react-native-modalize"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { AlwaysOpen } from "./src/components/modals/AlwaysOpen";


export default function App() {

  const [location, setLocation] = useState<LocationObject | null>(null);

  const mapRef = useRef<MapView>(null);

  async function requestLocationPermissionsAsync() {
    const { granted } = await requestForegroundPermissionsAsync();
    if (granted) {
      const currentPosition = await getCurrentPositionAsync();
      setLocation(currentPosition);

    }
  }


  useEffect(() => {
    requestLocationPermissionsAsync();
  }, [])

  useEffect(() => {
    watchPositionAsync({
      accuracy: LocationAccuracy.Highest,
      timeInterval: 1000,
      distanceInterval: 1
    }, (response) => {
      setLocation(response);
      mapRef.current?.animateCamera({
        // pitch: 70,
        center: response.coords,
      })

    })
  }, [])

  const modalizeRef = useRef<Modalize>(null);
  function onOpen() {
    modalizeRef.current?.open();
  }
  return (
    <GestureHandlerRootView style={styles.container}>


      {
        location &&
        <MapView style={styles.map}
          ref={mapRef}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005
          }}
        >

          <Marker coordinate={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }} />

        </MapView>
      }




      <AlwaysOpen />

    </GestureHandlerRootView>
  );


}


