import { Composition } from "remotion";
import { Partido, PartidoProps } from "./Partido";

// Datos del próximo partido: cámbialos aquí o desde el Studio.
const proximoPartido: PartidoProps = {
  competicion: "Junior Femenino Especial Bronce · Grupo 6",
  jornada: "Jornada 1",
  local: "CB Pozuelo",
  visitante: "Saltium Alcorcón Basket \"B\"",
  fecha: "Domingo 27/09/2026",
  hora: "13:00",
  pabellon: "Pabellón El Torreón",
};

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="Partido"
      component={Partido}
      durationInFrames={180}
      fps={30}
      width={1080}
      height={1920}
      defaultProps={proximoPartido}
    />
  );
};
