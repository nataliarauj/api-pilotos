import React from "react";
import "./PainelFavoritos.css";

const PainelFavoritos = ({ favoritos, removerFavorito }) => {
  return (
    <div className="favorites">
      <h1>Pilotos Favoritos</h1>
      {favoritos.length === 0 ? (
        <p>Nenhum piloto adicionado aos favoritos.</p>
      ) : (
        <div className="favorites-container">
          {favoritos.map((piloto) => (
            <div key={piloto.driverId} className="card-favorite">
              <h3>{piloto.name}</h3>
              <img
                src={piloto.image || "default.jpg"}
                alt={`Foto de ${piloto.name}`}
                className="img-piloto"
              />
              <button
                onClick={() => removerFavorito(piloto)}
                className="btn-delete"
              >
                Remover dos Favoritos
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


export default PainelFavoritos;
