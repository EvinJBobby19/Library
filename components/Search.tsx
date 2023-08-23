import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {useEffect, useState} from 'react';
import {
  ScrollView,
  TextInput,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';

interface Product {
  title: string;
  subtitle: string;
  isbn13: string;
  price: string;
  image: string;
  url: string;
}
interface Product {
  title: string;
  subtitle: string;
  isbn13: string;
  price: string;
  image: string;
  url: string;
}

function Search() {
  const navigation = useNavigation();
  const [products, setProducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState<any>([]);

  useEffect(() => {
    axios.get('https://api.itbook.store/1.0/new').then(response => {
      const data = response.data;
      if (data.books) {
        setProducts(data.books);
      }
    });
  }, []);

  const [searchText, setSearchText] = useState('');
  const handleSearch = () => {
    const filtered = products.filter(el => {
      return el.title.toLowerCase().includes(searchText.toLowerCase());
    });

    setFilter(filtered);
  };
  return (
    <>
      <TextInput
        style={{height: 40}}
        placeholder="Search"
        onChangeText={text => {
          setSearchText(text);
          handleSearch();
        }}
      />
      {searchText.length !== 0 && (
        <View
          style={{
            position: 'absolute',
            top: 45,
            width: '100%',
            backgroundColor: 'white',
          }}>
          <ScrollView>
            {filter.map((el: any, index: number) => {
              if (index < 2) {
                return (
                  
                  <TouchableOpacity //@ts-ignore
                    onPress={() => navigation.navigate('Details', {el: el})}>
                    <View
                      style={{
                        flexDirection: 'row',
                        columnGap: 20,
                        borderWidth: 1,
                        borderStyle: 'solid',
                        borderColor: 'gray',
                      }}>
                      <View>
                        <Image
                          source={{uri: el.image}}
                          style={{
                            width: 50,
                            height: 100,
                            objectFit: 'contain',
                          }}
                        />
                      </View>
                      <View
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Text style={{fontSize: 10}}>{el.title}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              }
            })}
          </ScrollView>
        </View>
      )}
    </>
  );
}
export default Search;
