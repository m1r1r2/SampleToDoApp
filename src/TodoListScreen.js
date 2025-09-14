import AddToDo from "./component/AddToDo";
import ShowToDoItem from "./component/ShowToDoItem";

export default function TodoListScreen() {
  return (
    <>
    {/*Add todos item in the list*/}
     <AddToDo/>

     {/*Showing todos item in the List*/}
     <ShowToDoItem/>
    </>
  );
}

