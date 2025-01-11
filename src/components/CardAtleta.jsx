import React from "react";

function CardAtleta({ piloto, adicionarFavorito }) {
  const imagemPilotoURL = `https://upload.wikimedia.org/wikipedia/commons/e/e1/Lewis_Hamilton_2019.jpg`; // Exemplo de imagem, substitua conforme necessário

  return (
    <div>
      <h3>{piloto.givenName} {piloto.familyName}</h3>
      <p><strong>País:</strong> {piloto.nationality}</p>
      <p><strong>Data de Nascimento:</strong> {piloto.dateOfBirth}</p>
      
      <img
        src={imagemPilotoURL}
        alt={piloto.givenName}
        width={150}
      />

      <button onClick={adicionarFavorito}>Adicionar aos Favoritos</button>
    </div>
  );
}

export default CardAtleta;
