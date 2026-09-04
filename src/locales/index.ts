import en from "./en.json";
import es from "./es.json";
import fr from "./fr.json";
import hi from "./hi.json";
import ptBR from "./pt-BR.json";

const mergeMessages = (base: Record<string, unknown>, localized: Record<string, unknown>) => {
  const result: Record<string, unknown> = { ...base };

  for (const [key, value] of Object.entries(localized)) {
    const baseValue = result[key];
    result[key] =
      baseValue && typeof baseValue === "object" && value && typeof value === "object"
        ? mergeMessages(baseValue as Record<string, unknown>, value as Record<string, unknown>)
        : value;
  }

  return result;
};

const normalizeMessages = (value: unknown): unknown => {
  if (Array.isArray(value)) {
    return Object.fromEntries(value.map((item, index) => [index, normalizeMessages(item)]));
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, normalizeMessages(item)]),
    );
  }

  return value;
};

const baseMessages = normalizeMessages(ptBR) as Record<string, unknown>;
const englishMessages = mergeMessages(baseMessages, en);

export const messages = {
  en: englishMessages,
  es: mergeMessages(englishMessages, es),
  fr: mergeMessages(englishMessages, fr),
  hi: mergeMessages(englishMessages, hi),
  "pt-BR": baseMessages,
} as const;

export type Locale = keyof typeof messages;