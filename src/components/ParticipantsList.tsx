import { useQuery } from "@tanstack/react-query";
import { ParticipantResponse } from "@/types/participants";

interface ParticipantsListProps {
  participants: string[];
}

const fetchParticipants = async () => {
  const response = await fetch('https://gbrvjrsrb1.execute-api.us-east-1.amazonaws.com/geDropsTech');
  if (!response.ok) {
    throw new Error('Failed to fetch participants');
  }
  return response.json() as Promise<ParticipantResponse[]>;
};

export const ParticipantsList = ({ participants: localParticipants }: ParticipantsListProps) => {
  const { data: apiParticipants, isLoading, error } = useQuery({
    queryKey: ['participants'],
    queryFn: fetchParticipants,
  });

  if (isLoading) {
    return (
      <div className="w-full max-w-md">
        <h3 className="text-lg font-semibold mb-2 text-aws-700">Participantes</h3>
        <div className="bg-white/80 backdrop-blur-sm rounded-lg border border-aws-200 p-4">
          <p className="text-aws-500 text-center">Carregando participantes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-md">
        <h3 className="text-lg font-semibold mb-2 text-aws-700">Participantes</h3>
        <div className="bg-white/80 backdrop-blur-sm rounded-lg border border-aws-200 p-4">
          <p className="text-aws-500 text-center">Erro ao carregar participantes</p>
        </div>
      </div>
    );
  }

  const allParticipants = [
    ...localParticipants,
    ...(apiParticipants?.map(p => p.email.S) || [])
  ];

  return (
    <div className="w-full max-w-md">
      <h3 className="text-lg font-semibold mb-2 text-aws-700">Participantes</h3>
      <div className="bg-white/80 backdrop-blur-sm rounded-lg border border-aws-200 p-4 max-h-60 overflow-y-auto">
        {allParticipants.length === 0 ? (
          <p className="text-aws-500 text-center">Nenhum participante adicionado</p>
        ) : (
          <ul className="space-y-2">
            {allParticipants.map((participant, index) => (
              <li
                key={`${participant}-${index}`}
                className="animate-participant-enter text-aws-700 py-2 px-4 rounded-md bg-aws-50"
              >
                {participant}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};