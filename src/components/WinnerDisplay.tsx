import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface WinnerDisplayProps {
  winner: string | null;
  onRaffle: () => void;
  onReset: () => void;
  disabled: boolean;
}

export const WinnerDisplay = ({ winner, onRaffle, onReset, disabled }: WinnerDisplayProps) => {
  return (
    <div className="w-full max-w-md space-y-4">
      <div className="min-h-[120px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          {winner && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              <div className="text-sm text-raffle-500 mb-2">Vencedor</div>
              <div className="text-3xl font-bold text-raffle-800 bg-white/90 backdrop-blur-sm py-4 px-8 rounded-lg border border-raffle-200">
                {winner}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <div className="flex gap-2 justify-center">
        <Button
          onClick={onRaffle}
          disabled={disabled}
          className="bg-raffle-700 hover:bg-raffle-800 transition-colors"
        >
          Sortear
        </Button>
        <Button
          onClick={onReset}
          variant="outline"
          className="border-raffle-200 hover:bg-raffle-100 transition-colors"
        >
          Reiniciar
        </Button>
      </div>
    </div>
  );
};