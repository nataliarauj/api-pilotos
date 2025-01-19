import React, { useState, useEffect } from "react";
import axios from "axios";
import CardPiloto from "./components/CardPiloto";
import PainelFavoritos from "./components/PainelFavoritos";

const App = () => {
  const [todosPilotos, setTodosPilotos] = useState([]);  // Todos os pilotos encontrados na pesquisa
  const [favoritos, setFavoritos] = useState([]);  // Lista de pilotos favoritos
  const [searchTerm, setSearchTerm] = useState("");  // Termo de pesquisa
  const [loading, setLoading] = useState(false);  // Indicador de carregamento

  const gerarIdUnico = (piloto) => {
    return `${piloto.name}-${piloto.nationality}`.toLowerCase().replace(/\s+/g, "-");
  };
  
  
  // Função para buscar pilotos
  const fetchPilotos = async (nome) => {
    try {
      setLoading(true);
      const response = await axios.get("https://v1.formula-1.api-sports.io/drivers", {
        headers: {
          "x-rapidapi-key": "70d6ef901f84a9596c55ba95b131f50a",
          "x-rapidapi-host": "v1.formula-1.api-sports.io",
        },
        params: { search: nome },
      });

      const dadosPilotos = response.data.response || [];
      const pilotosComId = dadosPilotos.map((piloto) => ({
        ...piloto,
        driverId: gerarIdUnico(piloto), // Adiciona um ID único
      }));

      setTodosPilotos(pilotosComId);  // Armazena todos os pilotos encontrados na pesquisa
    } catch (error) {
      console.error("Erro ao buscar os pilotos:", error);
    } finally {
      setLoading(false);
    }
  };

  // Adiciona um piloto aos favoritos
  const adicionarAosFavoritos = (piloto) => {
    setFavoritos((prevFavoritos) => {
      if (!prevFavoritos.some((fav) => fav.driverId === piloto.driverId)) {
        return [...prevFavoritos, piloto];
      }
      return prevFavoritos;
    });
  };
  
  const removerFavorito = (piloto) => {
    setFavoritos((prevFavoritos) =>
      prevFavoritos.filter((fav) => fav.driverId !== piloto.driverId)
    );
  };
  

  // Pesquisa pilotos ao clicar no botão
  const pesquisarPilotos = () => {
    if (searchTerm.trim() !== "") {
      fetchPilotos(searchTerm);
    }
  };

  // useEffect para monitorar favoritos (verificação de atualizações)
  useEffect(() => {
    console.log("Favoritos atualizados:", favoritos);
  }, [favoritos]);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
        <img src="../src/assets/img/icon.png" alt="Ícone Bandeira" width={100} style={{ marginBottom: '-30px' }} />
      </div>
      <h1>Pesquisa de Pilotos</h1>
      <div className="search-container">
        <input
          className="input-pilot-name"
          type="text"
          name="search-pilot"
          value={searchTerm}
          placeholder="Digite o nome do piloto"
          onChange={(e) => setSearchTerm(e.target.value)} 
          onKeyPress={(e) => e.key === "Enter" && pesquisarPilotos()}
        />
        <button className="btn-search" onClick={pesquisarPilotos} disabled={loading}>
          {loading ? "..." : <i class="fas fa-search"></i>}
        </button>
      </div>
      

      {/* Resultados da Pesquisa */}
      {todosPilotos.length > 0 ? (
        <div>
          <div className="card-container">
            {todosPilotos.map((piloto) => (
              <CardPiloto
                key={piloto.driverId}
                piloto={piloto}
                adicionarAosFavoritos={adicionarAosFavoritos}
                favoritos={favoritos}
                removerFavorito={removerFavorito}
              />
            ))}
          </div>
        </div>
      ) : (
        <p style={{ textAlign: "center", color: "#888" }}>
          <i className="fas fa-x"></i> Nenhum piloto encontrado.
        </p>
      )}

      {/* Lista de Favoritos */}
      <PainelFavoritos favoritos={favoritos} removerFavorito={removerFavorito} />
    </div>
  );
};

export default App;
