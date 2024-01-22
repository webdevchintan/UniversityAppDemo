// HomeScreen.tsx

import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ActivityIndicator, FlatList, Linking, Pressable } from 'react-native';
import Colors from '../theme/colors'; // Import color palette
import { StackNavigationProp } from '@react-navigation/stack';
import { CustomText } from '../components';
import { getAPI, getLocalData } from '../utils/helper';
import { BASE_URL } from '../utils/constant';

type HomeNavigationProp = StackNavigationProp<MainTabsParamList, 'Home'>;
type Courses = {
    id: string;
    name: string;
};

interface HomeScreenProps {
    navigation: HomeNavigationProp; // Adjust the type as needed
}

// HomeScreen functional component
const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {

    const handleContinue = () => {
        // navigation.navigate(''); // Navigate to the next screen
    };

    // Function to navigate to the website
    const goToWebsite = () => {
        Linking.openURL('https://google.com');
    }

    // State hooks for loading status and courses data
    const [isLoading, setLoading] = useState(false);
    const [data, setData] = useState<Courses[]>([]);

    // Function to fetch courses data from API
    const getCourses = async () => {
        const universityName = await getLocalData('universityName');
        try {
            const response = await getAPI({ apiUrl: `${BASE_URL}/${universityName}/depts` });
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
        setTimeout(() => {
            getCourses();
        }, 3000);
    }, []);

    const handleOnItemPress = (id: string) => {
        alert(id)
        // navigation.navigate(''); // Navigate to the next screen with the course id
    }

    // Function to render each item in the list
    const renderItem = ({ item }: { item: Courses }) => {
        return (
            <Pressable style={styles.itemBlock} onPress={() => handleOnItemPress(item.id)}>
                <CustomText textStyle={styles.itemText} content={item.name} />
            </Pressable>
        )
    }
    // Main render function for HomeScreen
    return (
        <View style={styles.container}>
            <CustomText 
                fontSize={24} 
                fontWeight='bold' 
                content="Welcome Patel" 
            />
            <TouchableOpacity onPress={goToWebsite}>
            <CustomText 
                fontSize={16} 
                color={Colors.green} 
                content="Click here to Go to Website" 
            />
            </TouchableOpacity>
            <View style={styles.listBlock}>
                {isLoading ? (
                    <ActivityIndicator />
                ) : (
                    <FlatList
                        data={data}
                        keyExtractor={({ id }) => id}
                        renderItem={renderItem}
                        numColumns={3}
                    />
                )}
            </View>
        </View>
    );
};

// Styles for the HomeScreen components
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: Colors.white,
        paddingTop: 20
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    itemBlock: {
        borderWidth: 1,
        borderRadius: 10,
        width: 100,
        margin: 10,
        justifyContent: 'center',
        height: 70
    },
    itemText: {
        textAlign: 'center'
    },
    listBlock: {
        flex: 1,
        padding: 24
    }
});

export { HomeScreen };
