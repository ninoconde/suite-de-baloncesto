import { Composition } from "remotion";
import { Partido, PartidoProps } from "./Partido";

// Datos del próximo partido: cámbialos aquí o desde el Studio.
const proximoPartido: PartidoProps = {
  competicion: "Junior Femenino Especial Bronce · Grupo 6",
  jornada: "Jornada 5",
  local: "CB Pozuelo",
  visitante: "Uros de Rivas \"B\"",
  fecha: "Domingo 25/10/2026",
  hora: "16:00",
  pabellon: "Pabellón UFV · Pozuelo de Alarcón",
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
