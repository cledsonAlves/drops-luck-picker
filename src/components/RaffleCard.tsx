import { Gift } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RaffleInput } from "./RaffleInput";
import { WinnerDisplay } from "./WinnerDisplay";
import { ParticipantsList } from "./ParticipantsList";
import { useState } from "react";

interface RaffleCardProps {
  participants: string[];
  winner: string | null;
  onAddParticipant: (name: string) => void;
  onRaffle: () => void;
  onReset: () => void;
}

export const RaffleCard = ({
  participants: localParticipants,
  winner,
  onAddParticipant,
  onRaffle,
  onReset,
}: RaffleCardProps) => {
  const [selectedPrize, setSelectedPrize] = useState<string>("");

  return (
    <Card className="bg-white/90 backdrop-blur-sm border-aws-200 shadow-lg hover:shadow-xl transition-shadow">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Gift className="text-aws-600" />
          <span>Sorteio</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <RaffleInput onAddParticipant={onAddParticipant} />
        <WinnerDisplay
          winner={winner}
          onRaffle={onRaffle}
          onReset={onReset}
          disabled={localParticipants.length < 2}
          selectedPrize={selectedPrize}
        />
        <ParticipantsList 
          participants={localParticipants}
          onAddParticipant={onAddParticipant}
          onPrizeSelect={setSelectedPrize}
        />
      </CardContent>
    </Card>
  );
};