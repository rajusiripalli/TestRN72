import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, FlatList, Dimensions, Keyboard, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import moment from 'moment';

const primaryColor = "#d26c22"
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const App = () => {
  const [searchtxt, setSerchTxt] = useState('');

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  

  const fetchData = async () => {
    setLoading(true);
    const resp = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${searchtxt}&appid=8f75a50dccbf59f8791a51d7bc790c7e`);
    const data = await resp.json();
    setData([]);
    Keyboard.dismiss()
    console.log("search api city data response status", resp.status);

    setLoading(false);
    if(resp.status === 200){
      setData(data.list);
    }else{
      alert('enter valid city name')
    }
    
  };
  const sumbitsearch = () => {
    if(!searchtxt){
      alert('enter city')
      return
    }
    fetchData();

  }


  const Item = ({item}) => {
    console.log("flatlist item data", data)
    return (
      <View style={styles.tblcontnr}>
      <View style={styles.tblheadr}>
            <Text style={styles.tblhdrtxt}>Date: {moment(item?.dt_txt).format('DD/MM/YYYY')}</Text>
      </View>
      <View style={[styles.tblheadr, {backgroundColor: '#cdcdcc'}]}>
            <Text style={[styles.tblhdrtxt, ]}>Temperature</Text>
      </View>
      <View style={styles.tblclmn}>
        <View style={styles.clmnbx}>
            <Text style={[styles.tblhdrtxt, ]}>Min</Text>
        </View>
        <View style={styles.verticln}/>
        <View style={styles.clmnbx}>
        <Text style={[styles.tblhdrtxt, ]}>Max</Text>
        </View>
      </View>
      <View style={styles.tblclmn}>
        <View style={styles.clmnbx}>
            <Text style={[styles.tblhdrtxt, ]}>{item?.main?.temp_min}</Text>
        </View>
        <View style={styles.verticln}/>
        <View style={styles.clmnbx}>
        <Text style={[styles.tblhdrtxt, ]}>{item?.main?.temp_max}</Text>
        </View>
      </View>
      <View style={[styles.tblclmn]}>
        <View style={[styles.clmnbx, {backgroundColor:'transparent'}]}>
            <Text style={[styles.tblhdrtxt, ]}>Pressure</Text>
        </View>
        <View style={styles.verticln}/>
        <View style={[styles.clmnbx, {backgroundColor:'transparent'}]}>
        <Text style={[styles.tblhdrtxt, ]}>{item?.main?.pressure}</Text>
        </View>
      </View>
      <View style={[styles.tblclmn, {borderBottomWidth: 0}]}>
        <View style={[styles.clmnbx, {backgroundColor:'transparent',}]}>
            <Text style={[styles.tblhdrtxt, ]}>Humidity</Text>
        </View>
        <View style={styles.verticln}/>
        <View style={[styles.clmnbx, {backgroundColor:'transparent'}]}>
        <Text style={[styles.tblhdrtxt, ]}>{item?.main?.humidity}</Text>
        </View>
      </View>
  </View>
  )}

  return (
    <SafeAreaView style={{flex: 1}}>
    <View style={styles.container}>
          <View style={{height: 40}} />
        <Text style={{fontSize: 40, fontWeight: 'bold', lineHeight: 42, color: primaryColor, alignSelf:'center'}}>Weather in Your City</Text>

      <TextInput 
        placeholder='Search'
        value={searchtxt}
        onChangeText={(txt) => setSerchTxt(txt)}
        style={styles.input}
      />
        
      <TouchableOpacity style={styles.cstmbtn} onPress={sumbitsearch} disabled={loading}>
        {loading ?     <ActivityIndicator size="large" color="#0000ff" />
:<Text style={{fontSize: 22, fontWeight: 'bold',color: 'white'}}>Search</Text>}
      </TouchableOpacity>


      <FlatList
        data={data}
        renderItem={({item}) => <Item item={item} />}
        keyExtractor={(item, index) => index}
      />


     

    </View>
    </SafeAreaView>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 55,
    borderBottomWidth: 1,
    borderColor: 'grey',
    borderRadius: 5,
    marginBottom: 20,
  },
  input:{
    height: 55,
    borderWidth: 1,
    borderColor: primaryColor,
    borderRadius: 5,
    paddingHorizontal: 20,
    marginHorizontal: 45,
    marginTop: 20,
    borderRadius: 9,
    fontSize: 18,
    fontWeight:'900',
    color:'black'
  },
  cstmbtn: {
    height: 55,
    width: 150,
    justifyContent:'center',
    alignItems:"center",
    borderRadius: 5,
    backgroundColor: primaryColor,
    marginTop: 30,
    marginBottom: 20,
    alignSelf:'center'

  },
  tblcontnr: {
      borderColor:'black',
      borderWidth: 1.5,
      marginHorizontal: 40,
      marginVertical: 10,
      height: windowHeight /2.5
  },
  tblheadr: {
      height: 45,
      borderBottomColor: 'black',
      borderBottomWidth: 1,
      justifyContent:'center',
      alignItems:"center",
      backgroundColor: "#ff6600",

  },
  tblhdrtxt: {
      fontSize: 22,
      fontWeight: 'bold',
      color: 'black',
      
  },
  tblclmn: {
    height: 45,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    flexDirection: 'row',


  },
  clmnbx: {
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#cdcdcc',
    justifyContent:'center',
    alignItems:'center'
  },
  verticln: {
    height: '100%',
    borderColor:'black',
    borderWidth: 1
  }
  
})