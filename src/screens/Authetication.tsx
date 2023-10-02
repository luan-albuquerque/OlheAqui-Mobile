import React from 'react';
import { View, SafeAreaView, Text } from 'react-native';
import { Fundo, LogoMaps } from '../../styles.global';
import { styles } from '../../styles';


export const LoginScreen: React.FC = () => {

  return (
    <SafeAreaView>
      <Fundo width="100%" height="100%" style={styles.fundo} preserveAspectRatio="xMinYMin slice">
      </Fundo>
      <View style={styles.view_apresentation}>
        <LogoMaps width={62} height={62} />
        <View>
          <Text style={styles.title_apresentation}>MAP Alerta</Text>
        </View>
        <View>
          <Text style={styles.text_apresentation}>Denuncie e Marque: Juntos vamos criar melhor comunidade bem informada!</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};



