import { supabase } from "@/utils/supabase";
import { FC, useState } from "react";
import { TodoCardProps } from "./TodoCardProps";
import styles from "./TodoCard.module.scss";
import { AnimatePresence, motion, usePresence } from "framer-motion";
import { FaRegTrashAlt } from "react-icons/fa";
import combineClasses from "helpers/combineClasses";

const TodoCard: FC<TodoCardProps> = (props) => {
  const [isDone, setIsDone] = useState(props.isDone);
  const [isPresent, safeToRemove] = usePresence();
  const { todos, setTodos } = props;

  const handleChecked = async () => {
    setIsDone(!isDone);
    await supabase.from("todo").update({ isDone: !isDone }).eq("id", props.id);
  };

  const handleDelete = async (id: number) => {
    const newTodos = todos.slice();
    const finalTodos = newTodos.filter((todo) => todo.id !== id);
    setTodos(finalTodos);
    try {
      await supabase.from("todo").delete().match({ id });
    } catch (error) {
      throw new Error(error);
    }
  };

  const variants = {
    in: { scaleY: 1, opacity: 1 },
    out: { scaleY: 0, opacity: 0, zIndex: -1 },
    tapped: { scale: 0.98, opacity: 0.5, transition: { duration: 0.1 } },
  };

  return (
    <motion.div
      // initial={{ opacity: 0, height: "auto" }}
      // animate={isPresent ? "in" : "out"}
      // variants={variants}
      // transition={{ type: "spring", stiffness: 500, damping: 50, mass: 1 }}
      // onAnimationComplete={() => !isPresent && safeToRemove()}
      className={styles.card}
    >
      <button className={styles.button} onClick={handleChecked}>
        <svg className={styles.checkbox} version="1.1" viewBox="0 0 30 30">
          <motion.path
            animate={{
              pathLength: isDone ? 1 : 0,
              opacity: isDone ? 1 : 0,
            }}
            d="M23.5,17v6.2c0,1.9-1.6,3.5-3.5,3.5H5.7c-1.9,0-3.5-1.6-3.5-3.5V8.9c0-1.9,1.6-3.5,3.5-3.5h11.1"
          />
          <motion.path
            animate={{
              pathLength: isDone ? 1 : 0,
              opacity: isDone ? 1 : 0,
            }}
            d="M5.7,13.6 12.1,20 28.8,3.4 "
          />
          <motion.path
            style={{ stroke: "#cecece" }}
            animate={{ opacity: isDone ? 0 : 1 }}
            d="M20.1,26.6H5.6c-1.8,0-3.3-1.5-3.3-3.4V8.7c0-1.8,1.5-3.4,3.3-3.4h14.6c1.8,0,3.4,1.5,3.4,3.4v14.6
	C23.5,25.1,22,26.6,20.1,26.6z"
          />
        </svg>
      </button>
      <div className={styles.todo_title}>
        <motion.div
          initial={{ scaleX: isDone ? 1 : 0 }}
          animate={{ scaleX: isDone ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          style={{ transformOrigin: 0, transform: "translateY(-50%)" }}
          className={styles.todo_line}
        />
        <motion.h1
          initial={{ color: isDone ? "#cecece" : "#000000" }}
          animate={{
            color: isDone ? "#cecece" : "#000000",
          }}
          className={styles.todo_name}
        >
          {props.name}
        </motion.h1>
      </div>
      <button
        onClick={() => handleDelete(props.id)}
        className={combineClasses([styles.button, styles.delete_button])}
      >
        <FaRegTrashAlt />
      </button>
    </motion.div>
  );
};

export default TodoCard;
