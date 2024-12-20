import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface RaffleInputProps {
  onAddParticipant: (name: string) => void;
}

export const RaffleInput = ({ onAddParticipant }: RaffleInputProps) => {
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAddParticipant(name.trim());
      setName("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-md">
      <Input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Digite o nome do participante"
        className="bg-white/80 backdrop-blur-sm border-raffle-200"
      />
      <Button 
        type="submit" 
        className="bg-raffle-700 hover:bg-raffle-800 transition-colors"
      >
        Adicionar
      </Button>
    </form>
  );
};