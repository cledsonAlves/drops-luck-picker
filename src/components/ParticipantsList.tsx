interface ParticipantsListProps {
  participants: string[];
}

export const ParticipantsList = ({ participants }: ParticipantsListProps) => {
  return (
    <div className="w-full max-w-md">
      <h3 className="text-lg font-semibold mb-2 text-raffle-700">Participantes</h3>
      <div className="bg-white/80 backdrop-blur-sm rounded-lg border border-raffle-200 p-4 max-h-60 overflow-y-auto">
        {participants.length === 0 ? (
          <p className="text-raffle-500 text-center">Nenhum participante adicionado</p>
        ) : (
          <ul className="space-y-2">
            {participants.map((participant, index) => (
              <li
                key={`${participant}-${index}`}
                className="animate-participant-enter text-raffle-700 py-2 px-4 rounded-md bg-raffle-50"
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