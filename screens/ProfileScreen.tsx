import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Button, StyleSheet, Text, View, Image, Alert } from 'react-native';
import { StackParamList } from '../typings/navigations';
import { User } from '../entities/User';
import { RootState } from '../App';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logout } from '../store/actions/user.actions';

type ScreenNavigationType = NativeStackNavigationProp<StackParamList, "Profile">;

export default function ProfileScreen() {

    const user: User = useSelector((state: RootState) => state.user.loggedInUser);
    const navigation = useNavigation<ScreenNavigationType>();
    const dispatch = useDispatch();

    const logoutAlert=()=>{
        Alert.alert(
          'Log-Out',
          'Are you sure you want to log-out?',
          [
            {text: 'Yes', onPress: () => dispatch(logout())},
            {text: 'No', onPress: () => console.log("no pressed"), style: 'cancel'},
          ],
          { 
            cancelable: true 
          }
        );
      }

    const showName=()=>{    
        if (user.displayname===""){
            return "No name set, you should fix that.."
        }
        return user.displayname?.toString
    }

    return (
        <View style={styles.container}>
            <Image
                style={styles.photo}
                source={user.photoUrl ? {uri:user.photoUrl} : require('../assets/images/avatar.png')}
            />
            <Text>{showName()}</Text>
            <Button title="Edit profile" onPress={() => navigation.navigate("EditProfile")} />
            <Button title="Change password" onPress={() => navigation.navigate("ChangePassword")} />
            <Button title="Log-Out" onPress={(logoutAlert)} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    photo: {
        width: 200,
        height: 200,
        resizeMode: 'cover',
    }
})