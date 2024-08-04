// estos iconos no son los que se utilizaran en el proyecto, solo estan para probar la funcionalidad
import {
    Dashboard,
    Projects,
    Task,
  } from "./icons";
  
  const iconComponents = {
    dashboard:Dashboard,
    projects:Projects,
    task:Task
   
  };
  type IconName = keyof typeof iconComponents;
  interface iconProps extends React.SVGProps<SVGSVGElement> {
    name: IconName;
  }
  
  const Icon: React.FC<iconProps> = ({ name, ...props }) => {
    const IconComponent = iconComponents[name];
    if (!IconComponent) {
      return null;
    }
    return <IconComponent {...props} />;
  };
  
  export default Icon;