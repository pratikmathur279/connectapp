import axios from 'axios';

class Actions {
    createUser(userData, callback){
        axios.post('https://oty5tefblb.execute-api.us-east-1.amazonaws.com/dev/register', userData)
        .then((res)=>{
            this.createChats(()=>{
                callback(res);
            });
            
        });
    }

    createChats(userData, callback){
        axios.post('', userData)
        .then((res)=>{
            callback(res);
        })
    }
    checkUserAuth(user, callback){
        axios.post(`https://oty5tefblb.execute-api.us-east-1.amazonaws.com/dev/login`, user)
        .then((res)=>{
            callback(res);
        })
        .catch((res)=> {
            callback(res);
        })
    }

    getUsers(callback){
        axios(`https://oty5tefblb.execute-api.us-east-1.amazonaws.com/dev/getUsers`)
        .then((res)=>{
            callback(res.data);
        });
    }

    sendMessage(msg, callback){
        axios.post(`https://oty5tefblb.execute-api.us-east-1.amazonaws.com/dev/message`, msg)
        .then((res) => {
            callback(res);
        })
    }

    getMessages(callback){
        axios(`https://oty5tefblb.execute-api.us-east-1.amazonaws.com/dev/messages`)
        .then((res)=>{
            var data = res.data;
            data.sort((a, b) => (a.date < b.date) ? -1 : 1);
            callback(data)
        });
    }

    createChat(obj, callback){
        axios.post(`https://oty5tefblb.execute-api.us-east-1.amazonaws.com/dev/createChat`, obj)
        .then((res)=>{
            callback(res);
        })
    }

    getChats(callback){
        axios(`https://oty5tefblb.execute-api.us-east-1.amazonaws.com/dev/chats`)
        .then((res)=>{
            var data = res.data;
            // data.sort((a, b) => (a.date < b.date) ? -1 : 1);
            callback(data)
        });
    }

    userOnline(data, callback){
        axios.post(`https://oty5tefblb.execute-api.us-east-1.amazonaws.com/dev/online`, data)
        .then((res)=>{
            callback(res);
        })
    }
}

export default Actions;