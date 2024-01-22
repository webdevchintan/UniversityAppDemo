import { View, StyleSheet, TouchableOpacity, Linking } from "react-native";
import { CustomText } from "../components";
import { StackNavigationProp } from "@react-navigation/stack";
import Colors from "../theme/colors";


type HomeNavigationProp = StackNavigationProp<MainTabsParamList, 'Settings'>;

interface SettingScreenProps {
    navigation: HomeNavigationProp; // Adjust the type as needed
}

const SettingScreen: React.FC<SettingScreenProps> = ({ navigation }) => {

const handleOnPress = () => {

    Linking.openURL('https://www.agileprofessional.co.uk/privacy-policy/');

}
return (
    <View style={styles.container}>
        <CustomText content="Settings"  fontSize={24} fontWeight="bold" textStyle={styles.heading}/>

        <View style={styles.settingBlock}>
            <CustomText content="UoB Mobile"  fontSize={16} fontWeight="bold" textStyle={styles.settingItem}/>
            <CustomText content="Version 1.14"  fontSize={16} fontWeight="bold" textStyle={styles.settingItem}/>
            <TouchableOpacity><CustomText content="Report a Problem"  fontSize={16} fontWeight="bold" textStyle={styles.settingItem}/></TouchableOpacity>
            <TouchableOpacity onPress={handleOnPress}><CustomText content="Terms and Conditions"  fontSize={16} fontWeight="bold" textStyle={styles.settingItem}/></TouchableOpacity>
        </View>
    </View>
);
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: Colors.white,
      paddingVertical:20
    },
    heading:{
        borderWidth:1,
        paddingVertical:5,
        paddingHorizontal:20
    },
    settingBlock:{
        flex: 0.8,
    },
    settingItem:{
        marginVertical:5
    }
});
export { SettingScreen };