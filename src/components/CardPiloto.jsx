import React, { useEffect, useState } from "react";
import "./CardPiloto.css";

const CardPiloto = ({ piloto, adicionarAosFavoritos, favoritos }) => {
  const [isFavorito, setIsFavorito] = useState(false);

  useEffect(() => {
    setIsFavorito(favoritos.some((fav) => fav.driverId === piloto.driverId));
  }, [favoritos, piloto.driverId]);

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

        <button onClick={() => adicionarAosFavoritos(piloto)}>
          Adicionar aos Favoritos
        </button>
      </div>
    </div>
  );
};

export default CardPiloto;
