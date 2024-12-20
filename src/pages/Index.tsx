import { useState } from "react";
import { RaffleInput } from "@/components/RaffleInput";
import { ParticipantsList } from "@/components/ParticipantsList";
import { WinnerDisplay } from "@/components/WinnerDisplay";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Coffee, Gift, Users, MessageSquare, ThumbsUp } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface Message {
  id: number;
  content: string;
  author: string;
  votes: number;
  timestamp: Date;
}

const Index = () => {
  const [participants, setParticipants] = useState<string[]>([]);
  const [winner, setWinner] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [authorName, setAuthorName] = useState("");

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

  const handleAddMessage = () => {
    if (!newMessage.trim() || !authorName.trim()) {
      toast.error("Por favor, preencha a mensagem e seu nome!");
      return;
    }

    const message: Message = {
      id: Date.now(),
      content: newMessage.trim(),
      author: authorName.trim(),
      votes: 0,
      timestamp: new Date(),
    };

    setMessages([message, ...messages]);
    setNewMessage("");
    toast.success("Mensagem adicionada com sucesso!");
  };

  const handleVote = (messageId: number) => {
    setMessages(messages.map(msg => 
      msg.id === messageId 
        ? { ...msg, votes: msg.votes + 1 }
        : msg
    ));
    toast.success("Voto registrado!");
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

            {/* Card do Mural de Recados */}
            <Card className="md:col-span-3 bg-white/90 backdrop-blur-sm border-raffle-200 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="text-raffle-600" />
                  <span>Mural de Recados</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Form para adicionar mensagem */}
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Seu nome"
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      className="w-full px-4 py-2 rounded-md border border-raffle-200 focus:outline-none focus:ring-2 focus:ring-raffle-500"
                    />
                    <Textarea
                      placeholder="Deixe sua mensagem, compartilhe suas memórias de 2023..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="min-h-[100px]"
                    />
                    <Button 
                      onClick={handleAddMessage}
                      className="w-full bg-raffle-600 hover:bg-raffle-700"
                    >
                      Enviar Mensagem
                    </Button>
                  </div>

                  {/* Lista de mensagens */}
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className="p-4 rounded-lg bg-white border border-raffle-200 shadow-sm space-y-2 animate-fade-in"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-raffle-800">{message.author}</p>
                            <p className="text-sm text-raffle-500">
                              {message.timestamp.toLocaleDateString()}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleVote(message.id)}
                            className="flex items-center gap-1 text-raffle-600 hover:text-raffle-700"
                          >
                            <ThumbsUp className="w-4 h-4" />
                            <span>{message.votes}</span>
                          </Button>
                        </div>
                        <p className="text-raffle-700 whitespace-pre-wrap">{message.content}</p>
                      </div>
                    ))}
                  </div>
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