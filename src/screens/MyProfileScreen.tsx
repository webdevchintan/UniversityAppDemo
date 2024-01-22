import { StackNavigationProp } from "@react-navigation/stack";
import { useEffect, useState } from "react";
import { getAPI } from "../utils/helper";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import Colors from "../theme/colors";
import { CustomText } from "../components";

type ProfileNavigationProp = StackNavigationProp<MainTabsParamList, 'Profile'>;
type StudentData = {
    studentId: number;
    firstName: string;
    lastName:string;
    enrolled: string;
    status: string;
    iDCardNumber: number;
    imageURL: string
};

interface MyProfileScreenProps {
    navigation: ProfileNavigationProp; // Adjust the type as needed
}


const MyProfileScreen: React.FC<MyProfileScreenProps> = ({ navigation }) => {
     // State hooks for loading status and student data
     const [isLoading, setLoading] = useState(false);
     const [data, setData] = useState<StudentData>();
 
     // Function to fetch Student data from API
     const getStudentDetail = async () => {
         try {
             const response = await getAPI({ apiUrl: `https://eoys3eyg82d32mn.m.pipedream.net/` });
             setData(response);
         } catch (error) {
             console.error(error);
         } finally {
             setLoading(false);
         }
     };
 
     // Effect hook to initiate data fetching on component mount
     useEffect(() => {
         setLoading(true);
            getStudentDetail();
     }, []);
     if(!data) return <ActivityIndicator />
        return (
            <View style={styles.container}>
                    <View style={styles.cardBlock}>
                        <View style={styles.block1Style}>
                            <CustomText  content={data?.status} color={Colors.white} fontSize={18} fontWeight="bold"/>
                            <CustomText  content={data?.enrolled} color={Colors.white} fontSize={16} fontWeight="bold"/>
                        </View>
                        <Image source={{uri: data?.imageURL}} style={styles.imageStyle}/>
                        <View>
                            <CustomText  content={`${data.firstName} ${data.lastName}` } color={Colors.white} fontSize={24} fontWeight="bold"/>
                        </View>
                        <View style={styles.lastBlockStyle}>
                            <CustomText   content={`${data.status} * ${data.iDCardNumber}` } color={Colors.white} fontSize={14} fontWeight="bold"/>
                        </View>
                    </View>
            </View>
        );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-around',
      paddingHorizontal:20,
    //   alignItems: 'center',
      backgroundColor: Colors.white,
      paddingVertical:20
    },
    heading:{
        borderWidth:1,
        paddingVertical:5,
        paddingHorizontal:20
    },
    block1Style: {
        flexDirection:'row',
        justifyContent:'space-between'
    },
    cardBlock: {
        backgroundColor:Colors.cardBg, 
        borderRadius:10, 
        padding:10
    },
    imageStyle:{
        width:100,
        height:100,
        borderWidth:2,
        borderColor: Colors.white,
        borderRadius:50,
        marginVertical:20
    },
    lastBlockStyle:{
        marginTop:10,
        paddingBottom:20
    }
});
export {MyProfileScreen};