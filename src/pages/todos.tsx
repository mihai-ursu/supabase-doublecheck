import { supabase } from "../utils/supabase";
import Layout from "../components/Layout/Layout/Layout";
import React, { useState, useEffect } from "react";
import TodoCard from "@/components/TodoCard/TodoCard";
import { Todo } from "types/todo.type";
import styles from "../styles/Todos.module.scss";
import { User } from "@supabase/supabase-js";
import { NextPage } from "next";

const Home: NextPage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoInput, setTodoInput] = useState<string>("");
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const user = supabase.auth.user();
    setUser(user);

    supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user);
    });
  }, []);

  const getTodos = async () => {
    const { data: todos } = await supabase.from("todo").select("*");
    const finalTodos = todos.reverse();
    setTodos(finalTodos);
  };

  useEffect(() => {
    getTodos();
    supabase.auth.onAuthStateChange(() => {
      getTodos();
    });
  }, []);

  const handleAddTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (todoInput === "") return;
    const finalTodos = todos.slice();
    const currentTodo = {
      id: Math.floor(Math.random() * Date.now() * 100000),
      name: todoInput,
      isDone: false,
      user_id: user.id,
    };
    finalTodos.unshift(currentTodo);
    setTodos(finalTodos);
    setTodoInput("");

    try {
      await supabase.from("todo").insert([currentTodo]);
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const el = e.target as HTMLInputElement;
    setTodoInput(el.value);
  };

  return (
    <Layout>
      {user ? (
        <form className={styles.todo_form} onSubmit={handleAddTodo}>
          <input
            type="text"
            name="name"
            id="todo-name"
            placeholder="Name"
            className={styles.name}
            value={todoInput}
            onChange={handleChange}
          />
          <input type="submit" className={styles.button} value="Add Todo" />
        </form>
      ) : null}
      {user && todos
        ? todos.map((todo) => {
            return (
              <TodoCard
                key={todo.id}
                {...todo}
                todos={todos}
                setTodos={setTodos}
              />
            );
          })
        : null}
    </Layout>
  );
};

export default Home;
