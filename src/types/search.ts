import type { Character } from "./characters";

export interface AppState {
  characters: Character[];
  lastSearch: string | null;
  isLoading: boolean;
  error: string | null;
}
export interface HeaderProps {
  onSearch: (name: string) => Promise<void>;
}
