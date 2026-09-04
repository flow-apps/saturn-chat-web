import en from "./en.json";
import es from "./es.json";
import fr from "./fr.json";
import hi from "./hi.json";
import ptBR from "./pt-BR.json";

export const messages = {
  en,
  es,
  fr,
  hi,
  "pt-BR": ptBR,
} as const;

export type Locale = keyof typeof messages;