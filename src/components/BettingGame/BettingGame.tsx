import React, { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { DollarSign } from 'lucide-react';
import { sports, betTypes, fixtures, jackpots } from './constants';
import { JackpotDisplay } from './JackpotDisplay';
import { BetCard } from './BetCard';
import { Navigation } from './Navigation';
import { UpcomingTab } from './tabs/UpcomingTab';
import { HowItWorksTab } from './tabs/HowItWorksTab';

export default function BettingGame() {
  const [selectedSport, setSelectedSport] = useState('Football');
  const [jackpot, setJackpot] = useState(jackpots[selectedSport]);
  const [jackpotProgress, setJackpotProgress] = useState(0);
  const [selectedBets, setSelectedBets] = useState<Record<string, string>>({});
  const [stake, setStake] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [activeTab, setActiveTab] = useState('home');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setJackpot(prev => {
        const increase = Math.floor(Math.random() * 100);
        setJackpotProgress(increase);
        return prev + increase;
      });
    }, 5000);

    return () => clearInterval(timer);
  }, [selectedSport]);

  useEffect(() => {
    const progressTimer = setTimeout(() => setJackpotProgress(0), 1000);
    return () => clearTimeout(progressTimer);
  }, [jackpotProgress]);

  useEffect(() => {
    const now = new Date();
    const nextMonday = new Date(now.getFullYear(), now.getMonth(), now.getDate() + (7 - now.getDay()) % 7 + 1);
    nextMonday.setHours(0, 0, 0, 0);
    const timeUntilNextMonday = nextMonday.getTime() - now.getTime();
    setCountdown(Math.floor(timeUntilNextMonday / 1000));

    const countdownTimer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 0) {
          clearInterval(countdownTimer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdownTimer);
  }, []);

  const handleSportChange = (sport: string) => {
    setSelectedSport(sport);
    setJackpot(jackpots[sport]);
  };

  const handleBetSelection = (betType: string, selection: string) => {
    setSelectedBets(prev => ({
      ...prev,
      [betType]: selection
    }));
  };

  const handleSubmitBet = () => {
    if (Object.keys(selectedBets).length !== 6) {
      toast({
        title: "Incomplete Selection",
        description: "Please make all six selections before submitting your bet.",
        variant: "destructive",
      });
      return;
    }

    if (!stake || isNaN(parseFloat(stake)) || parseFloat(stake) <= 0) {
      toast({
        title: "Invalid Stake",
        description: "Please enter a valid stake amount.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Bet Submitted",
      description: `Your bet of $${stake} has been placed successfully!`,
    });

    setSelectedBets({});
    setStake('');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {betTypes.map((betType, index) => (
                <BetCard
                  key={betType}
                  betType={betType}
                  fixture={fixtures[index]}
                  selectedBet={selectedBets[betType]}
                  onBetSelection={handleBetSelection}
                />
              ))}
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Place Your Bet</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <Input
                      type="number"
                      placeholder="Enter your stake"
                      value={stake}
                      onChange={(e) => setStake(e.target.value)}
                      className="flex-grow"
                    />
                  </div>
                  <Button 
                    onClick={handleSubmitBet}
                    className="w-full bg-primary hover:bg-primary/90"
                    disabled={Object.keys(selectedBets).length !== 6 || !stake}
                  >
                    Submit Bet
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      case 'upcoming':
        return <UpcomingTab countdown={countdown} />;
      case 'live':
        return <div>Live content</div>;
      case 'results':
        return <div>Results content</div>;
      case 'howItWorks':
        return <HowItWorksTab />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-background text-foreground p-4 flex flex-col h-screen">
      <header className="mb-6">
        <Select value={selectedSport} onValueChange={handleSportChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select Sport" />
          </SelectTrigger>
          <SelectContent>
            {sports.map(sport => (
              <SelectItem key={sport} value={sport}>{sport}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </header>

      <main className="flex-grow overflow-auto">
        <JackpotDisplay jackpot={jackpot} jackpotProgress={jackpotProgress} />

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-4xl w-full">
            <DialogHeader>
              <DialogTitle>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</DialogTitle>
            </DialogHeader>
            {renderTabContent()}
          </DialogContent>
        </Dialog>
      </main>

      <footer className="mt-auto">
        <Navigation 
          activeTab={activeTab} 
          onTabChange={(tab) => {
            setActiveTab(tab);
            setIsDialogOpen(true);
          }} 
        />
      </footer>
    </div>
  );
}