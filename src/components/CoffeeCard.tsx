import { Coffee } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const CoffeeCard = () => {
  return (
    <Card className="bg-white/90 backdrop-blur-sm border-aws-200 shadow-lg hover:shadow-xl transition-shadow">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Coffee className="text-aws-600" />
          <span>Coffee Break</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-aws-700">
            Pausa para um café especial com o time!
          </p>
          <ul className="list-disc list-inside text-aws-600 space-y-2">
            <li>Café da manhã especial</li>
            <li>Networking descontraído</li>
            <li>Momento de integração</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};