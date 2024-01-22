// IntroScreen.tsx

import React, { useState } from 'react';
import { View, Image, StyleSheet, FlatList, Pressable } from 'react-native';
import Colors from '../theme/colors'; // Import your color palette
import { CustomButton, CustomText } from '../components';
import { StackNavigationProp } from '@react-navigation/stack';
const UniversityLogo  = require('../assets/logo.jpeg'); // Adjust the path to your logo
import { CommonActions } from '@react-navigation/native';
import { storeLocalData } from '../utils/helper';
import { UNI_LIST } from '../utils/constant';

type IntoNavigationProp = StackNavigationProp<AppStackParamList, 'Intro'>;

interface IntroScreenProps {
  navigation: IntoNavigationProp; // Adjust the type as needed
}

type ItemProps = {title: string, id: string};

const IntroScreen: React.FC<IntroScreenProps> = ({ navigation }) => {
const [uniName, setUniName] = useState('');

  const handleContinue = () => {
    if(uniName !== ''){
    storeLocalData('universityName',uniName)
    // Navigate to the Main screen
    navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [
            { name: 'Main' },
          ],
        })
      );
    } else {
        alert('please select university to go further!')
    }
   
  };


const Item = ({id ,title}: ItemProps) => (
    <Pressable onPress={() => setUniName(id)} style={[styles.uniNameBlock,{backgroundColor:Colors[id as keyof typeof Colors], borderColor:id === uniName ? Colors.green : Colors.primary, borderWidth:id === uniName ? 4 : 1}]}>
      <CustomText fontSize={16} content={title} textStyle={styles.uniNameStyle} color={Colors.white}/>
    </Pressable>
  );
  

  return (
    <View style={styles.container}>
      <CustomText fontSize={24} fontWeight='bold' content='Welcome to Global University'/>
      <Image source={UniversityLogo} style={styles.logo} />

      <CustomText fontSize={14} fontWeight='500' content='Select University to Continue'/>
      <FlatList
        data={UNI_LIST}
        renderItem={({item}) => <Item title={item.title} id={item.id}/>}
        keyExtractor={item => item.id}
        numColumns={2}
      />
        <CustomButton 
            btnStyle={styles.button} 
            onPress={handleContinue}
            btnText='Continue'
            btnTextStyle={styles.buttonText}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingVertical:20
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  logo: {
    width: 400,
    height: 400,
    marginVertical: 30,
  },
  uniNameBlock: {
    marginTop:20,
    borderWidth:1, 
    height:50,
    width:180, 
    margin:5,
    justifyContent:'center',
    borderRadius:10,
  },
  uniNameStyle:{
    textAlign:'center'
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 15,
    paddingHorizontal:50,
    borderRadius: 10,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export {IntroScreen};
