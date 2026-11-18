import { DelusionMeterDisplay } from "./DelusionMeterDisplay";

type Props = {
  position: number;
};

/** Card variant (optional; footer uses DelusionMeterDisplay directly). */
export function DelusionMeter({ position }: Props) {
  return <DelusionMeterDisplay position={position} variant="card" />;
}