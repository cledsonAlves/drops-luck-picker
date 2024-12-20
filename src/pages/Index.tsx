import { useState } from "react";
import { RaffleInput } from "@/components/RaffleInput";
import { ParticipantsList } from "@/components/ParticipantsList";
import { WinnerDisplay } from "@/components/WinnerDisplay";
import { toast } from "sonner";

const Index = () => {
  const [participants, setParticipants] = useState<string[]>([]);
  const [winner, setWinner] = useState<string | null>(null);

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-raffle-50 to-raffle-100">
      <div className="container py-12 px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-raffle-800">
              Sorteio Drops Tech
            </h1>
            <p className="text-raffle-600">
              NTTDATA - Time da Drops Tech
            </p>
          </div>

          <div className="space-y-8 flex flex-col items-center">
            <RaffleInput onAddParticipant={handleAddParticipant} />
            
            <WinnerDisplay
              winner={winner}
              onRaffle={handleRaffle}
              onReset={handleReset}
              disabled={participants.length < 2}
            />
            
            <ParticipantsList participants={participants} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;