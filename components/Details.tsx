import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {decrement, increment} from '../Redux/BookMarkSlice';
import {RootState} from '../Redux/store';
import axios from 'axios';
// @ts-ignore
import {Rating} from 'react-native-stock-star-rating';

interface Books {
  title: string;
  subtitle: string;
  isbn13: string;
  price: string;
  image: string;
  url: string;
  year: string;
  rating: string;
  language: string;
  authors: string;
  publisher: string;
  pages: string;
  desc: string;
}

function Details({route}: {route: any}) {
  const {el} = route.params;
  let toggle = false;
  const books = useSelector((state: RootState) => state.counter.bookMark);

  const [book, setBook] = useState<Books>({
    title: '',
    subtitle: '',
    isbn13: '',
    price: '',
    image: '',
    url: '',
    year: '',
    rating: '',
    language: '',
    authors: '',
    publisher: '',
    pages: '',
    desc: '',
  });
  useEffect(() => {
    axios
      .get(`https://api.itbook.store/1.0/books/${el.isbn13}`)
      .then(response => {
        const data = response.data;

        if (data) {
          setBook(data);
        }
      });
  }, []);

  const dispatch = useDispatch();

  return (
    <>
      {book.title == '' && (
        <View style={{justifyContent:'center',flex:1,}}>
          
          
          <ActivityIndicator size="large" color={'crimson'}/>
          
        </View>
      )}
      {book.title !== '' && (
        <ScrollView style={styles.mainView}>
          <View
            style={{
              justifyContent: 'center',
              width: '100%',
              alignItems: 'center',
              rowGap: 4,
            }}>
            <Text style={{fontSize: 20, color: 'white'}}>{book.title}</Text>
            <Text style={{fontSize: 20, color: 'white'}}>
              Author : {book.authors}
            </Text>
            <Text style={{fontSize: 20, color: 'white'}}>
              Publisher : {book.publisher}
            </Text>
          </View>
          <View>
            <Image
              source={{uri: book.image}}
              style={{height: 300, marginTop: 20, position: 'relative'}}
            />
            {books.map((el: any) => {
              if (el.title === book.title) {
                toggle = true;
                return toggle;
              }
            })}
            {toggle && (
              <TouchableOpacity
                style={{position: 'absolute', top: 16, right: 59}}
                onPress={() => dispatch(decrement(el))}>
                <Image
                  source={require('Library/bookmark-svgrepo-com.png')}
                  style={{
                    height: 50,
                    width: 35,
                  }}
                />
              </TouchableOpacity>
            )}
          </View>
          <View
            style={{
              justifyContent: 'center',
              width: '100%',
              alignItems: 'center',
              marginBottom: 20,
              marginTop: 20,
            }}>
            <Text style={{color: 'white', fontSize: 20}}>
              Price : {book.price}
            </Text>
            <Text style={{fontSize: 20, color: 'white'}}>
              Published Year : {book.year}
            </Text>
            <Text style={{fontSize: 20, color: 'white'}}>
              Language : {book.language}
            </Text>
            <View style={{alignItems: 'center', flexDirection: 'row'}}>
              <Text style={{fontSize: 20, color: 'white'}}>Rating :</Text>
              <Text style={{fontSize: 20, color: 'white'}}>
                <Rating rating={Number(book.rating)} stars={book.rating} />
              </Text>
            </View>
          </View>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: 'white',
              shadowColor: 'black',
            }}></View>
          <View style={{height: '100%', padding: 10}}>
            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>
              Description :{' '}
            </Text>
            <View>
              <Text style={{fontSize: 20, color: 'white'}}>
                {book.subtitle}
              </Text>
              <Text style={{fontSize: 20, color: 'white'}}>{book.desc}</Text>
            </View>
            <View
              style={{
                width: '100%',
                columnGap: 5,
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 20,
              }}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#14a0dc',
                  width: 170,
                  borderRadius: 40,
                  alignItems: 'center',
                }}
                onPress={() => dispatch(increment(el))}>
                <Text style={{color: 'white', padding: 13, height: 50}}>
                  Add to Bookmarks{' '}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: '#14dcb4',
                  width: 170,
                  height: 50,
                  borderRadius: 40,
                  alignItems: 'center',
                }}
                onPress={() => dispatch(decrement(el))}>
                <Text style={{color: 'white', padding: 8}}>
                  Remove from BookMarks
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  mainView: {
    flexDirection: 'column',
    justifyCenter: 'center',
    rowGap: 20,
    backgroundColor: 'crimson',
  },
});
export default Details;
