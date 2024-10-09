import Icon from "@assets/icons/icon"; // Ajusta según la estructura de tu proyecto
import { useState } from "react";
import "./Dashboard.css";

// Definimos las interfaces para los tipos de datos
interface User {
  id: number;
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
  id: number;
  title: string;
  description: string;
  student_spots: number;
  status: string;
  tags: string[];
  start_date: string;
}

interface DashboardProps {
  rol: "GESTOR" | "MENTOR" | "EGRESADO";
  users: User[];
  mentorships: Mentorship[];
  loading: boolean;
  error: string | null;
  activeSection: string;
  handleSectionChange: (section: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  rol,
  users,
  mentorships,

  activeSection,
  handleSectionChange,
}) => {
  const [searchTerm, setSearchTerm] = useState(""); // Estado para la búsqueda

  const sectionPermissions = {
    GESTOR: ["MENTORES", "EGRESADOS", "MENTORIAS", "ONGS", "CONSULTORAS"],
    MENTOR: ["EGRESADOS", "MENTORIAS"],
    EGRESADO: ["MENTORIAS"],
  };

  const availableSections = sectionPermissions[rol] || [];

  // Filtrar según el término de búsqueda
  const filteredMentorships = mentorships.filter((mentorship) =>
    mentorship.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredUsers = users.filter((user) =>
    `${user.first_name} ${user.last_name}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const renderTable = () => {
    if (activeSection === "MENTORIAS") {
      return (
        <table className="table">
          <thead>
            <tr>
              <th className="table-header">Título</th>
              <th className="table-header">Descripción</th>
              <th className="table-header">Plazas Estudiantiles</th>
              <th className="table-header">Estado</th>
              <th className="table-header">Etiquetas</th>
              <th className="table-header">Fecha de Inicio</th>
            </tr>
          </thead>
          <tbody>
            {filteredMentorships.map((mentorship) => (
              <tr key={mentorship.id} className="table-row">
                <td className="table-data">{mentorship.title}</td>
                <td className="table-data">{mentorship.description}</td>
                <td className="table-data">{mentorship.student_spots}</td>
                <td className="table-data">{mentorship.status}</td>
                <td className="table-data">{mentorship.tags.join(", ")}</td>
                <td className="table-data">
                  {new Date(mentorship.start_date).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }

    return (
      <table className="table">
        <thead>
          <tr>
            <th className="table-header">Seleccionar</th>
            <th className="table-header">Nombre</th>
            <th className="table-header">Apellido</th>
            <th className="table-header">DNI</th>
            <th className="table-header">Correo Electrónico</th>
            <th className="table-header">Rol</th>
            <th className="table-header">Teléfono</th>
            <th className="table-header">Fecha de Nacimiento</th>
            <th className="table-header">LinkedIn</th>
            <th className="table-header">Institución</th>
            <th className="table-header">Tipo de Institución</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id} className="table-row">
              <td className="table-data">
                <input type="checkbox" className="checkbox" />
              </td>
              <td className="table-data">{user.first_name}</td>
              <td className="table-data">{user.last_name}</td>
              <td className="table-data">{user.dni}</td>
              <td className="table-data">{user.email}</td>
              <td className="table-data">{user.role.name}</td>
              <td className="table-data">{user.phone}</td>
              <td className="table-data">
                {new Date(user.birth_date).toLocaleDateString() || "N/A"}
              </td>
              <td className="table-data">
                <a
                  href={user.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver Perfil
                </a>
              </td>
              <td className="table-data">{user.institution.name}</td>
              <td className="table-data">{user.institution.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <section className="dashboard__container">
      <div className="dashboard">
        <div className="dashboard__manager">
          <div className="dashboard__manager__select__container">
            <h2 className="dashboard__manager__select__title">Gestionar</h2>
            <ul className="dashboard__manager__select__list">
              {availableSections.map((section) => (
                // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
                <li
                  key={section}
                  className={`dashboard__manager__select__item ${
                    activeSection === section ? "active" : ""
                  }`}
                  onClick={() => handleSectionChange(section)}
                >
                  {section}
                </li>
              ))}
            </ul>
          </div>
          <Icon name="decorationDashboard" width={300} height={300} />
        </div>

        <header className="dashboard__table">
          <div className="dashboard__table__title__search">
            <h3 className="dashboard__table__title">
              Lista de {activeSection.toLowerCase()}
            </h3>
            <input
              className="dashboard__table__search"
              placeholder="Buscar..."
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {renderTable()} {/* Renderiza la tabla correspondiente */}
        </header>
      </div>
    </section>
  );
};
