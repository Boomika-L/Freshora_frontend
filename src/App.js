import './App.css';
import {BrowserRouter} from 'react-router-dom';
import AppRoutes from './Routers/AppRoutes';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <AppRoutes></AppRoutes>
      </BrowserRouter>
    </div>
  );
}

export default App;
