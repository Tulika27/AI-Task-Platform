import { useEffect, useState } from "react";
import API from "../services/api";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);

  // GET TASKS
  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Dashboard</h2>

      {tasks.map((t) => (
        <div
          key={t._id}
          style={{ border: "1px solid black", margin: 10, padding: 10 }}
        >
          <h4>{t.title}</h4>
          <p>{t.description}</p>
          <p>Status: {t.status}</p>
        </div>
      ))}
    </div>
  );
}