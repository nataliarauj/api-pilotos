import React, { useState } from "react";
import CardAtleta from "./components/CardAtleta";

function App() {
  const [driverName, setDriverName] = useState("");  
  const [piloto, setPiloto] = useState(null);        
  const [erro, setErro] = useState("");              
  const [favoritos, setFavoritos] = useState([]);

//Função de busca
  const buscarPiloto = async () => {
    if (!driverName) {
      setErro("Por favor, insira um nome de piloto.");
      return;
    }
  
    try {
      const response = await fetch(`https://ergast.com/api/f1/drivers.json`);
      const data = await response.json();
  
      const pilotoEncontrado = data.MRData.DriverTable.Drivers.find((driver) => {
        const nomeCompleto = `${driver.givenName} ${driver.familyName}`.toLowerCase();
        return nomeCompleto.includes(driverName.toLowerCase());
      });
  
      if (pilotoEncontrado) {
        setPiloto(pilotoEncontrado);
        setErro("");
      } else {
        setPiloto(null);
        setErro("Nenhum piloto encontrado com esse nome.");
      }
    } catch (error) {
      console.error("Erro ao buscar piloto:", error);
      setErro("Ocorreu um erro ao buscar os dados do piloto.");
    }
  };
  

//Adicionar aos favoritos
  const adicionarFavorito = () => {
    if (piloto && !favoritos.some((fav) => fav.driverId === piloto.driverId)) {
      setFavoritos([...favoritos, piloto]);
    }
  };

  return (
    <div>
      <h1>Pesquisa de Piloto de F1</h1>
      <input
        type="text"
        name="search-piloto"
        value={driverName}
        onChange={(e) => setDriverName(e.target.value)}
        placeholder="Digite o nome do piloto"
      />
      <button onClick={buscarPiloto}>Buscar Piloto</button>

      {erro && <p>{erro}</p>}

      {piloto && (
        <CardAtleta piloto={piloto} adicionarFavorito={adicionarFavorito} />
      )}

      <h2>Favoritos</h2>
      <ul>
        {favoritos.map((fav) => (
          <li key={fav.driverId}>
            {fav.givenName} {fav.familyName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
