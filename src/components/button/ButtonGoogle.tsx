import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { IconGoogle, images } from '../../../styles.global';


interface IButtonGoogle {
  onPress?: any,
  name?: string
}

export const ButtonGoogle = ({ onPress, name }: IButtonGoogle) => (
  <TouchableOpacity style={s.button} onPress={onPress} activeOpacity={0.9}>
    <IconGoogle width={27} height={27} />
    <Text style={s.button__text}>{name}</Text>
  </TouchableOpacity>
);

const s = StyleSheet.create({
  button: {
    width: 144,
    height: 60,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    fontSize: 23,
    // top: 612.44,
    // left: 244.14,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    padding: 10,

  },

  stretch_google: {
    width: 27,
    height: 27,
  },

  button__text: {
    color: '#9D9D9D',
    textAlign: 'center',
  },
});
