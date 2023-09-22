import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import React from 'react';

export const SearchAddress = (props) => {
    console.log(JSON.stringify(props));

    return (


        <View style={s.container_modal}>
            <View style={s.local}><Text>Local</Text></View>
            <View style={s.container_list}>
                {
                    props.data.features.map((dev) => (
                        <View style={s.row_location}>
                            <View>
                                <Image
                                    style={s.stretch}
                                    source={{ uri: "https://avatars.githubusercontent.com/u/51758832?v=4&s=120" }}
                                    height={56}
                                    width={56}
                                />
                            </View>
                            <View >
                                <Text>{dev.text_pt}</Text>
                                <Text>{dev.place_name_pt}</Text>
                            </View>
                        </View>
                    ))
                }
            </View>
        </View>

    );

}

const s = StyleSheet.create({
    container_modal: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    container_list:{
       padding:12,
       gap:5,
    },
    local: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: "row",
        backgroundColor: '#fff000',
        padding: 5,
        width: Dimensions.get("window").width,
    },

    row_location: {
        padding: 10,
        flex:1, 
        justifyContent:'space-between',
        flexDirection: "row",
        gap:7,
        backgroundColor: '#ffff00',
        borderRadius:13,
        
    }
    
})



