import {useSelector, useDispatch} from 'react-redux';
import React from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {RootState} from '../Redux/store';
import {decrement} from '../Redux/BookMarkSlice';

function BookMarks() {
  const books = useSelector((state: RootState) => state.counter.bookMark);
  const dispatch = useDispatch();

  return (
    <ScrollView>
      {books.length == 0 && (
        <View style={{marginTop:200,alignItems:'center',alignContent:'center'}}>
          <Image
            source={require('Library/images/location-color-bookmark-add-svgrepo-com.png')}
            style={{width:200,height:200}}
          />
          <Text style={{fontSize:30}}>No Bookmarks</Text>
        </View>
      )}
      {books.length !== 0 &&
        books.map(el => {
          return (
            <View key={el.id} style={{flexDirection: 'column'}}>
              <View style={{margin: 1}}>
                <Image
                  source={{uri: el.image}}
                  style={{objectFit: 'contain', height: 400}}
                />
              </View>
              <View style={{margin: 1}}>
                <TouchableOpacity
                  style={{backgroundColor: 'royalblue', margin: 8}}
                  onPress={() => dispatch(decrement(el))}>
                  <Text style={{color: 'white', padding:12}}>
                    Remove from BookMarks
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
    </ScrollView>
  );
}
export default BookMarks;
