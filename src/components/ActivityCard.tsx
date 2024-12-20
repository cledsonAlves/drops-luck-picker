import { Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const ActivityCard = () => {
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
        </div>
      </CardContent>
    </Card>
  );
};