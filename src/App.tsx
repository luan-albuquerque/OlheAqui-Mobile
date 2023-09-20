import React, { useEffect, useState } from "react";
import { Alert, Linking, Text, View, StyleSheet, Dimensions, Button, TextInput } from "react-native";
import MapView, {
  Callout,
  Marker,
  PROVIDER_GOOGLE,
  Region,
} from "react-native-maps";
// import { FontAwesome } from "@expo/vector-icons";
import * as Location from "expo-location";
import { fetchUserGithub, fetchLocalMapBox } from "./api";

interface Dev {
  id: number;
  avatar_url: string;
  name: string;
  bio: string;
  login: string;
  location: string;
  latitude?: number;
  longitude?: number;
  html_url: string;
}

const initialRegion = {
  latitude: -3.10719,
  longitude: -60.0261,
  latitudeDelta: 100,
  longitudeDelta: 100,
};

export default function App() {
  const [devs, setDevs] = useState<Dev[]>([]);
  const [username, setUsername] = useState("");
  const [region, setRegion] = useState<Region>();

  const getCurrentPosition = async () => {
    let { status } = await Location.requestPermissionsAsync();

    if (status !== "granted") {
      Alert.alert("Ops!", "Permissão de acesso a localização negada.");
    }

    let {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync();

    setRegion({ latitude, longitude, latitudeDelta: 0, longitudeDelta: 0 });
  };

  useEffect(() => {
    getCurrentPosition();
  }, []);

  function handleOpenGithub(url: string) {
    Linking.openURL(url);
  }

  async function handleSearchUser() {
    let dev: Dev;

    if (!username) return;

    const githubUser = await fetchUserGithub(username);

    if (!githubUser || !githubUser.location) {
      Alert.alert(
        "Ops!",
        "Usuário não encontrado ou não tem a localização definida no Github"
      );
      return;
    }

    const localMapBox = await fetchLocalMapBox(githubUser.location);

    if (!localMapBox || !localMapBox.features[0].center) {
      Alert.alert(
        "Ops!",
        "Erro ao converter a localidade do usuário em coordenadas geográficas!"
      );
      return;
    }

    const [longitude, latitude] = localMapBox.features[0].center;

    dev = {
      ...githubUser,
      latitude,
      longitude,
    };

    setRegion({
      latitude,
      longitude,
      latitudeDelta: 3,
      longitudeDelta: 3,
    });

    const devAlreadyExists = dev && devs.find((user) => user.id === dev.id);

    if (devAlreadyExists) return;

    setDevs([...devs, dev]);
    setUsername("");
  }



  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={region}
        initialRegion={initialRegion}
      >
        {devs.map((dev) => (
          <Marker
            key={dev.id}
            image={{ uri: `${dev.avatar_url}&s=120` }}
            calloutAnchor={{
              x: 2.9,
              y: 0.8,
            }}
            coordinate={{
              latitude: Number(dev.latitude),
              longitude: Number(dev.longitude),
            }}
          >
            <Callout tooltip onPress={() => handleOpenGithub(dev.html_url)}>
              <View style={styles.calloutContainer}>
                <Text style={styles.calloutText}>{dev.name}</Text>
                <Text style={styles.calloutSmallText}>{dev.bio}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      <View style={styles.footer}>
        <TextInput
          placeholder={`${devs.length} Dev's encontrados`}
          style={styles.footerText}
          onChangeText={setUsername}
          value={username}
        />

        <Button
          onPress={handleSearchUser}
          title="Buscar"
          color="#841584"
        />

      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },

  calloutContainer: {
    width: 160,
    height: "100%",
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 16,
    justifyContent: "center",
  },

  calloutText: {
    color: "#0089a5",
    textDecorationLine: "underline",
    fontSize: 14,
  },

  calloutSmallText: {
    color: "#005555",
    fontSize: 10,
  },

  footer: {
    position: "absolute",
    left: 24,
    right: 24,
    bottom: 32,

    backgroundColor: "#fff",
    borderRadius: 20,
    height: 56,
    paddingLeft: 24,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    elevation: 3,
  },

  footerText: {
    width: 200,
    color: "#8fa7b3",
  },

  searchUserButton: {
    width: 56,
    height: 56,
    backgroundColor: "#0089a5",
    borderRadius: 20,

    justifyContent: "center",
    alignItems: "center",
  },
});