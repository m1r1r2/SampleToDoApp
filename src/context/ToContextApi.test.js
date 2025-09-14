import React from "react";
import { renderHook,act } from '@testing-library/react-hooks';
import { TodoProvider,useTodos } from "./ToContextApi";
import * as LocalAuthentication from "expo-local-authentication";

jest.mock("expo-local-authentication",()=>({
    authenticateAsync : jest.fn(),

}));

let result;

beforeEach(() => {
  const wrapper = ({ children }) => <TodoProvider>{children}</TodoProvider>;
  ({ result } = renderHook(() => useTodos(), { wrapper }));
});
test("adds a todo when auth passes",async()=>{
    LocalAuthentication.authenticateAsync.mockResolvedValue({success :true});
     await act(async ()=>{
        await result.current.addTodo("Add New Project");
    });
    expect(result.current.todos[0].title).toBe("Add New Project");
});

test(" not to add task in to todo when auth fails ",async()=>{
    LocalAuthentication.authenticateAsync.mockResolvedValue({success :false});
    await act(async ()=>{
        await result.current.addTodo("Auth Failed");
    })
    expect(result.current.todos).toHaveLength(0);
});

test("update task in to todo when auth pass",async()=>{
    LocalAuthentication.authenticateAsync.mockResolvedValue({success :true});
    await act(async ()=>{
        await result.current.addTodo("Learning React Native");
     });
     const id = await result.current.todos[0].id;
     await act(async () => {
        await result.current.updateTodo(id, "Learning React Js");
      });

    expect(result.current.todos[0].title).toBe("Learning React Js");
});

test("delete  from todo when auth pass",async()=>{
    LocalAuthentication.authenticateAsync.mockResolvedValue({success : true});
    await act(async()=>{
        await result.current.addTodo("Task to Delete");
     });
    const id = result.current.todos[0].id;
    await act(async()=>{
        await result.current.deleteTodo(id);
    });
    expect(result.current.todos).toHaveLength(0);
})
