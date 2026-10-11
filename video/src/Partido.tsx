import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export type PartidoProps = {
  competicion: string;
  jornada: string;
  local: string;
  visitante: string;
  fecha: string;
  hora: string;
  pabellon: string;
};

const NARANJA = "#f97316";
const FONDO = "#0b1220";

// Entrada con muelle a partir de un frame concreto.
const useEntrada = (desde: number) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - desde, fps, config: { damping: 14 } });
};

const Balon: React.FC = () => {
  const frame = useCurrentFrame();
  const entrada = useEntrada(0);
  const rotacion = interpolate(frame, [0, 180], [0, 360]);
  return (
    <svg
      width={260}
      height={260}
      viewBox="0 0 100 100"
      style={{ transform: `scale(${entrada}) rotate(${rotacion}deg)` }}
    >
      <circle cx="50" cy="50" r="47" fill={NARANJA} stroke="#1f1f1f" strokeWidth="3" />
      <path d="M3 50 H97 M50 3 V97" stroke="#1f1f1f" strokeWidth="3" fill="none" />
      <path d="M18 14 Q38 50 18 86 M82 14 Q62 50 82 86" stroke="#1f1f1f" strokeWidth="3" fill="none" />
    </svg>
  );
};

const Equipo: React.FC<{ nombre: string; desde: number; lado: 1 | -1 }> = ({
  nombre,
  desde,
  lado,
}) => {
  const entrada = useEntrada(desde);
  const x = interpolate(entrada, [0, 1], [lado * 1200, 0]);
  return (
    <div
      style={{
        transform: `translateX(${x}px)`,
        fontSize: 92,
        fontWeight: 900,
        textTransform: "uppercase",
        textAlign: "center",
        lineHeight: 1.05,
        padding: "0 60px",
      }}
    >
      {nombre}
    </div>
  );
};

export const Partido: React.FC<PartidoProps> = (props) => {
  const frame = useCurrentFrame();
  const vs = useEntrada(40);
  const datos = interpolate(frame, [75, 95], [0, 1], { extrapolateRight: "clamp" });
  const salida = interpolate(frame, [160, 180], [1, 0], { extrapolateLeft: "clamp" });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: FONDO,
        backgroundImage: `radial-gradient(circle at 50% 30%, ${NARANJA}33, transparent 60%)`,
        color: "white",
        fontFamily: "Inter, Helvetica, Arial, sans-serif",
        alignItems: "center",
        justifyContent: "center",
        gap: 50,
        opacity: salida,
      }}
    >
      <Balon />
      <div style={{ fontSize: 40, letterSpacing: 6, color: NARANJA, fontWeight: 700 }}>
        {props.jornada.toUpperCase()}
      </div>
      <Equipo nombre={props.local} desde={15} lado={-1} />
      <div style={{ fontSize: 120, fontWeight: 900, color: NARANJA, transform: `scale(${vs})` }}>
        VS
      </div>
      <Equipo nombre={props.visitante} desde={25} lado={1} />
      <div
        style={{
          opacity: datos,
          transform: `translateY(${(1 - datos) * 40}px)`,
          textAlign: "center",
          fontSize: 48,
          lineHeight: 1.5,
        }}
      >
        <div style={{ fontWeight: 700 }}>
          {props.fecha} · {props.hora}
        </div>
        <div>{props.pabellon}</div>
        <div style={{ fontSize: 30, opacity: 0.7, marginTop: 20 }}>{props.competicion}</div>
      </div>
    </AbsoluteFill>
  );
};
