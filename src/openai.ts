import OpenAI from "openai";

// NE JAMAIS FAIRE ÇA DANS UN PROJET RÉEL car la clé se retrouverait exposée dans le code source du navigateur.
// IDEM pour le dangerouslyAllowBrowser: true. Cela permet d'utiliser l'API OpenAI dans le navigateur, mais c'est dangereux.
export const openai = (apiKey: string) =>
  new OpenAI({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true,
  });
