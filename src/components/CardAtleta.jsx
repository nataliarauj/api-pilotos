import React from "react";

const CardAtleta = ({ piloto }) => {
  return (
    <div className="card">
      <h2>{piloto?.firstname} {piloto?.lastname}</h2>
      {piloto?.image ? (
        <img src={piloto.image} alt={`${piloto.firstname} ${piloto.lastname}`} />
      ) : (
        <p>Foto não disponível</p>
      )}
      <p>Equipe: {piloto?.team}</p>
      <p>País: {piloto?.nationality}</p>
    </div>
  );
};

export default CardAtleta;