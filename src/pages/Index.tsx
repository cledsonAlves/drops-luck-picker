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
import { fetchOrCreateIssue, updateGithubIssue } from "@/services/github";

interface Message {
  id: number;
  content: string;
  author: string;
  votes: number;
  timestamp: Date;
}

const Index = () => {
  const [participants, setParticipants] = useState<string[]>([]);
  const [winner, setWinner] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const loadMessages = async () => {
      const fetchedMessages = await fetchOrCreateIssue();
      setMessages(fetchedMessages);
    };
    loadMessages();
  }, []);

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