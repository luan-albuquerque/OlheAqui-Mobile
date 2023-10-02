import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Image, Text } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { ListAddress } from '../tables/ListAddress';
import { SearchLocalMapBox } from "../../api/MapBoxApi"
import { images } from '../../../styles.global';


export const ModalAddress: React.FC = () => {
  const modal = React.createRef<Modalize>();

  const closeModal = (dest: any) => {
    if (modal.current) {
      modal.current.close(dest);
    }
  };
  const [location, setLocation] = useState("");
  const [globalValue, setGlobalValue] = useState({ features: [] });

  const handleSearchUser = async () => {
    setGlobalValue(await SearchLocalMapBox(location));

  }


  return (
    <Modalize
      ref={modal}
      modalStyle={s.content__modal}
      alwaysOpen={85}
      handlePosition="inside"
    >
      <View style={s.content}>
        <View style={s.footer}>
          <TextInput
            placeholder="Pesquisar"
            style={s.footerText}
            onChangeText={setLocation}
            onChange={handleSearchUser}
          />

          <Image
            style={s.stretch}
            source={{ uri: images.profile }}
            height={56}
            width={56}
          />

        </View>
        <ListAddress data={globalValue} />

      </View>
    </Modalize>
  );
}


const s = StyleSheet.create({
  content: {
    padding: 20,
    gap: 20,
    backgroundColor: '#F7F7F6'
  },

  stretch: {
    borderRadius: 20,
    width: 56,
    height: 56,
  },


  footer: {

    backgroundColor: "#E9E9E9",
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


  content__modal: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.45,
    shadowRadius: 16,
  },

  content__subheading: {
    marginBottom: 2,

    fontSize: 16,
    fontWeight: '600',
    color: '#ccc',
  },

  content_serach_subheading: {
    marginBottom: 2,
    fontSize: 16,
    fontWeight: '600',
    color: '#ccc',
  },

  content__heading: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
  },

  content__description: {
    paddingTop: 10,
    paddingBottom: 10,

    fontSize: 15,
    fontWeight: '200',
    lineHeight: 22,
    color: '#666',
  },
});