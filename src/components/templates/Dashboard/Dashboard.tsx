import Icon from "@assets/icons/icon";
import { useState } from "react";
import "./Dashboard.css";

interface User {
  id: number;
  first_name: string;
  last_name: string;
  dni: string;
  email: string;
  role: { name: string };
  phone: string;
  birth_date: string;
  linkedIn: string;
  institution: { name: string; type: string };
}

interface Mentorship {
  id: number;
  title: string;
  description: string;
  student_spots: number;
  mentor_spots: number;
  status: string;
  tags: string;
  start_date: string;
  end_date: string;
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
  const [searchTerm, setSearchTerm] = useState("");
  const [ismentorShipClicked, setIsMentorShipClicked] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "PENDIENTE",
    student_spots: 20,
    mentor_spots: 2,
    start_date: "",
    end_date: "",
  });

  const [isMentorAssignmentClicked, setIsMentorAssignmentClicked] =
    useState(false);
  const [isEgresadoAssignmentClicked, setIsEgresadoAssignmentClicked] =
    useState(false);
  const [assignmentData, setAssignmentData] = useState({
    mentorId: "", // Suponiendo que necesitas seleccionar un mentor
    mentorshipId: "", // Suponiendo que necesitas seleccionar una mentoría
  });

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData); // Muestra los datos en la consola

    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1]; // Obtén el token desde el localStorage

      const response = await fetch("http://localhost:3030/api/mentorships", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Incluye el token en la cabecera
        },
        body: JSON.stringify(formData),
      });
      console.log(JSON.stringify(formData));
      const result = await response.json();
      if (response.ok) {
        console.log("Mentoría creada:", result.data);
        // Aquí puedes resetear el formulario o hacer otra acción
      } else {
        console.error("Error al crear la mentoría:", result);
      }
    } catch (error) {
      console.error("Error en el envío de la mentoría:", error);
    }
  };

  const handleAssignmentFormChange = (
    e: any
  ) => {
    const { name, value } = e.target;
    setAssignmentData({ ...assignmentData, [name]: value });
  };

  const handleAssignmentFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(assignmentData); // Muestra los datos en la consola

    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1]; // Obtén el token desde la cookie

      // La URL debe incluir mentorshipId, ya que es la mentoría a la que asignas el mentor
      const response = await fetch(
        `http://localhost:3030/api/mentorships/${assignmentData.mentorshipId}/users`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Incluye el token en la cabecera
          },
          // El userId debe estar en el cuerpo del POST
          body: JSON.stringify({ user_id: assignmentData.mentorId }),
        }
      );

      const result = await response.json();
      if (response.ok) {
        console.log("Mentor asignado a la mentoría:", result.data);
        // Aquí puedes resetear el formulario o hacer otra acción
      } else {
        console.error("Error al asignar el mentor:", result);
      }
    } catch (error) {
      console.error("Error en el envío de la asignación:", error);
    }
  };

  const sectionPermissions = {
    GESTOR: ["MENTORES", "EGRESADOS", "MENTORIAS", "ONGS", "CONSULTORAS"],
    MENTOR: ["EGRESADOS", "MENTORIAS"],
    EGRESADO: ["MENTORIAS"],
  };
  const availableSections = sectionPermissions[rol] || [];
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
              <th className="table-header">Plazas de Mentores</th>
              <th className="table-header">Estado</th>
              <th className="table-header">Etiquetas</th>
              <th className="table-header">Fecha de Inicio</th>
              <th className="table-header">Fecha de Fin</th>
            </tr>
          </thead>
          <tbody>
            {filteredMentorships.map((mentorship) => (
              <tr key={mentorship.id} className="table-row">
                <td className="table-data">{mentorship.title}</td>
                <td className="table-data">{mentorship.description}</td>
                <td className="table-data">{mentorship.student_spots}</td>
                <td className="table-data">{mentorship.mentor_spots}</td>
                <td className="table-data">{mentorship.status}</td>
                <td className="table-data">
                  {mentorship.tags
                    ? mentorship.tags.split(", ").join(", ")
                    : "N/A"}
                </td>
                <td className="table-data">
                  {new Date(mentorship.start_date).toLocaleDateString()}
                </td>
                <td className="table-data">
                  {new Date(mentorship.end_date).toLocaleDateString()}
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
        <form
          className={`mentorship-form ${ismentorShipClicked ? "open" : ""}`}
          onSubmit={handleFormSubmit}
        >
          <h2>Crear Nueva Mentoría</h2>

          <label htmlFor="title">Título</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleFormChange}
            required
          />

          <label htmlFor="description">Descripción</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleFormChange}
            required
          ></textarea>

          <label htmlFor="student_spots">Plazas Estudiantiles</label>
          <input
            type="number"
            name="student_spots"
            value={formData.student_spots}
            onChange={handleFormChange}
            required
          />

          <label htmlFor="mentor_spots">Plazas de Mentores</label>
          <input
            type="number"
            name="mentor_spots"
            value={formData.mentor_spots}
            onChange={handleFormChange}
            required
          />

          <label htmlFor="start_date">Fecha de Inicio</label>
          <input
            type="date"
            name="start_date"
            value={formData.start_date}
            onChange={handleFormChange}
            required
          />

          <label htmlFor="end_date">Fecha de Fin</label>
          <input
            type="date"
            name="end_date"
            value={formData.end_date}
            onChange={handleFormChange}
            required
          />

          <button type="submit">Crear Mentoría</button>
        </form>
        <form
          className={`mentor-assignment-form ${isMentorAssignmentClicked ? "open" : ""}`}
          onSubmit={handleAssignmentFormSubmit}
        >
          <h2>Asignar Mentores</h2>

          <label htmlFor="mentorId">Seleccionar Mentor</label>
          <select
            name="mentorId"
            value={assignmentData.mentorId}
            onChange={handleAssignmentFormChange}
            required
          >
            <option value="">Seleccione un Mentor</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.first_name} {user.last_name}
              </option>
            ))}
          </select>

          <label htmlFor="mentorshipId">Seleccionar Mentoría</label>
          <select
            name="mentorshipId"
            value={assignmentData.mentorshipId}
            onChange={handleAssignmentFormChange}
            required
          >
            <option value="">Seleccione una Mentoría</option>
            {mentorships.map((mentorship) => (
              <option key={mentorship.id} value={mentorship.id}>
                {mentorship.title}
              </option>
            ))}
          </select>

          <button type="submit">Asignar Mentor</button>
        </form>
        <form
          className={`egresado-assignment-form ${isEgresadoAssignmentClicked ? "open" : ""}`}
          onSubmit={handleAssignmentFormSubmit}
        >
          <h2>Asignar Egresados</h2>

          <label htmlFor="egresadoId">Seleccionar Egresado</label>
          <select
            name="mentorId" // Cambia esto a egresadoId si es necesario
            value={assignmentData.mentorId} // Cambia esto a egresadoId si es necesario
            onChange={handleAssignmentFormChange}
            required
          >
            <option value="">Seleccione un Egresado</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.first_name} {user.last_name}
              </option>
            ))}
          </select>

          <label htmlFor="mentorshipId">Seleccionar Mentoría</label>
          <select
            name="mentorshipId"
            value={assignmentData.mentorshipId}
            onChange={handleAssignmentFormChange}
            required
          >
            <option value="">Seleccione una Mentoría</option>
            {mentorships.map((mentorship) => (
              <option key={mentorship.id} value={mentorship.id}>
                {mentorship.title}
              </option>
            ))}
          </select>

          <button type="submit">Asignar Egresado</button>
        </form>

        <div className="dashboard__manager">
          <div className="dashboard__manager__select__container">
            <h2 className="dashboard__manager__select__title">Gestionar</h2>
            <ul className="dashboard__manager__select__list">
              {availableSections.map((section) => (
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
            <div className="dashboard__table__title__search__container">
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
            {activeSection === "MENTORIAS" && (
              <button
                onClick={() => {
                  setIsMentorShipClicked(!ismentorShipClicked);
                }}
              >
                Crear mentoría
              </button>
            )}
            {activeSection === "MENTORES" && (
              <button
                onClick={() => {
                  setIsMentorAssignmentClicked(!isMentorAssignmentClicked);
                }}
              >
                Asignar mentores
              </button>
            )}
            {activeSection === "EGRESADOS" && (
              <button
                onClick={() => {
                  setIsEgresadoAssignmentClicked(!isEgresadoAssignmentClicked);
                }}
              >
                Asignar egresados
              </button>
            )}
          </div>
          {renderTable()}
        </header>
      </div>
    </section>
  );
};
