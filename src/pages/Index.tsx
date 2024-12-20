import { useState } from "react";
import { toast } from "sonner";
import { Header } from "@/components/Header";
import { RaffleCard } from "@/components/RaffleCard";
import { ActivityCard } from "@/components/ActivityCard";
import { CoffeeCard } from "@/components/CoffeeCard";
import { MessageBoard } from "@/components/MessageBoard";
import { PhotoGallery } from "@/components/PhotoGallery";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardTab from "@/components/DashboardTab";
import { useQuery } from "@tanstack/react-query";

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
  const [newMessage, setNewMessage] = useState("");
  const [authorName, setAuthorName] = useState("");

  const { data: apiParticipants } = useQuery({
    queryKey: ["participants"],
    queryFn: fetchParticipants,
  });

  const handleAddParticipant = (name: string) => {
    if (participants.includes(name)) {
      toast.error("Este participante já foi adicionado!");
      return;
    }
    setParticipants([...participants, name]);
    toast.success("Participante adicionado com sucesso!");
  };

  const handleRaffle = () => {
    const allParticipants = [
      ...participants,
      ...(apiParticipants?.map((p) => p.name.S) || []),
    ];

    if (allParticipants.length < 2) {
      toast.error("Adicione pelo menos 2 participantes para realizar o sorteio!");
      return;
    }
    
    const randomIndex = Math.floor(Math.random() * allParticipants.length);
    const selectedWinner = allParticipants[randomIndex];
    setWinner(selectedWinner);
    toast.success(`${selectedWinner} foi sorteado(a)!`);
  };

  const handleReset = () => {
    setParticipants([]);
    setWinner(null);
    toast.success("Sorteio reiniciado!");
  };

  const handleAddMessage = () => {
    if (!newMessage.trim() || !authorName.trim()) {
      toast.error("Por favor, preencha a mensagem e seu nome!");
      return;
    }

    const message: Message = {
      id: Date.now(),
      content: newMessage.trim(),
      author: authorName.trim(),
      votes: 0,
      timestamp: new Date(),
    };

    setMessages([message, ...messages]);
    setNewMessage("");
    toast.success("Mensagem adicionada com sucesso!");
  };

  const handleVote = (messageId: number) => {
    setMessages(messages.map(msg => 
      msg.id === messageId 
        ? { ...msg, votes: msg.votes + 1 }
        : msg
    ));
    toast.success("Voto registrado!");
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
                <ActivityCard />
                <CoffeeCard />
                <MessageBoard
                  messages={messages}
                  newMessage={newMessage}
                  authorName={authorName}
                  onMessageChange={setNewMessage}
                  onAuthorChange={setAuthorName}
                  onAddMessage={handleAddMessage}
                  onVote={handleVote}
                />
                <PhotoGallery />
              </div>
            </TabsContent>
            
            <TabsContent value="dashboard">
              <DashboardTab />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

const fetchParticipants = async () => {
  const response = await fetch(
    "https://gbrvjrsrb1.execute-api.us-east-1.amazonaws.com/geDropsTech"
  );
  if (!response.ok) {
    throw new Error("Falha ao carregar participantes");
  }
  return response.json();
};

export default Index;