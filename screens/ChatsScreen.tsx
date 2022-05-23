import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { Alert, Button, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Chatroom, Status } from '../entities/Chatroom';
import { addChatroom, fetchChatrooms, setOpenChat, toggleOnline } from '../store/actions/chat.actions';
import { StackParamList } from "../typings/navigations";

type ScreenNavigationType = NativeStackNavigationProp<
    StackParamList,
    "Chats"
>

export default function ChatsScreen() {
    const navigation = useNavigation<ScreenNavigationType>()
    const [title, onChangeTitle] = React.useState('');
    const [message, onChangeMessage] = React.useState('');
    const isOnline = useSelector((state: any) => state.user.isOnline) 

    const chatrooms: Chatroom[] = useSelector((state: any) => state.chat.chatrooms)

    const dispatch = useDispatch();

    useEffect(() => { 
        dispatch(fetchChatrooms())
    }, [])

    const handleAddChatroom = () => {
        const chatroom: Chatroom = new Chatroom(title, Status.UNREAD, message, new Date());
        dispatch(addChatroom(chatroom));
        onChangeTitle('');
        onChangeMessage('');
    }
    const renderChatroom = ({ item }: { item: any }) => (
        <TouchableOpacity
            onPress={() => handleOpenChat(item)}
            style={styles.touchable}
        >
            <Text>{item.title}</Text>
        </TouchableOpacity>
    );
    const handleOpenChat = (item: Chatroom) => {
        dispatch(setOpenChat(item));
        navigation.navigate("OpenChat");
        dispatch(fetchChatrooms());
    }
var status;
    if(isOnline){
        status = "online";
    }else {
        status = "offline";
    }

    return (
        <View style={styles.container}>
            <Button title="View All Chats" onPress={() => Alert.alert("To be implemented")} />
            <Text>{status}</Text>
            <Button title="Set online" onPress={() => dispatch(toggleOnline())} />
            <FlatList
                data={chatrooms}
                renderItem={renderChatroom}
            />
            <TextInput
                onChangeText={onChangeTitle}
                value={title}
                placeholder="Chat title..."
                placeholderTextColor={"black"}
            />
            <TextInput
                onChangeText={onChangeMessage}
                value={message}
                placeholder="Message..."
                placeholderTextColor={"black"}
            />
            <Button title="Create new chat" onPress={handleAddChatroom} />
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
    touchable: {
        margin:5
    }
})