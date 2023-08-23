import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Button,
  Image,
  LogBox,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {decrement} from '../Redux/BookMarkSlice';
import {RootState} from '../Redux/store';
import Search from './Search';
// import Search from './Search';

interface Product {
  title: string;
  subtitle: string;
  isbn13: string;
  price: string;
  image: string;
  url: string;
}

function HomeScreen({navigation}: {navigation: any}) {
  const [products, setProducts] = useState<Product[]>([]);

  
  let toggle2 = false;

  useEffect(() => {
    axios.get('https://api.itbook.store/1.0/new').then(response => {
      const data = response.data;
      if (data.books) {
        setProducts(data.books);
      }
    });
  }, []);
  
  const books = useSelector((state: RootState) => state.counter.bookMark);
  const dispatch = useDispatch();
  LogBox.ignoreLogs(["Warning: Each"])

  
  return (
    <ScrollView>
      <View>
        <View style={{width: '100%', backgroundColor: 'black'}}>
          <Image
            source={{
              uri: 'https://static.wixstatic.com/media/e385df_f27e08ae6a804d6eb6a31bcb0f59fec0~mv2.png/v1/fill/w_240,h_136,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/e385df_f27e08ae6a804d6eb6a31bcb0f59fec0~mv2.png',
            }}
            style={{height: 120, objectFit: 'contain'}}
          />
        </View>



        {/* <Button
          color="crimson"
          title="View Profile"
          onPress={() => navigation.navigate('Profile')}
        /> */}
        <View style={{position:'relative',zIndex:2,backgroundColor:'white',width:'100%'}}>
        <Search />
        </View>
         


        <View style={styles.view2}>
          {products.length == 0 && (
            <View style={{justifyContent: 'center',alignItems:'center', flex: 1}}>
              <ActivityIndicator size="large" color={'crimson'} />
            </View>
          )}
          {products.map((el: any) => {
            return (
              
              <View key={el.id} style={styles.cardView}>
                <View style={styles.bookImage}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Details', {el: el})}>
                    <View>
                      <Image
                        source={{uri: el.image}}
                        style={{
                          height: 250,
                          objectFit: 'cover',
                        }}
                      />
                    </View>
                    {books.map((element: any) => {
                      if (element.title === el.title) {
                        toggle2 = true;
                        return toggle2;
                      }
                    })}
                    {toggle2 && (
                      <TouchableOpacity
                        style={{position: 'absolute', top: 37, right: 20}}
                        onPress={() => dispatch(decrement(el))}>
                        <Image
                          source={require('Library/images/bookmark-svgrepo-com.png')}
                          style={{
                            height: 25,
                            width: 25,
                          }}
                        />
                      </TouchableOpacity>
                    )}
                    {(toggle2 = false)}
                  </TouchableOpacity>
                </View>
                <ScrollView>
                  <View style={styles.textView}>
                    <Text style={{color: 'white', fontSize: 15}}>
                      {el.title}
                    </Text>
                    <Text style={{color: 'white', marginTop: 4, height: 20}}>
                      {el.price}
                    </Text>
                  </View>
                </ScrollView>
              </View>
              
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  bookImage: {
    width: 178,
    height: 240,
    borderRadius: 10,
  },
  view2: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    alignItems: 'center',
    marginTop: 5,
  },
  imageView: {
    shadowColor: 'black',
  },
  cardView: {
    width: 168,
    height: 330,
    backgroundColor: 'crimson',
    margin: 5,
    alignItems: 'center',
    position: 'relative',
    borderRadius: 4,
    // shadowOffset: {width: -2, height: 4},
    // shadowColor: '#171717',
    // shadowOpacity: 0.2,
    // shadowRadius: 3,
  },
  textView: {
    overflow: 'hidden',
    backgroundColor: 'crimson',
    width: 155,
    height: 70,

    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
