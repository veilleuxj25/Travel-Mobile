import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import { Constants } from 'expo';
import * as firebase from 'firebase';
// Initialize Firebase
var config = {
  apiKey: "AIzaSyASJl6VpvMhieCNpVQhDkuXgop690qHuSM",
  authDomain: "travel-log-f0b01.firebaseapp.com",
  databaseURL: "https://travel-log-f0b01.firebaseio.com",
  projectId: "travel-log-f0b01",
  storageBucket: "travel-log-f0b01.appspot.com",
  messagingSenderId: "285665928160"
};
firebase.initializeApp(config);
class getSaveDelete {
 getMessages(callback) {
   firebase.database()
     .ref('messages')
     .on("value", snapshot => {
       // whenever the database is updated this gets called and we have the opportunity to update the UI
       // we query the database on the value of the messages collection and then listen to any subsequent changes
       // on the messages collection
       // if we wanted to read once and that's it then we could use the once method instead of on()
       // https://firebase.google.com/docs/reference/js/firebase.database.Reference.html#once
      
       const data = snapshot.val();
    
       if (data) {
         // map the messages from the firebase format to an array that we use in the component

         const messages = Object.keys(data).map(v => { return { id: v, data: data[v] } });
         callback(messages)
       } else {
         // if no data is returned then we still want to call back with an empty list
         callback([])
       }
     })
 }

 saveMessage(message, callback) {
   const newMessage = firebase.database().ref()
     .child("messages")
     .push();

   newMessage.set(message, callback)
 }

 deleteMessage(id) {
   firebase.database().ref(`messages/${id}`).remove();
 }
}

const getsavedelete = new getSaveDelete()

export default class App extends React.Component {
 constructor(props){
   super(props)

   this.state = {
     message: '',
     messages: []
   } 

   this.addItem = this.addItem.bind(this);
 }

 componentDidMount() {
     // Initialize messages from the database
     // the callback will be called whenever the messages value is updated
     // this means that the component state will always be updated from the latest
     // database value
   getsavedelete.getMessages(callback = messages => {
     this.setState({
       messages: messages
     });
   });
 }

 addItem (){
   if (!this.state.message) return

   // save to the database
   getsavedelete.saveMessage(this.state.message, callback = () => this.setState({message: ''}))
 }

 deleteItem = (id) => {
   getsavedelete.deleteMessage(id)
 }

  render() {
   return (
     <View style={styles.container}>
     <Text style = {styles.title}>Travel Log</Text>
       <View style={styles.msgBox}>
         <TextInput
           value = {this.state.message}
           placeholder='Travel log entry'
           onChangeText={(text) => this.setState({message:text})}
           style={styles.txtInput}
         />
         <Button title='Save'onPress={this.addItem}/>
         </View>
         <FlatList
           data={this.state.messages}
           keyExtractor={(item, index)=>item.id}
           renderItem={
             ({item})=>
             <View style={styles.listItemContainer}>
               <Text style={[styles.listItem]}>
                 {item.data}
               </Text>
               <Button title='Delete' onPress={()=>{this.deleteItem(item.id)}}/>
             </View>
         }
           />
     </View>
   );
 }
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: '#7290c1',
   marginTop: Constants.statusBarHeight
 },
 title: {
   color:'black',
   textAlign: 'center',
   fontSize: 25
 },
 msgBox: {
   flexDirection: 'row',
   padding: 20,
   backgroundColor: '#fff',
 },
 txtInput: {
   flex:1,
 },
 listItemContainer: {
   backgroundColor: 'white',
   margin: 5,
   borderRadius: 5,
 },
 listItem: {
   fontSize: 20,
   height: 100,
   padding: 0,
   color: 'black'
   }
});
