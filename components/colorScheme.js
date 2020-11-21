import { Appearance, } from "react-native";
import {useState} from 'react'
// true == dark, false == light
let theme = true

const darkStyle = {
    PrimaryBackground: "black",
    SecondaryBackground: "#1a1a1c",
    ThirdBackground: "blue",
    SpecialBackground: "red",
    PrimaryText: "white",
    SecondaryText: "rgba(128,128,128,1)",
    ThirdText: "blue",
    SpecialText: "red",
}

// ugly
const lightStyle = {
    PrimaryBackground: "white",
    SecondaryBackground: "#1a1a1c",
    ThirdBackground: "blue",
    SpecialBackground: "red",
    PrimaryText: "black",
    SecondaryText: "rgba(128,128,128,1)",
    ThirdText: "blue",
    SpecialText: "red",
}

const CurrentTheme = theme ? darkStyle : lightStyle;

// const CurrentTheme = () => {
//     const [theme, setTheme] = useState(true); 
//     const colorScheme = Appearance.getColorScheme();
//     console.log(colorScheme);
//     setTheme(colorScheme)
//     return colorScheme === "dark" ? darkStyle : lightStyle;
// }

export {CurrentTheme};