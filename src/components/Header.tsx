import { Gift } from "lucide-react";
import nttLogo from "/lovable-uploads/8f4970cb-c285-4722-a9f0-0690c5e81ce4.png";

export const Header = () => {
  return (
    <div className="text-center space-y-4">
      <div className="flex flex-col items-center gap-4 mb-6">
        <img 
          src={nttLogo} 
          alt="NTT DATA Logo" 
          className="h-12 mb-4"
        />
        <div className="flex items-center gap-4">
          <span className="text-aws-600 font-semibold">AWS</span>
          <span className="text-aws-600">•</span>
          <span className="text-aws-600 font-semibold">StackSpot IA</span>
        </div>
      </div>
      <h1 className="text-4xl font-bold text-aws-800">
        Confraternização Drops Tech Final de Ano
      </h1>
      <p className="text-aws-600">
        NTTDATA - Time da Drops Tech
      </p>
    </div>
  );
};
