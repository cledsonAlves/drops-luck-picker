import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Header } from "@/components/Header";
import { RaffleCard } from "@/components/RaffleCard";
import { ActivityCard } from "@/components/ActivityCard";
import { CoffeeCard } from "@/components/CoffeeCard";
import { MessageBoard } from "@/components/MessageBoard";
import { PhotoGallery } from "@/components/PhotoGallery";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardTab from "@/components/DashboardTab";
import { MessagesTab } from "@/components/MessagesTab";

interface Message {
  id: number;
  content: string;
  author: string;
  votes: number;
  timestamp: Date;
}

const GITHUB_ISSUE_URL = "https://api.github.com/repos/cledsonAlves/drops-luck-picker/issues/1";
const GITHUB_TOKEN = "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";

const Index = () => {
  const [participants, setParticipants] = useState<string[]>([]);
  const [winner, setWinner] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch(GITHUB_ISSUE_URL, {
        headers: {
          "Authorization": `Bearer ${GITHUB_TOKEN}`,
          "Accept": "application/vnd.github.v3+json"
        }
      });
      const issue = await response.json();
      
      // Parse messages from issue body
      const messageRegex = /\|\s*(.*?)\s*\|\s*(.*?)\s*\|\s*(.*?)\s*\|\s*(\d+)\s*\|/g;
      const matches = [...(issue.body?.matchAll(messageRegex) || [])];
      
      const parsedMessages: Message[] = matches.map((match) => ({
        id: parseInt(match[1]),
        author: match[2],
        content: match[3],
        votes: parseInt(match[4]),
        timestamp: new Date(),
      }));

      setMessages(parsedMessages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      toast.error("Erro ao carregar as mensagens");
    }
  };

  const updateGithubIssue = async (newMessages: Message[]) => {
    try {
      // Format messages as markdown table
      const tableHeader = "| ID | Autor | Mensagem | Votos |\n|---|---|---|---|\n";
      const tableRows = newMessages
        .map((msg) => `| ${msg.id} | ${msg.author} | ${msg.content} | ${msg.votes} |`)
        .join("\n");
      const newBody = tableHeader + tableRows;

      const response = await fetch(GITHUB_ISSUE_URL, {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${GITHUB_TOKEN}`,
          "Accept": "application/vnd.github.v3+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          body: newBody,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update GitHub issue");
      }
    } catch (error) {
      console.error("Error updating GitHub issue:", error);
      toast.error("Erro ao salvar a mensagem");
    }
  };

  const handleAddMessage = (author: string, content: string) => {
    if (!content.trim() || !author.trim()) {
      toast.error("Por favor, preencha todos os campos!");
      return;
    }

    const newMessage = {
      id: Date.now(),
      content: content.trim(),
      author: author.trim(),
      votes: 0,
      timestamp: new Date(),
    };

    const updatedMessages = [newMessage, ...messages];
    setMessages(updatedMessages);
    updateGithubIssue(updatedMessages);
    toast.success("Mensagem postada com sucesso!");
  };

  const handleAddParticipant = (name: string) => {
    if (participants.includes(name)) {
      toast.error("Este participante já foi adicionado!");
      return;
    }
    setParticipants([...participants, name]);
    toast.success("Participante adicionado com sucesso!");
  };

  const handleRaffle = () => {
    if (participants.length < 2) {
      toast.error("Adicione pelo menos 2 participantes para realizar o sorteio!");
      return;
    }
    
    const randomIndex = Math.floor(Math.random() * participants.length);
    const selectedWinner = participants[randomIndex];
    setWinner(selectedWinner);
    toast.success(`${selectedWinner} foi sorteado(a)!`);
  };

  const handleReset = () => {
    setParticipants([]);
    setWinner(null);
    toast.success("Sorteio reiniciado!");
  };

  const handleVote = (messageId: number) => {
    const updatedMessages = messages.map((msg) =>
      msg.id === messageId ? { ...msg, votes: msg.votes + 1 } : msg
    );
    setMessages(updatedMessages);
    updateGithubIssue(updatedMessages);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container py-12 px-4">
        <div className="max-w-6xl mx-auto space-y-12">
          <Header />

          <Tabs defaultValue="sorteio" className="w-full">
            <TabsList className="w-full justify-start mb-6">
              <TabsTrigger value="sorteio">Sorteio</TabsTrigger>
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="mural">Mural de Recados</TabsTrigger>
            </TabsList>
            
            <TabsContent value="sorteio">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <RaffleCard
                  participants={participants}
                  winner={winner}
                  onAddParticipant={handleAddParticipant}
                  onRaffle={handleRaffle}
                  onReset={handleReset}
                />
                <ActivityCard onAddMessage={handleAddMessage} />
                <CoffeeCard />
                <MessageBoard 
                  messages={messages}
                  newMessage=""
                  authorName=""
                  onMessageChange={() => {}}
                  onAuthorChange={() => {}}
                  onAddMessage={() => {}}
                  onVote={handleVote}
                />
                <PhotoGallery />
              </div>
            </TabsContent>
            
            <TabsContent value="dashboard">
              <DashboardTab />
            </TabsContent>

            <TabsContent value="mural">
              <MessagesTab messages={messages} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Index;