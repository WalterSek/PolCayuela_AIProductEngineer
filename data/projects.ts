// Backward compatibility: re-export from modular structure
// For new code, prefer importing from `@/data/projects` directly
export type { Project } from "@/data/types/project";
export { projects, culinaria, infinitevisuals, kryptodash, pxlmorph } from "./projects/index";
