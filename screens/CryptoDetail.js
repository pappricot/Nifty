import React, {useContext, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {COLORS, SIZES, FONTS} from '../constants';
import {VictoryLine, VictoryChart} from 'victory-native';

import {MyGlobalContext} from '../context';

/// <summary>This class represents the blka bla</summary>
const CryptoDetail = ({navigation}) => {
  const {user, createTransaction, balanceHistory} = useContext(MyGlobalContext);
  const {handleSubmit, control} = useForm();
  const [theme, switchTheme] = useState(true)

  const onSubmit = data => {
    console.log('transaction send', data);
    createTransaction({
      ...data,
    });
  };

  const onSwitch = () => {
    console.log("theme", theme)
    switchTheme(!theme)
  }

  return (
    <ImageBackground
      source={theme ? require('../assets/images/whitecloth.jpeg') : require('../assets/images/nailquag.jpeg')}
      resizeMode="stretch"
      style={styles.backgroundImg}>
      <SafeAreaView style={styles.container}>
        <View style={[styles.info, styles.shadow]}>
          <Text style={{color: COLORS.black, ...FONTS.h3}}>
            ACCOUNT BALANCE
          </Text>
          <View style={styles.header2}>
            <Text style={{color: COLORS.black, ...FONTS.h1}}>
              JB {user?.balance}
            </Text>
            <TouchableOpacity style={styles.themeWrapper} onPress={() => onSwitch()}>
              <Text style={styles.themeText}>Change theme</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.section, styles.shadow]}>
          <Text style={{color: COLORS.black, ...FONTS.h3}}>Send Jobcoins</Text>
          <Controller
            control={control}
            name="fromAddress"
            render={({field: {onChange, value}}) => (
              <TextInput
                style={styles.textInput}
                onChangeText={v => onChange(v)}
                value={value}
                placeholder="From Address"
              />
            )}
            rules={{
              required: {
                value: true,
                message: 'Field is required!',
              },
            }}
          />
          <Controller
            control={control}
            name="toAddress"
            render={({field: {onChange, value}}) => (
              <TextInput
                style={styles.textInput}
                onChangeText={v => onChange(v)}
                value={value}
                placeholder="To Address"
              />
            )}
            rules={{
              required: {
                value: true,
                message: 'Field is required!',
              },
            }}
          />
          <Controller
            control={control}
            name="amount"
            render={({field: {onChange, value}}) => (
              <TextInput
                style={styles.textInput}
                onChangeText={v => onChange(v)}
                value={value}
                placeholder="Amount"
              />
            )}
            rules={{
              required: {
                value: true,
                message: 'Field is required!',
              },
            }}
          />
          <TouchableOpacity onPress={handleSubmit(onSubmit)}>
            <Text style={{color: COLORS.black, ...FONTS.h3}}>Send</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.section, styles.shadow]}>
          <Text style={{color: COLORS.black, ...FONTS.h3}}>
            Balance History
          </Text>
          <View>
            <VictoryChart height={220} width={SIZES.width - 40}>
              <VictoryLine animate data={balanceHistory} x="y" y="x" />
            </VictoryChart>
          </View>
        </View>

        <View style={[styles.signout, styles.shadow]}>
          <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
            <Text style={{color: COLORS.black, ...FONTS.h3}}>Sign out</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
  section: {
    flex: 2,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    width: '80%',
    marginVertical: 20,
    paddingVertical: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    width: '90%',
    height: 100,
  },
  signout: {
    flex: 1,
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
  header2: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10
  },
  themeWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: COLORS.gray,
    borderRadius: 30,
    borderWidth: 1,
    paddingHorizontal: 10
  }
});

export default CryptoDetail;
