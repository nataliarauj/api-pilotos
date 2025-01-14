import React from "react";

const PainelFavoritos = ({ favoritos, removerFavorito }) => {
  return (
    <div>
      <h2>Favoritos</h2>
      {favoritos.length === 0 ? (
        <p>Nenhum piloto adicionado aos favoritos.</p>
      ) : (
        favoritos.map((piloto) => (
          <div key={piloto.driverId} style={{ marginBottom: "15px" }}>
            <h3>{piloto.name}</h3>
            <img
              src={piloto.image || "default.jpg"}
              alt={`Foto de ${piloto.name}`}
              className="img-piloto"
              style={{ width: "100px", height: "auto", borderRadius: "8px" }}
            />
            <button
              onClick={() => removerFavorito(piloto)}
              style={{
                marginLeft: "10px",
                padding: "5px 10px",
                backgroundColor: "#f44336",
                color: "white",
                border: "none",
                borderRadius: "5px",
              }}
            >
              Remover dos Favoritos
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default PainelFavoritos;
