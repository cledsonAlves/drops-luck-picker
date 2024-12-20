import { Gift } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RaffleInput } from "./RaffleInput";
import { WinnerDisplay } from "./WinnerDisplay";
import { ParticipantsList } from "./ParticipantsList";
import { useQuery } from "@tanstack/react-query";

interface RaffleCardProps {
  participants: string[];
  winner: string | null;
  onAddParticipant: (name: string) => void;
  onRaffle: () => void;
  onReset: () => void;
}

const fetchParticipants = async () => {
  const response = await fetch(
    "https://gbrvjrsrb1.execute-api.us-east-1.amazonaws.com/geDropsTech"
  );
  if (!response.ok) {
    throw new Error("Falha ao carregar participantes");
  }
  return response.json();
};

export const RaffleCard = ({
  participants: localParticipants,
  winner,
  onAddParticipant,
  onRaffle,
  onReset,
}: RaffleCardProps) => {
  const { data: apiParticipants } = useQuery({
    queryKey: ["participants"],
    queryFn: fetchParticipants,
  });

  const allParticipants = [
    ...localParticipants,
    ...(apiParticipants?.map((p) => p.name.S) || []),
  ];

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
          disabled={allParticipants.length < 2}
        />
        <ParticipantsList 
          participants={localParticipants}
          onAddParticipant={onAddParticipant}
        />
      </CardContent>
    </Card>
  );
};