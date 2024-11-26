import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface JackpotDisplayProps {
  jackpot: number;
  jackpotProgress: number;
}

export function JackpotDisplay({ jackpot, jackpotProgress }: JackpotDisplayProps) {
  return (
    <Card className="mb-6 relative overflow-hidden">
      <CardHeader>
        <CardTitle className="text-center text-4xl font-bold animate-pulse">
          Current Jackpot: ${jackpot.toLocaleString()}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-center text-muted-foreground mb-2">
          Ready to make it even bigger? Enter now and help grow the jackpot!
        </p>
        <Progress value={jackpotProgress} className="w-full" />
      </CardContent>
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 pointer-events-none" />
    </Card>
  );
}