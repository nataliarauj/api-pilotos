import React, { useEffect, useState } from "react";
import "./CardPiloto.css";

const CardPiloto = ({ piloto, adicionarAosFavoritos, favoritos, removerFavorito }) => {
  const [isFavorito, setIsFavorito] = useState(false); // Estado local para verificar se é favorito

  // Verifica se o piloto é favorito sempre que a lista de favoritos for atualizada
  useEffect(() => {
    setIsFavorito(favoritos.some((fav) => fav.driverId === piloto.driverId));
  }, [favoritos, piloto.driverId]);  // Atualiza se a lista de favoritos mudar

  return (
    <div className="card-container">
      <div className="card">
      <img
        src={piloto.image}
        alt={`Foto de ${piloto.name}`}
        className="w-24 h-24 rounded-full mb-4"
      />
    
      <h3 className="text-lg font-bold">{piloto.name}</h3>
      <p className="text-gray-600">Nacionalidade: {piloto.nationality}</p>
      <p className="text-gray-600">Pódios: {piloto.podiums}</p>
      <p className="text-gray-600">Equipe Atual: {piloto.currentTeam}</p>
      <p className="text-gray-600">Idade: {piloto.age} anos</p>

      <button onClick={() => adicionarAosFavoritos(piloto)}>
          Adicionar aos Favoritos
      </button>
    </div>
  </div>
  );
};

export default CardPiloto;
