import { MessageSquare, ThumbsUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface Message {
  id: number;
  content: string;
  author: string;
  votes: number;
  timestamp: Date;
}

interface MessageBoardProps {
  messages: Message[];
  newMessage: string;
  authorName: string;
  onMessageChange: (value: string) => void;
  onAuthorChange: (value: string) => void;
  onAddMessage: () => void;
  onVote: (messageId: number) => void;
}

export const MessageBoard = ({
  messages,
  newMessage,
  authorName,
  onMessageChange,
  onAuthorChange,
  onAddMessage,
  onVote,
}: MessageBoardProps) => {
  return (
    <Card className="md:col-span-3 bg-white/90 backdrop-blur-sm border-aws-200 shadow-lg hover:shadow-xl transition-shadow">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="text-aws-600" />
          <span>Mural de Recados</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Seu nome"
              value={authorName}
              onChange={(e) => onAuthorChange(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-aws-200 focus:outline-none focus:ring-2 focus:ring-aws-500"
            />
            <Textarea
              placeholder="Deixe sua mensagem, compartilhe suas memórias de 2023..."
              value={newMessage}
              onChange={(e) => onMessageChange(e.target.value)}
              className="min-h-[100px]"
            />
            <Button 
              onClick={onAddMessage}
              className="w-full bg-aws-600 hover:bg-aws-700"
            >
              Enviar Mensagem
            </Button>
          </div>

          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className="p-4 rounded-lg bg-white border border-aws-200 shadow-sm space-y-2 animate-fade-in"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-aws-800">{message.author}</p>
                    <p className="text-sm text-aws-500">
                      {message.timestamp.toLocaleDateString()}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onVote(message.id)}
                    className="flex items-center gap-1 text-aws-600 hover:text-aws-700"
                  >
                    <ThumbsUp className="w-4 h-4" />
                    <span>{message.votes}</span>
                  </Button>
                </div>
                <p className="text-aws-700 whitespace-pre-wrap">{message.content}</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};