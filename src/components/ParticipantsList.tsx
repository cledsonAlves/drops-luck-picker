import { useQuery } from "@tanstack/react-query";
import { RegisterDialog } from "./RegisterDialog";
import { toast } from "sonner";

interface Participant {
  sorteio: { BOOL: boolean };
  email: { S: string };
  name: { S: string };
  photoUrl: { S: string };
  userId: { S: string };
  timestamp: { S: string };
}

interface ParticipantsListProps {
  participants: string[];
  onAddParticipant: (name: string) => void;
}

const fetchParticipants = async (): Promise<Participant[]> => {
  const response = await fetch(
    "https://gbrvjrsrb1.execute-api.us-east-1.amazonaws.com/geDropsTech"
  );
  if (!response.ok) {
    throw new Error("Falha ao carregar participantes");
  }
  return response.json();
};

export const ParticipantsList = ({
  participants: localParticipants,
  onAddParticipant,
}: ParticipantsListProps) => {
  const { data: apiParticipants, isError } = useQuery({
    queryKey: ["participants"],
    queryFn: fetchParticipants,
  });

  if (isError) {
    toast.error("Erro ao carregar participantes da API");
  }

  const allParticipants = [
    ...localParticipants,
    ...(apiParticipants?.map((p) => p.name.S || "Sem nome") || []),
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Participantes ({allParticipants.length})</h2>
        <RegisterDialog onRegister={onAddParticipant} />
      </div>
      <ul className="space-y-2">
        {allParticipants.map((participant, index) => (
          <li
            key={index}
            className="p-2 bg-white rounded shadow hover:shadow-md transition-shadow"
          >
            {participant}
          </li>
        ))}
      </ul>
    </div>
  );
};