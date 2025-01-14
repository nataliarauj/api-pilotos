import { useState } from "react";
import axios from "axios";
import CardPiloto from "./components/CardPiloto";
import PainelFavoritos from "./components/PainelFavoritos";

const App = () => {
  const [todosPilotos, setTodosPilotos] = useState([]);  // Todos os pilotos encontrados na pesquisa
  const [favoritos, setFavoritos] = useState([]);  // Lista de pilotos favoritos
  const [searchTerm, setSearchTerm] = useState("");  // Termo de pesquisa
  const [loading, setLoading] = useState(false);  // Indicador de carregamento

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
      setTodosPilotos(dadosPilotos);  // Armazenar todos os pilotos encontrados na pesquisa
    } catch (error) {
      console.error("Erro ao buscar os pilotos:", error);
    } finally {
      setLoading(false);
    }
  };

  // Adiciona um piloto aos favoritos
  const adicionarAosFavoritos = (piloto) => {
    if (!favoritos.some((fav) => fav.driverId === piloto.driverId)) {
      setFavoritos([...favoritos, piloto]);  // Adiciona aos favoritos
    }
  };

  // Remove um piloto dos favoritos
  const removerFavorito = (piloto) => {
    setFavoritos(favoritos.filter((fav) => fav.driverId !== piloto.driverId));  // Remove dos favoritos
  };

  // Pesquisa pilotos ao clicar no botão
  const pesquisarPilotos = () => {
    if (searchTerm.trim() !== "") {
      fetchPilotos(searchTerm);  // Realiza a busca
    }
  };

  return (
    <div>
      <h1>Pesquisa de Pilotos</h1>
      <input
        type="text"
        value={searchTerm}
        placeholder="Digite o nome do piloto"
        onChange={(e) => setSearchTerm(e.target.value)}  // Atualiza o termo de pesquisa
        onKeyPress={(e) => e.key === "Enter" && pesquisarPilotos()}  // Pesquisa ao pressionar Enter
      />
      <button onClick={pesquisarPilotos} disabled={loading}>
        {loading ? "Pesquisando..." : "Pesquisar"}
      </button>

      {/* Resultados da Pesquisa */}
      {todosPilotos.length > 0 ? (
        <div>
          <h2>Resultados da Pesquisa</h2>
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
      ) : (
        <p>{loading ? "Carregando..." : "Nenhum piloto encontrado."}</p>
      )}

      {/* Lista de Favoritos */}
      <PainelFavoritos favoritos={favoritos} removerFavorito={removerFavorito} />
    </div>
  );
};

export default App;
