import type { Character } from "./characters";

export interface AppState {
  characters: Character[];
}
export interface HeaderProps {
  onSearch: (name: string) => Promise<void>;
}
