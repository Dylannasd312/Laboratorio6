import { useEffect, useState } from "react";
import { getUsers, User } from "../service/Api";

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        console.error("error al obtener usuarios:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loadingBox}>
          <p style={styles.loadingText}>Cargando usuarios...</p>
          <div style={styles.spinner}></div>
        </div>
      </div>
    );

  return (
    <>
      
      <style>{`
        .sidebar {
          width: 220px;
          background: linear-gradient(180deg, #2563eb, #1e40af);
          color: white;
          padding: 20px;
          box-shadow: 2px 0 8px rgba(0,0,0,0.1);
        }
        .sidebar h2 {
          font-size: 22px;
          font-weight: bold;
          margin-bottom: 20px;
          border-bottom: 1px solid rgba(255,255,255,0.3);
          padding-bottom: 10px;
        }
        .sidebar a {
          display: block;
          padding: 10px;
          margin-bottom: 8px;
          border-radius: 6px;
          text-decoration: none;
          color: white;
          transition: background 0.3s;
        }
        .sidebar a:hover {
          background: rgba(255,255,255,0.2);
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        .header h1 {
          font-size: 28px;
          font-weight: bold;
          color: #333;
        }
        .header button {
          background: linear-gradient(90deg, #22c55e, #16a34a);
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: opacity 0.3s;
        }
        .header button:hover {
          opacity: 0.85;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        th {
          background: linear-gradient(90deg, #2563eb, #1e40af);
          color: white;
          text-align: left;
          padding: 12px 16px;
        }
        td {
          padding: 12px 16px;
          border-bottom: 1px solid #eee;
        }
        tr:hover {
          background: #f9fafb;
        }
        .actions button {
          margin: 0 5px;
          padding: 6px 12px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          color: white;
          transition: transform 0.2s;
        }
        .actions button:hover {
          transform: scale(1.05);
        }
        .btn-edit { background: #facc15; }
        .btn-delete { background: #ef4444; }
        .btn-view { background: #6b7280; }
      `}</style>

      <div style={{ display: "flex", minHeight: "100vh", background: "#f3f4f6" }}>
        
        <aside className="sidebar">
          <h2>Dashboard</h2>
          <nav>
            <a href="#">Inicio</a>
            <a href="#">Usuarios</a>
            <a href="#">Configuración</a>
          </nav>
        </aside>

        
        <main style={{ flex: 1, padding: "30px" }}>
          
          <div className="header">
            <h1>Gestión de Usuarios</h1>
            <button>+ Agregar Usuario</button>
          </div>

         
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Email</th>
                <th style={{ textAlign: "center" }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, idx) => (
                <tr key={u.id} style={{ background: idx % 2 === 0 ? "#f9fafb" : "white" }}>
                  <td>{u.id}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td className="actions" style={{ textAlign: "center" }}>
                    <button className="btn-edit">Editar</button>
                    <button className="btn-delete">Eliminar</button>
                    <button className="btn-view">Ver Perfil</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>
    </>
  );
};


const styles: Record<string, React.CSSProperties> = {
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(90deg, #2563eb, #1e40af)",
  },
  loadingBox: {
    background: "white",
    padding: "30px",
    borderRadius: "12px",
    textAlign: "center",
    boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
  },
  loadingText: {
    fontSize: "18px",
    fontWeight: 600,
    color: "#444",
  },
  spinner: {
    marginTop: "20px",
    border: "4px solid #eee",
    borderTop: "4px solid #2563eb",
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    animation: "spin 1s linear infinite",
  },
};

export default UserList;
