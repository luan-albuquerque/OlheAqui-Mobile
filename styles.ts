import { Dimensions, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  text_apresentation: {
    color: "#82AD7F",
    fontFamily: "Syncopate",
    fotStyle: "normal",
    
  },

  title_apresentation: {
    color: "#82AD7F",
    fontFamily: "Syncopate",
    fotStyle: "normal",
    fontSize: 25
    
  },
  view_apresentation: {
    display: "flex",
    width: "auto" ,
    height: "auto",
    padding: 10,
    position: "absolute",
    zIndex: 2
  },
  fundo: {
    zIndex: 1
  },
  botao: {
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 7
  },
  container: {
    flex: 1,
    backgroundColor: "#3BADBD",
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: Dimensions.get("window").width,
    maxHeight: Dimensions.get("window").height,
  },

  map: {
    flex: 1,
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