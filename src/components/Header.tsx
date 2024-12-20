import { Gift } from "lucide-react";

export const Header = () => {
  return (
    <div className="text-center space-y-4">
      <div className="flex justify-center gap-4 mb-6">
        <span className="text-aws-600 font-semibold">AWS</span>
        <span className="text-aws-600">•</span>
        <span className="text-aws-600 font-semibold">StackSpot IA</span>
      </div>
      <h1 className="text-4xl font-bold text-aws-800">
        Confraternização Drops Tech
      </h1>
      <p className="text-aws-600">
        NTTDATA - Time da Drops Tech
      </p>
    </div>
  );
};