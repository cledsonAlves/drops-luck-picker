import { MessageSquare } from "lucide-react";

interface Message {
  id: number;
  content: string;
  author: string;
  timestamp: Date;
}

interface MessagesTabProps {
  messages: Message[];
}

export const MessagesTab = ({ messages }: MessagesTabProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <MessageSquare className="w-6 h-6 text-aws-600" />
        <h2 className="text-2xl font-semibold text-aws-800">Mural de Recados</h2>
      </div>

      <div className="grid gap-6">
        {messages.map((message) => (
          <div
            key={message.id}
            className="p-6 bg-white rounded-lg border border-aws-200 shadow-sm space-y-3 animate-participant-enter"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-aws-800">{message.author}</h3>
                <p className="text-sm text-aws-500">
                  {message.timestamp.toLocaleDateString()} às{" "}
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
            <p className="text-aws-700 whitespace-pre-wrap">{message.content}</p>
          </div>
        ))}

        {messages.length === 0 && (
          <div className="text-center py-12 text-aws-500">
            Nenhuma mensagem postada ainda. Seja o primeiro a compartilhar!
          </div>
        )}
      </div>
    </div>
  );
};