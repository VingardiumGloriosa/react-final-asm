import React from 'react';
import { Alert, Button, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Post } from '../entities/Post';
import { StackParamList } from "../typings/navigations";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { User } from '../entities/User';
import { useQueryClient } from 'react-query';
import { setOpenPost } from '../store/actions/post.actions';
import { logout } from '../store/actions/user.actions';
import { SafeAreaView } from 'react-native-safe-area-context';

type ScreenNavigationType = NativeStackNavigationProp<
    StackParamList,
    "Feed"
>

export default function FeedScreen() {

    const navigation = useNavigation<ScreenNavigationType>()

    const dispatch = useDispatch();

      const newPost = () => {
        Alert.prompt(
          "Enter post contant",
          "Don´t fear, be creative",
          [
            {
              text: "Discard",
              onPress: () => console.log("Post discarded"),
              style: "cancel"
            },
            {
              text: "Publish",
              onPress: content => console.log("Post content : " + content)
            }
          ],
        );
      };
    
    return (
      <><View style={styles.topBar}>
        <Image style={styles.pic}
                source={require('../assets/images/logo.jpg')}
                />
        <Button
            title="❤️"
            onPress={() => console.log("To be implemented")} />
            <Button
            title='+ New post'
            onPress={() => newPost()} />
      </View>
      <View style={styles.container}>
      <ScrollView>
      <View style = {styles.txt}>
        <Text style={styles.title}>Random title </Text>
          <Text>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi amet consectetur, reiciendis facere at ad incidunt cum qui, ducimus maiores cupiditate rem. Iure maiores, odio natus facere amet commodi laboriosam?</Text>    
          <Button
            title='Read more'
            onPress={() => console.log("To be implemented")} />
        </View>  
        <View style = {styles.txt}>
        <Text style={styles.title}>Random title </Text>
          <Text>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi amet consectetur, reiciendis facere at ad incidunt cum qui, ducimus maiores cupiditate rem. Iure maiores, odio natus facere amet commodi laboriosam?</Text>    
          <Button
            title='Add to favourites'
            onPress={() => console.log("To be implemented")} />
        </View>  
        <View style = {styles.txt}>
        <Text style={styles.title}>Random title </Text>
          <Text>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi amet consectetur, reiciendis facere at ad incidunt cum qui, ducimus maiores cupiditate rem. Iure maiores, odio natus facere amet commodi laboriosam?</Text>    
          <Button
            title='Share with +'
            onPress={() => console.log("To be implemented")} />
        </View>  
        <View style = {styles.txt}>
        <Text style={styles.title}>Random title </Text>
          <Text>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi amet consectetur, reiciendis facere at ad incidunt cum qui, ducimus maiores cupiditate rem. Iure maiores, odio natus facere amet commodi laboriosam?</Text>    
        </View>  
        <View style = {styles.txt}>
        <Text style={styles.title}>Random title </Text>
          <Text>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi amet consectetur, reiciendis facere at ad incidunt cum qui, ducimus maiores cupiditate rem. Iure maiores, odio natus facere amet commodi laboriosam?</Text>    
        </View>  
        <View style = {styles.txt}>
        <Text style={styles.title}>Random title </Text>
          <Text>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi amet consectetur, reiciendis facere at ad incidunt cum qui, ducimus maiores cupiditate rem. Iure maiores, odio natus facere amet commodi laboriosam?</Text>    
        </View>  
        </ScrollView>       
      </View></>

    );
}
const styles = StyleSheet.create({
    container: {
        flex: 6,
      backgroundColor: '#CE9496',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    txt:{
      margin:20,
      padding:20,
      textAlign:"center",
      alignItems:"center",
      color:"black",
      backgroundColor:"white",
      borderRadius:20
    },
    title:{
      fontWeight:"bold",
      fontSize:18
    },
    topBar : {
        alignSelf: 'stretch',
        height: 50,
        flexDirection: 'row', // row
        backgroundColor: "white",
        alignItems: 'center',
        justifyContent: 'space-between', 
        paddingLeft: 10,
        paddingRight: 10,
        color:"black",
        alignContent:'flex-end',
        display:"flex",
        flex:1,
        alignItems:"flex-end"
    },
    pic:{
      resizeMode:"contain",
      height: 60,
      marginBottom:10,
      marginLeft:-80
    }
})
