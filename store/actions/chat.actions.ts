import { Chatroom, Status } from "../../entities/Chatroom";

export const ADD_CHATROOM = 'ADD_CHATROOM';
export const FETCH_CHATROOMS = 'FETCH_CHATROOMS';
export const SET_OPEN_CHAT = 'SET_OPEN_CHAT';
export const DELETE_CHAT = 'DELETE_CHAT';
export const TOGGLE_ONLINE = 'TOGGLE_ONLINE';

export const toggleOnline = () => {
    return { type: TOGGLE_ONLINE };
};

export const addChatroom = (chatroom: Chatroom) => {
    return async (dispatch: any, getState: any) => {
        const token = getState().user.idToken;

        console.log(token);

        const response = await fetch(
            "https://react-native-exam-5109f-default-rtdb.europe-west1.firebasedatabase.app//chatrooms.json?auth= "+ token, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                chatroom
            )
            
        })

        if (!response.ok) {
            await console.error();
            
        } else {
            const data = await response.json();
            console.log("data from server", data);
            chatroom.id = data.name;

            dispatch({ type: ADD_CHATROOM, payload: chatroom })
        }
    };
}

export const setOpenChat = (chatroom: Chatroom) => {
    return async (dispatch: any, getState: any) => {
        const token = getState().user.idToken;

        console.log(token);

        if (chatroom.status !== Status.READ) {

            chatroom.status = Status.READ;

            const response = await fetch(
                `https://react-native-exam-5109f-default-rtdb.europe-west1.firebasedatabase.app/chatrooms/${chatroom.id}/status.json?auth=` + token, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    Status.READ
                )
            });

            if (!response.ok) {
                console.error();
            } else {
                const data = await response.json(); // json to javascript
                console.log("data from server", data);

            }
        }
        
        dispatch({ type: SET_OPEN_CHAT, payload: chatroom })
    };
}

export const deleteChat = (chatroom: Chatroom) => {
    return async (dispatch: any, getState: any) => {
        const token = getState().user.idToken;
        console.log(token);
        const response = await fetch(
            `https://react-native-exam-5109f-default-rtdb.europe-west1.firebasedatabase.app/chatrooms/${chatroom.id}.json?auth=` + token, {
            method: 'DELETE',
        });

        if (!response.ok) {
           console.error()
        } else {
            const data = await response.json(); // json to javascript
            console.log("data from server", data);
        }
        dispatch({ type: DELETE_CHAT, payload: chatroom.id })
        dispatch(fetchChatrooms());
    };

}

export const fetchChatrooms = () => {
    return async (dispatch: any, getState: any) => {
        const token = getState().user.idToken;

        const response = await fetch(
            'https://react-native-exam-5109f-default-rtdb.europe-west1.firebasedatabase.app/chatrooms.json?auth=' + token, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            
        } else {
            const data = await response.json(); // json to javascript
            let chatrooms: Chatroom[] = []
            for (const key in data) {
                const obj = data[key];
                chatrooms.push(new Chatroom(obj.title, obj.status, obj.message, new Date(obj.timestamp), key))
            }

            console.log("chatrooms", chatrooms);

            dispatch({ type: 'FETCH_CHATROOMS', payload: chatrooms })
        }
    };
}
