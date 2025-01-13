import { useState } from "react";
import axios from "axios";
import CardPiloto from "./components/CardPiloto";

const App = () => {
  const [pilotos, setPilotos] = useState([]); 
  const [favoritos, setFavoritos] = useState([]); 
  const [searchTerm, setSearchTerm] = useState(""); 
  const [loading, setLoading] = useState(false); 

  const fetchPilotos = async (nome) => {
    try {
      setLoading(true); 
      const response = await axios.get("https://v1.formula-1.api-sports.io/drivers", {
        headers: {
          "x-rapidapi-key": "70d6ef901f84a9596c55ba95b131f50a", 
          "x-rapidapi-host": "v1.formula-1.api-sports.io",
        },
        params: {
          search: nome, 
        },
      });

      const dadosPilotos = response.data.response;

     
      const pilotosNaoFavoritos = dadosPilotos.filter(
        (piloto) => !favoritos.some((fav) => fav.driverId === piloto.driverId)
      );

      setPilotos(pilotosNaoFavoritos);
    } catch (error) {
      console.error("Erro ao buscar os pilotos:", error);
    } finally {
      setLoading(false); 
    }
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value); 
  };

  const pesquisarPilotos = () => {
    if (searchTerm.trim() === "") return; 
    fetchPilotos(searchTerm); // Busca dados sem limpar os pilotos atuais
  };

  const adicionarAosFavoritos = (piloto) => {
    if (!favoritos.some((fav) => fav.driverId === piloto.driverId)) {
      setFavoritos((prevFavoritos) => [...prevFavoritos, piloto]);
      setPilotos((prevPilotos) =>
        prevPilotos.filter((p) => p.driverId !== piloto.driverId)
      );
    }
  };

  const removerFavorito = (piloto) => {
    setFavoritos(favoritos.filter((favorito) => favorito.driverId !== piloto.driverId));
  };

  return (
    <div>
      <h1>Pesquisa de Pilotos</h1>
      <input
        type="text"
        value={searchTerm}
        placeholder="Digite o nome do piloto"
        onChange={handleInputChange} 
        onKeyPress={(e) => e.key === "Enter" && pesquisarPilotos()} 
      />
      <button onClick={pesquisarPilotos} disabled={loading}>
        {loading ? "Pesquisando..." : "Pesquisar"}
      </button>

      {pilotos.length > 0 && (
        <div>
          <h2>Resultados da Pesquisa</h2>
          {pilotos.map((piloto) => (
            <CardPiloto
              key={piloto.driverId}
              piloto={piloto}
              adicionarAosFavoritos={adicionarAosFavoritos}
              favoritos={favoritos}
              removerFavorito={removerFavorito} 
            />
          ))}
        </div>
      )}

      <h2>Favoritos</h2>
      <div>
        {favoritos.length === 0 ? (
          <p>Nenhum piloto adicionado aos favoritos.</p>
        ) : (
          favoritos.map((piloto) => (
            <CardPiloto
              key={piloto.driverId}
              piloto={piloto}
              adicionarAosFavoritos={adicionarAosFavoritos}
              favoritos={favoritos}
              removerFavorito={removerFavorito} 
            />
          ))
        )}
      </div>
    </div>
  );
};

export default App;
