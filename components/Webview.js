import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React from "react";
import WebView from "react-native-webview";
import { useWindowDimensions, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
export default function Webview({
  //  data, setdata, link, settitle, Title 
  }) {
  const navigation=useNavigation()
const route =useRoute()
  const html = `
    <html>
        <head>
            <title>Page Title</title>
            <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400&display=swap" rel="stylesheet">
            <style>
            * {
              overflow: scroll;
              font-family: 'Quicksand', sans-serif;
              color: rgba(255, 255, 255, 0.8);
              padding: 10px;
              font-size: 40px;
              margin: 15px 0px;
              box-sizing: border-box;
              line-height: 1.5;
              font-weight: 500;
              text-align: justify;
            }
            h1 {
              font-size: 1.7em;
              font-weight: 900;
            }
    
            h2 {
              font-size: 1.8em;
              font-weight: bold;
            }
    
            h3 {
              font-size: 1.6em;
              font-weight: bold;
            }
    
            h4 {
              font-size: 1.4em;
              font-weight: bold;
            }
    
            h5 {
              font-size: 1.2em;
              font-weight: bold;
            }
    
            h6 {
              font-size: 1em;
              font-weight: bold;
            }
    
            a {
              color: #0972d3;
              outline: 0;
              background-color: transparent;
              text-decoration: none;
            }

            iframe {
              width: 100%;
              height:30vh;
            }

            img {
              width: 100%;
              height: auto;
            }
    
            #contain {
              display: flex;
              flex-direction: column;
              margin: 0;
              padding: 0;
            }
    
            tr {
              display: inline-flex;
              flex-direction: column;
            }
    
            table {
              width: 100%;
              border-collapse: collapse;
              margin: 15px 0px;
            }
    
            table th,
            table td {
              border: 1px solid #fff;
              padding: 10px;
              text-align: left;
              font-size: 24px;
            }
    
            blockquote {
              font-size: 28px;
              font-style: italic;
              padding: 10px;
              margin: 15px 0px;
              border-left: 3px solid #fff;
            }
            #web_btn{
              height:100px;
              margin-top:40px;
              border-radius:20px;
              width:100%;
              background-color:#444;
              color:#fff;
              display:flex;
              justify-content:center;
              align-items:center;
            }
          </style>
        </head>
        <body>
          <div id="contain">
            <h1 style="text-align:left;line-height:1.4em">${route.params.title}</h1>
            ${route.params.data}
            <a href="${route.params.link}" id="web_btn">Website</a>
            </div>
            <script>
              function redirect(){
                window.location="${route.params.link}"
              }
            </script>
            </body>
            </html>
            `;
  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Home")
          }}
        >
          <Image
            source={require("../assets/back.png")}
            style={{ height: "80%", width: "5%", marginLeft: 20 }}
          />
        </TouchableOpacity>
      </View>
      <WebView
        style={{ backgroundColor: "#1a1b1f" }}
        originWhitelist={["*"]}
        source={{ html: html }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        automaticallyAdjustContentInsets={true}
        useWebKit={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  nav: {
    backgroundColor: "#1a1b1f",
    width: "100%",
    height: 48,
    display: "flex",
    justifyContent: "center",
  },
});
