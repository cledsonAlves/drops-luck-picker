import { toast } from "sonner";

const GITHUB_ISSUE_URL = "https://api.github.com/repos/cledsonAlves/drops-luck-picker/issues";
const GITHUB_TOKEN = "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";

interface Message {
  id: number;
  content: string;
  author: string;
  votes: number;
  timestamp: Date;
}

export const fetchOrCreateIssue = async (): Promise<Message[]> => {
  try {
    const response = await fetch(`${GITHUB_ISSUE_URL}/1`, {
      headers: {
        "Authorization": `token ${GITHUB_TOKEN}`,
        "Accept": "application/vnd.github.v3+json"
      }
    });

    if (response.status === 401) {
      toast.error("Erro de autenticação com o GitHub. Verifique o token de acesso.");
      return [];
    }

    if (response.status === 404) {
      return await createInitialIssue();
    }

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const issue = await response.json();
    return parseMessages(issue);
  } catch (error) {
    console.error("Error fetching messages:", error);
    toast.error("Erro ao carregar as mensagens");
    return [];
  }
};

const createInitialIssue = async (): Promise<Message[]> => {
  try {
    const initialBody = "| ID | Autor | Mensagem | Votos |\n|---|---|---|---|\n";
    const response = await fetch(GITHUB_ISSUE_URL, {
      method: "POST",
      headers: {
        "Authorization": `token ${GITHUB_TOKEN}`,
        "Accept": "application/vnd.github.v3+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "Mural de Recados",
        body: initialBody,
      }),
    });

    if (response.status === 401) {
      toast.error("Erro de autenticação com o GitHub. Verifique o token de acesso.");
      return [];
    }

    if (!response.ok) {
      throw new Error("Failed to create initial issue");
    }

    const issue = await response.json();
    return parseMessages(issue);
  } catch (error) {
    console.error("Error creating initial issue:", error);
    toast.error("Erro ao criar o mural de recados");
    return [];
  }
};

export const updateGithubIssue = async (messages: Message[]): Promise<void> => {
  try {
    const tableHeader = "| ID | Autor | Mensagem | Votos |\n|---|---|---|---|\n";
    const tableRows = messages
      .map((msg) => `| ${msg.id} | ${msg.author} | ${msg.content} | ${msg.votes} |`)
      .join("\n");
    const newBody = tableHeader + tableRows;

    const response = await fetch(`${GITHUB_ISSUE_URL}/1`, {
      method: "PATCH",
      headers: {
        "Authorization": `token ${GITHUB_TOKEN}`,
        "Accept": "application/vnd.github.v3+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        body: newBody,
      }),
    });

    if (response.status === 401) {
      toast.error("Erro de autenticação com o GitHub. Verifique o token de acesso.");
      return;
    }

    if (!response.ok) {
      throw new Error("Failed to update GitHub issue");
    }
  } catch (error) {
    console.error("Error updating GitHub issue:", error);
    toast.error("Erro ao salvar a mensagem");
  }
};

const parseMessages = (issue: any): Message[] => {
  const messageRegex = /\|\s*(.*?)\s*\|\s*(.*?)\s*\|\s*(.*?)\s*\|\s*(\d+)\s*\|/g;
  const matches = [...(issue.body?.matchAll(messageRegex) || [])];
  
  return matches.map((match) => ({
    id: parseInt(match[1]),
    author: match[2],
    content: match[3],
    votes: parseInt(match[4]),
    timestamp: new Date(),
  }));
};