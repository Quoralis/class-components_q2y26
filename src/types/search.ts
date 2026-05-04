import type { Character } from "./characters";

export interface AppState {
  characters: Character[];
  lastSearch: string;
}
export interface HeaderProps {
  onSearch: (name: string) => Promise<void>;
}
