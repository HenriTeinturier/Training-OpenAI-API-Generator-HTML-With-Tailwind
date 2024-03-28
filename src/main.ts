import { openai } from "./openai";

const form = document.querySelector("#generate-form") as HTMLFormElement;

const assistantContent =
  "Tu crées des sites web Tailwind. Ta tâche est de générer du code html avec Tailwind en fonction du prompt de l’utilisateur. Tu renvois uniquement du code HTML sans aucun texte avant ou après. Ne met jamais de ```. Tu n'ajoutes jamais de syntaxe markdown. Tu renvois du HTML valide. ";

const passPromptToOpenAi = async (prompt: string) => {
  const iframe = document.getElementById("generated-code") as HTMLIFrameElement;

  const chatCompletion = await openai.chat.completions.create({
    messages: [
      { role: "user", content: prompt },
      { role: "system", content: assistantContent },
    ],
    model: "gpt-3.5-turbo",
  });

  const chatCompletionHtml = chatCompletion.choices[0].message.content;

  if (!chatCompletionHtml) {
    alert("No completion found");
    return;
  }

  iframe.srcdoc = `<!DOCTYPE html>
    <html>
      <head>
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
      </head>
      <body>${chatCompletion.choices[0].message.content}</body>
    </html>`;

  document.body.appendChild(iframe);
  // iframe.contentWindow?.postMessage(prompt, "*");
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(form);

  const prompt = formData.get("prompt") as string;

  passPromptToOpenAi(prompt);
});
