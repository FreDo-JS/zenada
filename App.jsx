import { useState, useEffect } from "react";

export default function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const API = "http://localhost:3000";

  const fetchUsers = async () => {
    const res = await fetch(`${API}/users`);
    console.log(res);

    const data = await res.json();
    console.log(data);

    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <>
      <h1>Lista użytkowników</h1>
      <table>
        <tr>
          <th>Imie</th>
          <th>Stanowisko</th>
        </tr>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.role}</td>
          </tr>
        ))}
      </table>
    </>
  );
}
