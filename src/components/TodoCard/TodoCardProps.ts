import { Todo } from "types/todo.type";

export type TodoCardProps = {
  created_at?: string;
  id?: number;
  isDone: boolean;
  name: string;
  user_id: string;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};
