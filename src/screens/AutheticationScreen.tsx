import React from 'react';
import { View, Text, Button } from 'react-native';
import { Fundo, LogoMaps } from '../../styles.global';
import { styles } from '../../styles';
import { ButtonGoogle } from '../components/button/ButtonGoogle';
import { useNavigation } from '@react-navigation/native';

interface ILoginScreen {
   navigation : any;
}

export const LoginScreen = ({ navigation }: ILoginScreen) => {

  return (
    <View>
      <Fundo width="100%" height="100%" style={styles.fundo} preserveAspectRatio="xMinYMin slice">
      </Fundo>
      <View style={styles.view_apresentation}>
        <View style={styles.container_absolute}>
          <View>
            <LogoMaps width={62} height={62} />
            <View>
              <Text style={styles.title_apresentation}>MAP Alerta</Text>
            </View>
            <View>
              <Text style={styles.text_apresentation}>Denuncie e Marque: Juntos vamos criar melhor comunidade bem informada!</Text>
            </View>
          </View>
          <View style={styles.button_start}>
            <ButtonGoogle name='Entrar' onPress={() => navigation.navigate('MapScreen')} />
          </View>
        </View>
      </View>
    </View>
  );
};



