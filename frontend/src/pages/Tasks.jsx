import { useEffect, useState } from "react";
import API from "../services/api";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  // ✅ FETCH TASKS
  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/task", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks(res.data);
    } catch (err) {
      console.log("Fetch Error:", err);
    }
  };

  // ✅ ADD TASK
  const handleAdd = async () => {
    try {
      const token = localStorage.getItem("token");

      await API.post(
        "/task",
        { title },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTitle("");
      fetchTasks();
    } catch (err) {
      console.log("Add Error:", err);
    }
  };

  // ✅ DELETE TASK
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await API.delete(`/task/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchTasks();
    } catch (err) {
      console.log("Delete Error:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Tasks</h2>

      <input
        placeholder="Enter task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={handleAdd}>Add</button>

      <hr />

      {tasks.length === 0 ? (
        <p>No tasks found</p>
      ) : (
        tasks.map((task) => (
          <div key={task._id}>
            <p>{task.title}</p>
            <button onClick={() => handleDelete(task._id)}>
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}