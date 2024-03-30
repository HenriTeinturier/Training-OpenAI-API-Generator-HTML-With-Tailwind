import { openai } from "./openai";

const form = document.querySelector("#generate-form") as HTMLFormElement;
const iframe = document.getElementById("generated-code") as HTMLIFrameElement;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(form);

  const prompt = formData.get("prompt") as string;

  passPromptToOpenAi(prompt);
});

const assistantContent =
  "Tu crées des sites web Tailwind. Ta tâche est de générer du code html avec Tailwind en fonction du prompt de l’utilisateur. Tu renvois uniquement du code HTML sans aucun texte avant ou après. Ne met jamais de ```. Tu n'ajoutes jamais de syntaxe markdown. Tu renvois du HTML valide. ";

const passPromptToOpenAi = async (prompt: string) => {
  const chatCompletion = await openai.chat.completions.create({
    messages: [
      { role: "user", content: prompt },
      { role: "system", content: assistantContent },
    ],
    stream: true,
    model: "gpt-3.5-turbo",
  });

  let code = "";
  const onNewChunk = createTimedUpdateIframe();

  for await (const message of chatCompletion) {
    const isDone = message.choices[0].finish_reason === "stop";
    // const isDone = message.child.finish_reason === "stop";
    const token = message.choices[0].delta.content;
    code += token;
    onNewChunk(code);
    if (isDone) {
      alert("Code généré avec succès !");
      break;
    }
  }
  document.body.appendChild(iframe);
};

const createTimedUpdateIframe = () => {
  let date = new Date();
  let timeOut: any = null;

  return (code: string) => {
    // only call updateIframe if the last call was more than 1 second ago
    const now = new Date();
    if (now.getTime() - date.getTime() > 1000) {
      updateIframe(code);
      date = now;
    }

    // clear the timeout
    if (timeOut) {
      clearTimeout(timeOut);
    }

    // set a new timeout
    timeOut = setTimeout(() => {
      updateIframe(code);
    }, 1000);
  };
};

const updateIframe = (code: string) => {
  iframe.srcdoc = `<!DOCTYPE html>
    <html>
      <head>
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
      </head>
      <body>${code}</body>
    </html>`;
};
