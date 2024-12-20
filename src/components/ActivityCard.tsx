import { Users } from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ActivityCardProps {
  onAddMessage: (author: string, content: string) => void;
}

export const ActivityCard = ({ onAddMessage }: ActivityCardProps) => {
  const [author, setAuthor] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    onAddMessage(author, message);
    setMessage("");
  };

  return (
    <Card className="bg-white/90 backdrop-blur-sm border-aws-200 shadow-lg hover:shadow-xl transition-shadow">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="text-aws-600" />
          <span>Dinâmica em Grupo</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-aws-700">
            Compartilhe suas melhores memórias de 2024 com o time!
          </p>
          <ul className="list-disc list-inside text-aws-600 space-y-2">
            <li>Momentos marcantes</li>
            <li>Conquistas do time</li>
            <li>Histórias divertidas</li>
          </ul>
          <div className="space-y-4 pt-4">
            <input
              type="text"
              placeholder="Seu nome"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-aws-200 focus:outline-none focus:ring-2 focus:ring-aws-500"
            />
            <Textarea
              placeholder="Sua mensagem..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[100px]"
            />
            <Button 
              onClick={handleSubmit}
              className="w-full bg-aws-600 hover:bg-aws-700"
            >
              Postar Mensagem
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};