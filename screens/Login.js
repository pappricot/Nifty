import React, {useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  Alert,
  TouchableOpacity,
  ImageBackground
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTheme} from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form';
import {COLORS, FONTS} from '../constants';

import {MyGlobalContext} from '../context';

const LoginScreen = ({navigation}) => {
  const theme = useTheme();

  const {setCurrentAddress} = useContext(MyGlobalContext);
  const {handleSubmit, control} = useForm();

  const handleSignIn = async data => {
    if (data) {
      await AsyncStorage.setItem('address', data.address);
      setCurrentAddress(data?.address);
      navigation.navigate('CryptoDetail');
    } else {
      Alert.alert('Please enter your address');
    }
  };

  return (
    <ImageBackground
      source={require('../assets/images/whitecloth.jpeg')}
      resizeMode="stretch"
      style={styles.backgroundImg}>
      <View style={styles.container}>
        <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} />
        <Text style={{color: COLORS.black, ...FONTS.h1}}>Home Screen</Text>
        <Controller
          control={control}
          name="address"
          render={({field: {onChange, value}}) => (
            <TextInput
              style={styles.textInput}
              onChangeText={v => onChange(v)}
              value={value}
              placeholder="Address"
            />
          )}
          rules={{
            required: {
              value: true,
              message: 'Field is required!',
            },
          }}
        />
        <TouchableOpacity
          data-testid="useless-button"
          onPress={handleSubmit(handleSignIn)}>
          <Text style={{color: COLORS.black, ...FONTS.h3}}>Log In</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    width: '80%',
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 10,
    paddingVertical: 5,
    borderColor: COLORS.gray,
    textAlign: 'center',
  },
  backgroundImg: {flex: 1},
});
