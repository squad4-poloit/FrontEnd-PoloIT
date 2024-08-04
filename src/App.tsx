import { Button } from '@components/atoms/button';
import './App.css';
import Icon from './assets/icons/icon';

function App() {
  return (
    <>
      <Button>Soy un boton que prueba importaciones</Button>
      <Icon name="dashboard" height={25} width={25} />
    </>
  );
}

export default App;
