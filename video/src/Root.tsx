import { Composition } from "remotion";
import { Partido, PartidoProps } from "./Partido";

// Datos del próximo partido: cámbialos aquí o desde el Studio.
const proximoPartido: PartidoProps = {
  competicion: "Junior Femenino Especial Bronce · Grupo 6",
  jornada: "Próximo partido",
  local: "Uros A",
  visitante: "CB Pozuelo",
  fecha: "Sábado 17/10/2026",
  hora: "11:30",
  pabellon: "Pabellón Los Almendros · Rivas-Vaciamadrid",
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
