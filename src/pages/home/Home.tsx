import Icon from "@assets/icons/icon";
import { Dashboard } from "@components/templates/Dashboard/Dashboard";
import { Hero } from "@components/templates/Hero/Hero";
import { useEffect, useState } from "react";

// Tipos de datos para los estados
interface User {
  id: string;
  first_name: string;
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
  const [users, setUsers] = useState<User[]>([]);
  const [mentorships, setMentorships] = useState<Mentorship[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const [loading, setLoading] = useState<any>(true);
  const [error, setError] = useState<string | null>(null);
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const [activeSection, setActiveSection] = useState<any>("EGRESADOS");
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  const loginCredentials = {
    email: "usuario@gestor.com",
    password: "12345678",
  };

  useEffect(() => {
    const loginUser = async () => {
      try {
        const response = await fetch(
          "https://backend.squad4-poloit.xyz/api/auth/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(loginCredentials),
          }
        );

        const result = await response.json();

        if (response.ok) {
          document.cookie = `token=${result.token}; path=/`;

          setCurrentUser({
            id: result.user.id,
            first_name: result.user.first_name,
            last_name: result.user.last_name,
            dni: result.user.dni,
            email: result.user.email,
            role: { name: result.user.role.name },
            phone: result.user.phone,
            birth_date: result.user.birth_date,
            linkedIn: result.user.linkedIn,
            institution: result.user.institution,
          });

          // Carga las mentorías
          await fetchMentorships();
        } else {
          setError("Error de inicio de sesión");
        }
      } catch (err) {
        setError("Error al iniciar sesión");
      }
    };

    const fetchMentorships = async () => {
      try {
        const token = document.cookie
          .split("; ")
          .find((row) => row.startsWith("token="))
          ?.split("=")[1];

        const responseMentorships = await fetch(
          "https://backend.squad4-poloit.xyz/api/mentorships",
          "https://backend.squad4-poloit.xyz/api/mentorships",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const mentorshipsData: FetchResponse<Mentorship[]> =
          await responseMentorships.json();
        setMentorships(mentorshipsData.data);
      } catch (err) {
        setError("Error al cargar las mentorías");
      } finally {
        setLoading(false);
      }
    };

    loginUser();
  }, []);

  useEffect(() => {
    const fetchFilteredUsers = async () => {
      try {
        setLoading(true);

        const roleMap: { [key: string]: string } = {
          MENTORES: "MENTOR",
          EGRESADOS: "EGRESADO",
          MENTORIAS: "MENTORIA",
        };

        const token = document.cookie
          .split("; ")
          .find((row) => row.startsWith("token="))
          ?.split("=")[1];

        const responseFilteredUsers = await fetch(
          `https://backend.squad4-poloit.xyz/api/users?role=${roleMap[activeSection]}`,
          `https://backend.squad4-poloit.xyz/api/users?role=${roleMap[activeSection]}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const filteredUsersData: FetchResponse<{ users: User[] }> =
          await responseFilteredUsers.json();
        setFilteredUsers(filteredUsersData.data.users);
      } catch (err) {
        setError("Error al cargar los datos");
      } finally {
        setLoading(false);
      }
    };

    fetchFilteredUsers();
  }, [activeSection]);

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <Hero currentUser={currentUser} />
      <Dashboard
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        rol={currentUser?.role?.name as any}
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        users={filteredUsers as any}
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        mentorships={mentorships as any}
        error={error}
        activeSection={activeSection}
        handleSectionChange={handleSectionChange}
        loading={false}
      />
    </>
  );
};
