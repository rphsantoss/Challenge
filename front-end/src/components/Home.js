import { useNavigate } from "react-router-dom";
import '../styles/Home.css';

const Home = () => {
    const navigate = useNavigate();

    return (
        <>
        <h1>Página Inicial</h1>
        <div className="home-container">
            
            <div className="button-container">
                <button 
                    className="home-button"
                    onClick={() => navigate("/events")}
                >
                    Eventos
                </button>
                
                <button 
                    className="home-button"
                    onClick={() => navigate("/create-event")}
                >
                    Criar Evento
                </button>
                
                <button 
                    className="home-button"
                    onClick={() => navigate("/registrations")}
                >
                    Inscritos
                </button>
                
                <button 
                    className="home-button"
                    onClick={() => navigate("/create-registration")}
                >
                    Se-Inscrever
                </button>
            </div>
        </div>
        </>
    );
};

export default Home;