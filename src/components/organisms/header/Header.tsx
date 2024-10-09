import "./Header.css";

export const Header = () => {
  return (
    <header className="header">
      <nav className="header__nav">
        <div className="header__nav__left">
          <span className="header__nav__title">PoloIT</span>
          <ul className="header__nav__list">
            <li className="header__nav__item">Navegacion</li>
            <li className="header__nav__item">Navegacion</li>
            <li className="header__nav__item">Navegacion</li>
            <li className="header__nav__item">Navegacion</li>
            <li className="header__nav__item">Navegacion</li>
            <li className="header__nav__item">Navegacion</li>
          </ul>
        </div>

        <span className="header__nav__right">config</span>
      </nav>
    </header>
  );
};
