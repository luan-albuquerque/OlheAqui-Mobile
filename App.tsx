import React, { useEffect, useState, useRef } from "react";
import { requestForegroundPermissionsAsync, getCurrentPositionAsync, LocationObject, watchPositionAsync, LocationAccuracy } from "expo-location"
import { styles } from "./styles"
import MapView, { Marker, Polygon, Circle} from "react-native-maps";
import { Modalize } from "react-native-modalize"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { AlwaysOpen } from "./src/components/modals/AlwaysOpen";
import { SearchLocalByLongAndLatMapBox } from "./src/api/MapBoxApi"
import * as geolib from 'geolib'

interface Teste {
  latitude: number, 
  longitude: number,
  radio: number,
}

export default function App() {

  const [location, setLocation] = useState<LocationObject | null>(null);
  const [markerCoords, setMarkerCoords] = useState<Teste>();
  const [markerCoordsCircle, setMarkerCoordsCicle] = useState<Teste>();
  const [region, setRegion] = useState();
  const [titleOnPress, settitleOnPress] = useState<string>("Local Clicado");
  
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


  const handleMapPress = (event: any) => {
    const { coordinate } = event.nativeEvent;
    setMarkerCoords(coordinate);
  };


  const setLocationOnPress = async (event: any) => {
    const { coordinate } = event.nativeEvent;
    const search = await SearchLocalByLongAndLatMapBox(coordinate.longitude, coordinate.latitude)
    settitleOnPress(search.features[0].place_name)

    const te = [
      { latitude:-3.0439293, longitude: -59.9253114 },
      { latitude: -3.0441272, longitude:-59.9243227 },
      { latitude: -3.0430551, longitude: -59.9238853 },
  ]

    const teste: Teste | any = geolib.getCenter(te);
    const limit = geolib.getBounds(te);

  console.log({limit});
  
  const t = geolib.getRhumbLineBearing(
    { latitude: limit.maxLat, longitude: limit.maxLng },
    { latitude: limit.minLat, longitude:limit.minLng }
);

  
  setMarkerCoordsCicle({ latitude: teste.latitude, longitude: teste.longitude, radio: t / 2  })
  };


  

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
          onPress={handleMapPress}
          region={region}
          zoomEnabled={true}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005
          }}
          minZoomLevel={17}
          showsUserLocation={true}
          loadingEnabled={true}
        >

          

          

          {markerCoords && (
            <Marker coordinate={markerCoords} title={titleOnPress}  onPress={setLocationOnPress}   />
          )}

          {markerCoordsCircle && (
            <Circle   
            center={{ latitude: markerCoordsCircle.latitude, longitude: markerCoordsCircle.longitude }}
            radius={markerCoordsCircle.radio}
            fillColor={'rgba(200, 300, 200, 0.5)'}
            />
          )}

        </MapView>
      }




      <AlwaysOpen />

    </GestureHandlerRootView>
  );


}


