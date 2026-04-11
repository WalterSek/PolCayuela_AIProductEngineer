// Import Project type first
import type { Project } from "@/data/types/project";

// Import individual projects
import { culinaria } from "./culinaria";
import { infinitevisuals } from "./infinitevisuals";
import { kryptodash } from "./kryptodash";
import { pxlmorph } from "./pxlmorph";

// Re-export Project interface from types
export type { Project } from "@/data/types/project";

// Export projects array (order matters for display)
export const projects: Project[] = [
  culinaria,
  infinitevisuals,
  kryptodash,
  pxlmorph,
];

// Export individual projects for selective imports
export { culinaria, infinitevisuals, kryptodash, pxlmorph };
