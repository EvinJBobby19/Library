import {Image, Text, View} from 'react-native';
import {useAuth0} from 'react-native-auth0';
import LogoutButton from './LogoutButton';

const Profile = () => {
  const {user} = useAuth0();

  return (
    <View style={{}}>
      {!user && <Text style={{fontSize: 20}}>Not Logged In</Text>}
      {user && (
        <View style={{padding:10,rowGap:10,alignItems:'center'}}>
          <View>
            <Text style={{fontSize: 30}}>Profile Details : </Text>
          </View>
          <View>
            <Image
              source={{uri: user.picture}}
              style={{width: 100, height: 100, borderRadius: 30}}
            />
          </View>
          <View style={{rowGap:10,alignItems:'center'}}>
            <Text style={{fontSize:15}}>User Name : {user.name}</Text>
            <Text style={{fontSize:15}}>Email Id : {user.email}</Text>
            <LogoutButton />
          </View>
        </View>
      )}
    </View>
  );
};
export default Profile;
