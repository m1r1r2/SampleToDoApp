/* 
   This component is used for adding new TODO items.
   - It uses Context API (useTodos) to access the "addTodo" function. 
   - It also uses a TextInput for typing a task and a Button to submit it.
*/

import React,{useState} from "react";
import {Text,View,TouchableOpacity,StyleSheet,TextInput } from "react-native";
import { useTodos } from "../context/ToContextApi";

export default function AddToDo (){
  //Access the AddToDo from ContextApi
  const {  addTodo } = useTodos();
    
    //keep track of text  entered by the user using the useState hooks
    const [newTask, setNewTask] = useState("");
   
    return(
       <View style={styles.container}>
        <Text style={styles.title}>TODO</Text>
         <View style={styles.addContainer}>
          <TextInput
            placeholder="Enter New Task"
            value={newTask}
            onChangeText={setNewTask}
            style={styles.input}
          />
          <TouchableOpacity
            onPress={() => {
              if (newTask.trim() === "") return;
              addTodo(newTask);
              setNewTask("");
            }}
            style={styles.addButton}
          >
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>
        </View>
  );
}

//Styling for this Component
const styles = StyleSheet.create({
 
    title: {
      fontSize: 26,
      fontWeight: "bold",
      marginBottom: 20,
      alignSelf: "center",
    },
    addContainer: {
     flexDirection: "row",
      alignItems: "center",
      marginBottom: 20,
    },
    input: {
      width :"80%",
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 8,
      fontSize: 16,
      padding :12,
      margin :10,
      backgroundColor: "white",
    },
    addButton: {
      backgroundColor: "green",
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderRadius: 8,
    },
    addButtonText: {
      color: "white",
      fontSize: 16,
      fontWeight: "bold",
    },

});