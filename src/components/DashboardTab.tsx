import { useQuery } from "@tanstack/react-query";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Award, TrendingUp } from "lucide-react";

interface Employee {
  userId: { S: string };
  apresentacoes: { N: string };
  name: { S: string };
  email: { S: string };
  photoUrl: { S: string };
  timestamp: { S: string };
  sorteio: { BOOL: boolean };
}

const DashboardTab = () => {
  const { data: employees, isLoading } = useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      const response = await fetch("https://gbrvjrsrb1.execute-api.us-east-1.amazonaws.com/geDropsTech");
      const data = await response.json();
      return data.map((emp: Employee) => ({
        name: emp.name.S,
        presentations: parseInt(emp.apresentacoes?.N || "0")
      })).sort((a, b) => b.presentations - a.presentations);
    }
  });

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Carregando...</div>;
  }

  return (
    <div className="space-y-8 p-4">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-aws-800 flex items-center gap-2">
          <Award className="text-aws-600" />
          Ranking de Apresentações na Drops Tech
        </h2>
        
        <div className="mt-6 h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={employees}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="presentations" fill="#0077e6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-semibold text-aws-700 flex items-center gap-2 mb-4">
            <TrendingUp className="text-aws-600" />
            Top Apresentadores
          </h3>
          <div className="space-y-4">
            {employees?.slice(0, 5).map((emp, index) => (
              <div key={emp.name} className="flex items-center justify-between p-4 bg-aws-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold text-aws-600">#{index + 1}</span>
                  <span className="font-medium">{emp.name}</span>
                </div>
                <span className="bg-aws-100 px-3 py-1 rounded-full text-aws-800">
                  {emp.presentations} apresentações
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardTab;