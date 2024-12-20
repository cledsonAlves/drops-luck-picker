import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface WinnerDisplayProps {
  winner: string | null;
  onRaffle: () => void;
  onReset: () => void;
  disabled: boolean;
  selectedPrize?: string;
}

export const WinnerDisplay = ({ 
  winner, 
  onRaffle, 
  onReset, 
  disabled,
  selectedPrize 
}: WinnerDisplayProps) => {
  const [isRaffling, setIsRaffling] = useState(false);

  const handleRaffle = async () => {
    if (!selectedPrize) {
      toast.error("Por favor, selecione um prêmio antes de sortear!");
      return;
    }
    
    setIsRaffling(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    await onRaffle();
    setIsRaffling(false);
  };

  return (
    <div className="w-full max-w-md space-y-4">
      <div className="min-h-[120px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          {isRaffling ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex flex-col items-center gap-2"
            >
              <Loader2 className="h-8 w-8 animate-spin text-aws-600" />
              <span className="text-aws-600 font-medium">Sorteando o Digital Lover's...</span>
            </motion.div>
          ) : winner ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              <div className="text-sm text-aws-500 mb-2">
                Vencedor{selectedPrize ? ` - ${selectedPrize}` : ''}
              </div>
              <motion.div 
                className="text-3xl font-bold text-aws-800 bg-white/90 backdrop-blur-sm py-4 px-8 rounded-lg border border-aws-200"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                {winner}
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
      
      <div className="flex gap-2 justify-center">
        <Button
          onClick={handleRaffle}
          disabled={isRaffling || disabled || !selectedPrize}
          className="bg-aws-600 hover:bg-aws-700 transition-colors"
        >
          {isRaffling ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Sorteando...
            </span>
          ) : (
            "Sortear"
          )}
        </Button>
        <Button
          onClick={onReset}
          variant="outline"
          disabled={isRaffling}
          className="border-aws-200 hover:bg-aws-100 transition-colors"
        >
          Reiniciar
        </Button>
      </div>
    </div>
  );
};