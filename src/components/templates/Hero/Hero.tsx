import Icon from "@assets/icons/icon";
import "./Hero.css";

// Definir la interfaz para las props
interface HeroProps {
  currentUser: {
    first_name: string;
    role: {
      name: string;
    };
  } | null;
}

export const Hero: React.FC<HeroProps> = ({ currentUser }) => {
  return (
    <section className="hero">
      <article className="hero__left">
        <div className="hero__info__user">
          <span className="hero__info__user__date">
            {new Date().toLocaleString("es-AR", {
              dateStyle: "full",
              timeStyle: "short",
            })}
          </span>
          <div className="hero__info__user__name__rol">
            <h1 className="hero__info__user__name">
              BUENOS DÍAS{" "}
              <strong className="strong">
                {currentUser?.first_name.toUpperCase() || "USUARIO"}
              </strong>
            </h1>
            <span className="hero__info__user__rol">
              {currentUser?.role.name || "Rol Desconocido"}
            </span>
          </div>
        </div>
        <div className="hero__info__mentorship">
          <div className="hero__info__mentorship__left">
            <ul className="hero__info__mentorship__list">
              <li className="hero__info__mentorship__item">
                <strong className="strong--green">25 mentorías</strong> creadas
              </li>
              <li className="hero__info__mentorship__item">
                <strong className="strong--blue">15 egresados</strong> generados
              </li>
              <li className="hero__info__mentorship__item">
                <strong className="strong--red">15 mentorías</strong> sin mentor
              </li>
            </ul>
            <div className="hero__info__mentorship__buttons">
              {/* biome-ignore lint/a11y/useValidAnchor: <explanation> */}
              <a className="hero__info__mentorship__close" href="#">
                Cerrar sesión
              </a>
              {/* biome-ignore lint/a11y/useValidAnchor: <explanation> */}
              <a className="hero__info__mentorship__manage" href="#">
                Gestionar
              </a>
            </div>
          </div>
          <Icon name="decorationHome" width={340} height={340} />
        </div>
      </article>
      <article className="hero__right">
        <div className="hero__notifications">
          <span className="hero__notifications__show">Tus notificaciones</span>
          <span className="hero__notifications__clean">Limpiar historial</span>
        </div>
        <div className="hero__notifications__central">
          <div className="hero__notifications__texts">
            <p className="hero__notifications__diary">
              Hoy no tienes notificaciones
            </p>
            <p className="hero__notifications__alert">
              En esta sección podrás ver tus notificaciones
            </p>
          </div>
          <p className="hero__notifications__history">
            Consultar historial de notificaciones
          </p>
        </div>
      </article>
    </section>
  );
};
