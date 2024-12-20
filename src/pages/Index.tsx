import { useState } from "react";
import { toast } from "sonner";
import { Header } from "@/components/Header";
import { RaffleCard } from "@/components/RaffleCard";
import { ActivityCard } from "@/components/ActivityCard";
import { CoffeeCard } from "@/components/CoffeeCard";
import { MessageBoard } from "@/components/MessageBoard";
import { PhotoGallery } from "@/components/PhotoGallery";

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
    setWinner(participants[randomIndex]);
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
    <div className="min-h-screen bg-gradient-to-b from-aws-50 to-aws-100">
      <div className="container py-12 px-4">
        <div className="max-w-6xl mx-auto space-y-12">
          <Header />

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
        </div>
      </div>
    </div>
  );
};

export default Index;