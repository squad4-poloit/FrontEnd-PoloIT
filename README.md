# FrontEnd-PoloIT

## Descripción
FrontEnd-PoloIT es un sistema de gestión de inscripciones para cursos, desarrollado con React y TypeScript.

## Instalación

1. Clona el repositorio:
 ``` bash
   git clone https://github.com/MatiasPinho/FrontEnd-PoloIT 
  ```
  2. Instala las depedencias:
``` bash
cd FrontEnd-PoloIT
npm install
```

  3. Ejecuta el proyecto en modo de desarollo:
``` bash
 Npm run dev
```
Este comando ejecutará el proyecto en modo de desarrollo, generalmente en http://localhost:3000, y activará características como recarga en caliente y depuración.

 4. Crea la build:
``` bash
 Npm run build
```

 4. Ejecuta el Proyecto en Modo Producción (opcional)
``` bash
 Npm run start
```
# Atomic Design en Nuestro Proyecto

**Atomic Design** organiza los componentes en una estructura jerárquica y modular.

## Estructura de Carpetas

- **src/**
  - **components/**
    - **atoms/**: Componentes básicos e indivisibles (e.g., botones).

    - **molecules/**: Combinaciones de átomos (e.g., barras de búsqueda).

    - **organisms/**: Secciones completas (e.g., encabezados).

    - **templates/**:  Estructuras de diseño de página.

    - **pages/**: Páginas completas ensambladas con plantillas.

## Ejemplo de Implementación

### Atom
``` JSX
/*
 src/components/atoms/Button/Button.jsx
 */
const Button = ({ label, onClick }) => (
  <button className="button" onClick={onClick}>
    {label}
  </button>
);

```

### Molecule
```jsx
/*
 src/components/molecules/SearchBar/SearchBar.jsx
 */
import Button from '../atoms/Button/Button';
const SearchBar = ({ placeholder, onSearch }) => (
  <div className="search-bar">
    <input type="text" placeholder={placeholder} />
    <Button label="Search" onClick={onSearch} />
  </div>
);
```

### Organism
```jsx
/*
src/components/organisms/Header/Header.jsx
*/ 
import SearchBar from '../molecules/SearchBar/SearchBar';
const Header = () => (
  <header className="header">
    <h1>My App</h1>
    <SearchBar placeholder="Search..." onSearch={() => console.log('Searching...')} />
  </header>
);

```
### Template
```jsx
/* 
#### src/components/templates/Home/Home.jsx
*/
import Header from '../../organisms/Header/Header';
const Home = ({ children }) => (
  <div className="Home">
    <Header />
    <main>{children}</main>
  </div>
);
```
### Page
```jsx
  /* src/components/pages/HomePage/HomePage.jsx
  */
import Home from '../../templates/Home/Home';
const HeroPage = () => (
  <Home>
    <h2>Welcome to the main Page!</h2>
  </Home>
);
```

## Services 

Los servicios manejan solicitudes de red y la lógica de datos.

Se encargan de interactuar con APIs o bases de datos.

``` JSX 
export const fetchDataFromService = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Fetch error: ${error.message}`);
  }
};
```

### nota

Encapsulación: Los servicios encapsulan la lógica de las solicitudes, lo que permite una separación clara de responsabilidades.

## Hooks
Los hooks encapsulan lógica reutilizable en componentes funcionales, como la gestión de datos y estado.
``` JSX
// src/hooks/useFetch.tsx
import { useState, useEffect } from 'react';
import { fetchDataFromService } from '../services/dataService';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchDataFunction(url);
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchDataFunction]);

  return { data, loading, error };
};

export default useFetch;

```

### nota

Reutilización: El hook useFetch se puede utilizar en múltiples componentes para gestionar el estado y los datos de la misma manera.

Separación de responsabilidades: Los hooks no manejan la lógica de los datos directamente, sino que delegan esa responsabilidad a los servicios.

### Ejemplo de uso

Luego lo utilizamos en otro componente sin tener que volver a definirlo
``` JSX
// src/components/MyComponent.js
import useFetch from '../hooks/useFetch';


const MyComponent = () => {
  const url = "https://api.com/example"
  const { data, loading, error } = useFetch(url);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <div>{data}</div>;
};
```
### Beneficios

Modularidad: Cada componente o hook gestiona solo la parte que le corresponde, lo que facilita el mantenimiento y la evolución del código.
Reutilización: La lógica en los servicios y hooks puede ser reutilizada en diferentes partes de la aplicación sin duplicación.


### Utils
Funciones generales reutilizables que no están directamente relacionadas con React.
``` JSX
// src/utils/formatDate.js
/**
 * Formats a date to 'dd/mm/yyyy'
 * @param {Date} date - The date to format
 * @returns {string} - The formatted date
 */
export const formatDate = (date) => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};
```

### Reutilizacion
``` JSX
// src/components/SomeComponent/SomeComponent.jsx

import React from 'react';
import { formatDate } from '../../utils/formatDate';

const SomeComponent = ({ date }) => {
  return (
    <div>
      <p>Formatted Date: {formatDate(new Date(date))}</p>
    </div>
  );
};

export default SomeComponent;
``` 

# Como utilizar los iconos

## Definición de Iconos

Los iconos se definen como componentes funcionales de React en el archivo de iconos. Cada icono es un componente que recibe propiedades de SVG (SvgProps) y renderiza un SVG específico.

``` JSX

interface SvgProps extends React.SVGProps<SVGSVGElement> {}

export const Dashboard: React.FC<SvgProps> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      {/* Resto del svg*/}
    </svg>
  );
};
```

## Componente General para Iconos

Para simplificar el uso de los iconos en diferentes partes de la aplicación, se ha creado un componente Icon. Este componente acepta un nombre de icono y renderiza el icono correspondiente

``` JSX
import {
    Dashboard,
    Projects,
    Task,
} from "./icons";

const iconComponents = {
    dashboard: Dashboard,
    projects: Projects,
    task: Task
};

type IconName = keyof typeof iconComponents;

interface IconProps extends React.SVGProps<SVGSVGElement> {
    name: IconName;
}

const Icon: React.FC<IconProps> = ({ name, ...props }) => {
    const IconComponent = iconComponents[name];
    if (!IconComponent) {
        return null;
    }
    return <IconComponent {...props} />;
};

export default Icon;
```
## Uso del componente

Para usar el componente Icon, simplemente importa Icon y pasa el nombre del icono que deseas renderizar como una propiedad name. Puedes agregar propiedades adicionales para ajustar el estilo del icono.
```JSX
import Icon from "./Icon";

const MyComponent: React.FC = () => {
  return (
    <div>
      <Icon name="dashboard" width="32" height="32" fill="#000" />
      <Icon name="projects" width="24" height="24" fill="#333" />
      <Icon name="task" width="16" height="16" fill="#666" />
    </div>
  );
};
```

# Uso de Alias de Importación en TypeScript

En nuestro proyecto, hemos configurado TypeScript para usar alias de importación. Esto nos permite simplificar las rutas de importación y hacer nuestro código más limpio y manejable.

##  Configuración de tsconfig.app.json:
Para definir alias de importación, utilizamos el archivo tsconfig.app.json. En este archivo, se especifican las rutas base y los alias en la sección compilerOptions.

```JSON
{
  "compilerOptions": {
    "baseUrl": "./src",
    "paths": {
      "@components/*": ["components/*"],
      "@utils/*": ["utils/*"],
      "@types/*": ["types/*"]
    }
  }
}
```

##  Como funciona

**baseUrl**: Define la raíz de los módulos para los alias (en este caso, **./src**).
**paths**: Define los alias de importación. Por ejemplo, @components/* se refiere a la carpeta **src/components**.

## Ejemplo de Uso:

``` JSX
import { Button } from '@components/atoms/button'; // Utiliza el alias definido
import { formatDate } from '@utils/date'; // Utiliza el alias definido
```


# (Block, Element, Modifier) en Nuestro Proyecto

BEM es una metodología para nombrar clases CSS que facilita la escalabilidad y evita conflictos.
Ejemplos
Block: .button
Element: .button__icon
Modifier: .button--primary

## Ejemplos de Uso

### Bloque

``` HTML

<!-- Un bloque de botón -->
<button class="button">Click me</button>

```

### Elemento

``` HTML

<!-- Un elemento dentro del bloque de botón -->
<button class="button">
  <span class="button__icon">🔍</span>
  <span class="button__label">Search</span>
</button>

```

### Modificador

``` HTML

<!-- Un botón con un modificador -->
<button class="button button--primary">Submit</button>

```
### Ejemplo de Estructura


``` HTML
<header class="header">
  <nav class="header__nav">
    <ul class="header__list">
      <li class="header__list-item">
        <a href="#" class="header__link">Home</a>
      </li>
      <li class="header__list-item">
        <a href="#" class="header__link">About</a>
      </li>
    </ul>
    <div class="header__logo">
      <img src="logo.png" alt="Logo" class="header__logo-img" />
    </div>
  </nav>
</header>

```

## Orden de CSS

Estructura de Estilos

**colors.css**: Colores.

**fonts.css**: Fuentes.

**global.css**: Estilos generales.

**reset.css**: Normalización de estilos.

### Importación en index.css:

```CSS
/* Index.css
Se encuentra en la raiz
*/
@import "./styles/reset.css";
@import "./styles/global.css";
@import "./styles/colors.css";
@import "./styles/fonts.css"
```


Para mantener un historial de commits claro y organizado, seguiremos el siguiente formato para los mensajes de commit.

<tipo>(<área>): <descripción>

<mensaje detallado>

<nota>

## Idioma ingles
Los commits seran en ingles.

## Tipos de Commit
**feat**: Nueva característica para el usuario
Ejemplo: feat(auth): add user login functionality

**fix**: Corrección de un bug
Ejemplo: fix(button): resolve alignment issue

**docs**: Cambios en la documentación
Ejemplo: docs(readme): update setup instructions

**style**: Cambios en el formato del código (espacios, comas, etc.) sin afectar el funcionamiento
Ejemplo: style(header): adjust padding

**refactor**: Cambios en el código que no afectan el comportamiento (reestructuración)

**Ejemplo**: refactor(api): optimize data fetching logic
test: Añadir pruebas faltantes o corregir pruebas existentes

**Ejemplo**: test(auth): add tests for login functionality
build: Cambios en los archivos de construcción (por ejemplo, webpack, gulp, etc.)
**Ejemplo**: build(config): update webpack configuration

ci: Cambios en los archivos de CI/CD
**Ejemplo**: ci(circleci): add linting step

chore: Otras tareas que no encajan en las categorías anteriores (actualización de dependencias, etc.)
**Ejemplo**: chore(deps): update dependencies


## Convenciones Adicionales

 Longitud del Mensaje: Mantén la línea de descripción (primer línea) breve y clara (máximo 72 caracteres).
 
 El mensaje detallado puede extenderse a múltiples líneas

 # Como utilizar Biome

 Biome es una herramienta para la configuración de linters y formateadores. A continuación una breve explicacion de como la implementamos en nuestro proyecto

 # Comandos

 ``` JSON
"biome:format:check": "@biome format ./src"
 ```

 Descripción: Ejecuta el formateador de Biome para verificar el formato del código en la carpeta ./src.

Uso: Revisa si el código en ./src cumple con las reglas de formato definidas en tu configuración, pero no realiza cambios.

``` JSON
"biome:format:write": "@biome format --write ./src"
 ```

 Descripción: Ejecuta el formateador de Biome para formatear el código en la carpeta ./src.

Uso: 
Revisa y corrige automáticamente el formato del código en ./src según las reglas definidas.
Realiza cambios en los archivos si es necesario.

``` JSON
"biome:lint:check": "npx @biomejs/biome lint ./src"
 ```

Descripción: Ejecuta el linter de Biome para verificar el código en la carpeta ./src.

Uso: Revisa el código en ./src en busca de errores y advertencias según las reglas definidas en la configuración de linter, pero no realiza cambios.

``` JSON
"biome:lint:write": "npx @biomejs/biome check --write ./src"
 ```

Descripción: Ejecuta el linter de Biome para revisar y corregir el código en la carpeta ./src.

Uso: Revisa el código en ./src y aplica correcciones automáticas a los problemas detectados según las reglas definidas en la configuración del linter.

# Subir Cambios

 #### Obten la ultima version

 ``` bash
git pull origin dev
 ```

 #### Crea la nueva version

  Esto mantiene la rama dev limpia y permite realizar revisiones y pruebas sin afectar la base de código principal de desarollo.

   ``` bash
git switch -c feature/nueva-funcionalidad
 ```

 #### Realiza Cambios y Realiza Commits

 Haz los cambios necesarios en tu código y realiza commits con mensajes claros y descriptivos. Sigue el formato de mensajes de commit explicando anteriormente para mantener un historial organizado.

   ``` bash
git archivo a subir o en su defecto todo( . )
git commit -m "Descripción clara y concisa del cambio"
 ```

 #### Actualiza tu Rama con la Última Versión de dev

 Antes de subir tus cambios, asegúrate de que tu rama esté actualizada con la última versión de main para evitar conflictos:
  ``` bash
 git fetch origin
 git rebase origin/main
 ```
