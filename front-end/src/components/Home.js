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
                    Novo Evento
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
                    Nova Inscrição
                </button>
            </div>
        </div>
        </>
    );
};

export default Home;