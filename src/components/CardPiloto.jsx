import React from "react";

const CardPiloto = ({ piloto, adicionarAosFavoritos, favoritos, removerFavorito }) => {

  const isFavorito = favoritos.some((fav) => fav.driverId === piloto.driverId);

  return (
    <div className="card">
      <h3>{piloto.name}</h3>
      <img
        src={piloto.image || "https://via.placeholder.com/150"} 
        alt={`Foto de ${piloto.name}`}
        className="img-piloto"
      />
      <p>Nacionalidade: {piloto.nationality}</p>
      <p>Pódios: {piloto.podiums}</p>

      {}
      {!isFavorito ? (
        <button onClick={() => adicionarAosFavoritos(piloto)}>
          Adicionar aos Favoritos
        </button>
      ) : (
       
        <button onClick={() => removerFavorito(piloto)}>
          Remover dos Favoritos
        </button>
      )}
    </div>
  );
};

export default CardPiloto;
