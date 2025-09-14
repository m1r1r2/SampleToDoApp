import React,{useContext,createContext,useState} from 'react';
import {Alert} from "react-native";
import * as LocalAuthentication from 'expo-local-authentication';

const TodoContext = createContext();

  //Create a Context for the Todos
  export const useTodos =()=> useContext(TodoContext);


 //Custom hooks so that user can access it Easily
  export const TodoProvider = ({children})=>{
    const [todos,setTodos] = useState([]);

    // function to Check the Biometric Authentication 
    const checkAuth = async ()=>{
        const result = await LocalAuthentication.authenticateAsync ({
            promptMessage :'Authenticate to Modify yopur TODO list',
            fallbackLabel :'USe Device PIN/Password',
            disableDeviceFallback :false
        });
        return result.success;
    };

   // Add  new Todos only if it user is Authenticated
    const addTodo = async (title)=>{
        const isEnabled = await checkAuth();
        if(!isEnabled){
            Alert.alert("Failed", "Authentication required to add a Task");
            return;
        }
        const newTodo = {id : Date.now().toString(),title ,done :false};
        setTodos((prev)=> [...prev,newTodo]);

    };

    //Update todos only if user is authenticate
    const updateTodo = async (id,newtitle)=>{
        const isEnabled = await checkAuth();
        if(!isEnabled){
            Alert.alert("Failed", "Authentication required to add a Task");
            return;
        }
        
        setTodos((prev)=> prev.map((todo)=> (todo.id === id  ? {...todo , title : newtitle}:todo)));

    };

     //Delete todos only if user is authenticate
    const deleteTodo = async (id)=>{
        const isEnabled = await checkAuth();
        if(!isEnabled){
            Alert.alert("Failed", "Authentication required to add a Task");
            return;
        }
 
        setTodos((prev)=> prev.filter((todo)=> todo.id !== id ));

    };
    // Provide the todos and actions to children
    return (<TodoContext.Provider value ={{todos,addTodo,updateTodo,deleteTodo}}>
        {children}
       </TodoContext.Provider>);


  }