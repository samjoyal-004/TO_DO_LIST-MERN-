import axios from "axios";

const TaskItem = ({ task, fetchTasks }) => {
  const toggleComplete = async () => {
    try {
      await axios.put(`http://localhost:5000/tasks/${task._id}`, {
        isCompleted: !task.isCompleted,
      });
      fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const editTask = async () => {
    const newTitle = prompt("Edit Task Title:", task.title);
    const newDescription = prompt("Edit Task Description:", task.description);

    if (newTitle || newDescription !== null) {
      try {
        await axios.put(`http://localhost:5000/tasks/${task._id}`, {
          ...task,
          title: newTitle || task.title,
          description: newDescription || task.description,
        });
        fetchTasks();
      } catch (error) {
        console.error("Error updating task:", error);
      }
    }
  };

  const deleteTask = async () => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${task._id}`);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className={`task-item ${task.isCompleted ? "completed-task" : ""}`}>
      <div className="task-content">
        <span className="task-text">
          {task.title}{" "}
        
        </span>
        <div className="task-actions">
        <span className="emoji">{task.isCompleted ? "😊" : "😞"}</span>
          <input
            type="checkbox"
            id={`task-${task._id}`}
            checked={task.isCompleted}
            onChange={toggleComplete}
          />
          <label htmlFor={`task-${task._id}`}></label>
          <button className="edit-btn" onClick={editTask}>
            Edit
          </button>
          <button className="delete-btn" onClick={deleteTask}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
