import React, { useEffect, useState } from "react";

const CardPiloto = ({ piloto, adicionarAosFavoritos, favoritos, removerFavorito }) => {
  const [isFavorito, setIsFavorito] = useState(false); // Estado local para verificar se é favorito

  // Verifica se o piloto é favorito sempre que a lista de favoritos for atualizada
  useEffect(() => {
    setIsFavorito(favoritos.some((fav) => fav.driverId === piloto.driverId));
  }, [favoritos, piloto.driverId]);  // Atualiza se a lista de favoritos mudar

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center">
      <img
        src={piloto.image}
        alt={`Foto de ${piloto.name}`}
        className="w-24 h-24 rounded-full mb-4"
      />
      <h3 className="text-lg font-bold">{piloto.name}</h3>
      <p className="text-gray-600">Nacionalidade: {piloto.nationality}</p>
      <p className="text-gray-600">Pódios: {piloto.podiums}</p>
      
      {isFavorito ? (
        <button
          className="bg-red-500 text-white px-4 py-2 rounded mt-4 hover:bg-red-600"
          onClick={() => removerFavorito(piloto)}
        >
          Remover dos Favoritos
        </button>
      ) : (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600"
          onClick={() => adicionarAosFavoritos(piloto)}
        >
          Adicionar aos Favoritos
        </button>
      )}
    </div>
  );
};

export default CardPiloto;
