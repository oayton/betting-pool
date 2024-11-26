import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Check, Ticket } from "lucide-react";

interface BetCardProps {
  betType: string;
  fixture: { teams: string[]; date: string; time: string };
  selectedBet?: string;
  onBetSelection: (betType: string, selection: string) => void;
}

export function BetCard({ betType, fixture, selectedBet, onBetSelection }: BetCardProps) {
  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="text-xl font-bold">{betType}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-2">
          <div className="w-8 h-8 bg-gray-200 rounded-full mr-2" />
          <p className="font-semibold flex-grow">{fixture.teams[0]}</p>
          <p className="font-semibold">vs</p>
          <p className="font-semibold flex-grow text-right">{fixture.teams[1]}</p>
          <div className="w-8 h-8 bg-gray-200 rounded-full ml-2" />
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          {fixture.date} at {fixture.time}
        </p>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full bg-primary hover:bg-primary/90">
              {selectedBet ? <Check className="mr-2 h-4 w-4" /> : <Ticket className="mr-2 h-4 w-4" />}
              {selectedBet ? 'Selected' : 'Select'}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{betType}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {['Home Win', 'Draw', 'Away Win'].map((option) => (
                <Button
                  key={option}
                  onClick={() => onBetSelection(betType, option)}
                  variant={selectedBet === option ? "default" : "outline"}
                >
                  {option}
                </Button>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}