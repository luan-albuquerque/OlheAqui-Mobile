import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import React from 'react';

export const SearchAddress = (props) => {

    return (


        <View style={s.container_modal}>
            <View style={s.local}><Text style={{ color: '#868782' }}>Local</Text></View>
            <View style={s.container_list}>
                {
                    props.data.features.map((dev) => (
                        <View style={s.row_location}>
                            <View>
                                <Image
                                    style={s.stretch}
                                    source={require('./../../assets/local.png')}
                                    height={24}
                                    width={24}
                                />
                            </View>
                            <View >
                                <Text>{dev.text_pt}</Text>
                                <Text style={{
                                    color: "#868782", 
                                    textAlign: 'left', 
                                    alignItems: 'flex-start',
                                    justifyContent: 'flex-start',
                                   flex: 1
                                }}>{dev.place_name_pt.substring(dev.text_pt.length + 2)}</Text>
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
        backgroundColor: '#F7F7F6',
        alignItems: 'center',
        justifyContent: 'center'
    },
    container_list: {
        padding: 12,
        gap: 5,
        backgroundColor: '#F7F7F6',
        width: Dimensions.get("window").width,


    },
    local: {
        width: Dimensions.get("window").width,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: "row",
        backgroundColor: '#F7F7F6',
        padding: 7,
    },

    row_location: {
        padding: 10,
        flex: 1,
        flexDirection: "row",
        gap: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 13,

    },

    stretch: {
        width: 24,
        height: 24,
        padding: 5,

    }

})



