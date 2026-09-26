import {
  BrickWall,
  Building,
  Cuboid,
  GraduationCap,
  Handshake,
  HardHat,
  Landmark,
  Route,
  Umbrella,
  BuildingComplex,
  type LucideIcon,
} from "lucide-react";
import type { MarketIcon, ServiceIcon } from "@/data/site";

export const serviceIcons: Record<ServiceIcon, LucideIcon> = {
  masonry: BrickWall,
  concrete: Cuboid,
  paving: Route,
  roofing: Umbrella,
  restoration: Building,
  general: HardHat,
};

export const marketIcons: Record<MarketIcon, LucideIcon> = {
  education: GraduationCap,
  municipal: Landmark,
  commercial: BuildingComplex,
  partnership: Handshake,
};
