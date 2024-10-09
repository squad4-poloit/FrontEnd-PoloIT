import Icon from "@assets/icons/icon"; // Ajusta según la estructura de tu proyecto
import { Dashboard } from "@components/templates/Dashboard/Dashboard"; // Asegúrate de que la ruta sea correcta
import { Hero } from "@components/templates/Hero/Hero";
import { useEffect, useState } from "react";

// Tipos de datos para los estados
interface User {
  id: string;
  first_name: string; // Ajusta los campos según el esquema de tu API
  last_name: string;
  dni: string;
  email: string;
  role: {
    name: string;
  };
  phone: string;
  birth_date: string;
  linkedIn: string;
  institution: {
    name: string;
    type: string;
  };
}

interface Mentorship {
  id: string;
  title: string;
  description: string;
  student_spots: number;
  status: string;
  tags: string[];
  start_date: string;
}

interface FetchResponse<T> {
  data: T;
}

export const Home = () => {
  const [users, setUsers] = useState<User[]>([]); // Lista de todos los usuarios
  const [mentorships, setMentorships] = useState<Mentorship[]>([]); // Lista de mentorías
  const [currentUser, setCurrentUser] = useState<User | null>(null); // Usuario actual
  const [loading, setLoading] = useState<boolean>(true); // Estado de carga
  const [error, setError] = useState<string | null>(null); // Estado de error
  const [activeSection, setActiveSection] = useState<string>("EGRESADOS"); // Sección activa por defecto
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]); // Usuarios filtrados

  const currentUserId = "b2517f82-8a58-4791-82d2-14965386933f"; // ID del usuario actual

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Llamada para obtener el usuario actual por ID
        const responseCurrentUser = await fetch(
          `http://localhost:3030/api/users/${currentUserId}`
        );
        const userData: FetchResponse<User> = await responseCurrentUser.json();
        setCurrentUser(userData.data); // Actualiza el usuario actual

        // Llamada para obtener todas las mentorías
        const responseMentorships = await fetch(
          "http://localhost:3030/api/mentorships"
        );
        const mentorshipsData: FetchResponse<Mentorship[]> =
          await responseMentorships.json();
        setMentorships(mentorshipsData.data); // Actualiza la lista de mentorías
      } catch (err) {
        setError("Error al cargar los datos");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentUserId]);

  useEffect(() => {
    const fetchFilteredUsers = async () => {
      try {
        setLoading(true);

        // Mapa de secciones a roles en singular
        const roleMap: { [key: string]: string } = {
          MENTORES: "MENTOR",
          EGRESADOS: "EGRESADO",
          MENTORIAS: "MENTORIA", // Si es necesario
          // Puedes agregar otros roles aquí si los tienes
        };

        const responseFilteredUsers = await fetch(
          `http://localhost:3030/api/users?role=${roleMap[activeSection]}`
        );
        const filteredUsersData: FetchResponse<{ users: User[] }> =
          await responseFilteredUsers.json();
        setFilteredUsers(filteredUsersData.data.users); // Actualiza la lista de usuarios filtrados
      } catch (err) {
        setError("Error al cargar los datos");
      } finally {
        setLoading(false);
      }
    };

    fetchFilteredUsers();
  }, [activeSection]); // Dependencia en activeSection

  const handleSectionChange = (section: string) => {
    setActiveSection(section); // Cambia la sección activa
  };

  if (loading) return <p>Cargando...</p>; // Muestra cargando si está en estado de carga
  if (error) return <p>Error: {error}</p>; // Muestra error si ocurre uno

  return (
    <>
      <Hero currentUser={currentUser} /> {/* Pasa el usuario actual a Hero */}
      <Dashboard
        rol={currentUser?.role.name || ""} // Obtiene el rol del usuario actual
        users={filteredUsers} // Pasa la lista de usuarios filtrados
        mentorships={mentorships} // Pasa la lista de mentorías
        loading={loading} // Estado de carga
        error={error} // Estado de error
        activeSection={activeSection} // Sección activa
        handleSectionChange={handleSectionChange} // Función para cambiar la sección
      />
    </>
  );
};
