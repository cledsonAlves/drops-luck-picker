import { useQuery } from "@tanstack/react-query";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trophy } from "lucide-react";
import { toast } from "sonner";

interface Winner {
  name: string;
  prize: string;
  date: string;
}

const GITHUB_ISSUE_URL = "https://api.github.com/repos/cledsonAlves/drops-luck-picker/issues";
const ID_TOK = "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";

const fetchWinners = async (): Promise<Winner[]> => {
  try {
    const response = await fetch(`${GITHUB_ISSUE_URL}/2`, {
      headers: {
        "Authorization": `Bearer ${ID_TOK}`,
        "Accept": "application/vnd.github.v3+json"
      }
    });

    if (response.status === 404) {
      // Create initial issue if it doesn't exist
      await createInitialWinnersIssue();
      return [];
    }

    const issue = await response.json();
    return parseWinnersFromIssue(issue);
  } catch (error) {
    console.error("Error fetching winners:", error);
    throw new Error("Failed to fetch winners");
  }
};

const createInitialWinnersIssue = async () => {
  const initialBody = "| Nome | Prêmio | Data |\n|---|---|---|\n";
  await fetch(GITHUB_ISSUE_URL, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${ID_TOK}`,
      "Accept": "application/vnd.github.v3+json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: "Ranking de Ganhadores",
      body: initialBody,
    }),
  });
};

const parseWinnersFromIssue = (issue: any): Winner[] => {
  const winnerRegex = /\|\s*([^|]+)\s*\|\s*([^|]+)\s*\|\s*([^|]+)\s*\|/g;
  const matches = [...(issue.body?.matchAll(winnerRegex) || [])];
  
  // Skip the header row
  return matches.slice(1).map((match) => ({
    name: match[1].trim(),
    prize: match[2].trim(),
    date: match[3].trim(),
  }));
};

export const WinnersTab = () => {
  const { data: winners = [], isLoading, isError } = useQuery({
    queryKey: ["winners"],
    queryFn: fetchWinners,
  });

  if (isError) {
    toast.error("Erro ao carregar o ranking de ganhadores");
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Trophy className="text-aws-600" />
        <h2 className="text-2xl font-bold">Ranking de Ganhadores</h2>
      </div>
      
      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Prêmio</TableHead>
              <TableHead>Data</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {winners.map((winner, index) => (
              <TableRow key={index}>
                <TableCell>{winner.name}</TableCell>
                <TableCell>{winner.prize}</TableCell>
                <TableCell>{winner.date}</TableCell>
              </TableRow>
            ))}
            {winners.length === 0 && !isLoading && (
              <TableRow>
                <TableCell colSpan={3} className="text-center text-gray-500">
                  Nenhum ganhador registrado ainda
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};