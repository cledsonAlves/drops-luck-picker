import { useState } from "react";
import { RaffleInput } from "@/components/RaffleInput";
import { ParticipantsList } from "@/components/ParticipantsList";
import { WinnerDisplay } from "@/components/WinnerDisplay";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Coffee, Gift, Users } from "lucide-react";
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
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-raffle-800">
              Confraternização Drops Tech
            </h1>
            <p className="text-raffle-600">
              NTTDATA - Time da Drops Tech
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card de Sorteio */}
            <Card className="bg-white/90 backdrop-blur-sm border-raffle-200 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="text-raffle-600" />
                  <span>Sorteio</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <RaffleInput onAddParticipant={handleAddParticipant} />
                <WinnerDisplay
                  winner={winner}
                  onRaffle={handleRaffle}
                  onReset={handleReset}
                  disabled={participants.length < 2}
                />
                <ParticipantsList participants={participants} />
              </CardContent>
            </Card>

            {/* Card de Dinâmica */}
            <Card className="bg-white/90 backdrop-blur-sm border-raffle-200 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="text-raffle-600" />
                  <span>Dinâmica em Grupo</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-raffle-700">
                    Compartilhe suas melhores memórias de 2023 com o time!
                  </p>
                  <ul className="list-disc list-inside text-raffle-600 space-y-2">
                    <li>Momentos marcantes</li>
                    <li>Conquistas do time</li>
                    <li>Histórias divertidas</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Card do Café */}
            <Card className="bg-white/90 backdrop-blur-sm border-raffle-200 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Coffee className="text-raffle-600" />
                  <span>Coffee Break</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-raffle-700">
                    Pausa para um café especial com o time!
                  </p>
                  <ul className="list-disc list-inside text-raffle-600 space-y-2">
                    <li>Café da manhã especial</li>
                    <li>Networking descontraído</li>
                    <li>Momento de integração</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;