import React, { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Trophy, Calendar, Activity, FileText, HelpCircle, Check, Ticket, DollarSign, Clock, Users, CopyCheck, BarChart3, Award } from 'lucide-react';

const sports = ['Football', 'NBA', 'NFL', 'Baseball', 'Horse Racing'];
const betTypes = ['Match Result', 'Both Teams to Score', 'Over/Under', 'Correct Score', 'First Goalscorer', 'Anytime Goalscorer'];

const fixtures = [
  { teams: ['Manchester United', 'Liverpool'], date: '2023-12-16', time: '17:30' },
  { teams: ['Arsenal', 'Brighton'], date: '2023-12-17', time: '14:00' },
  { teams: ['Aston Villa', 'Brentford'], date: '2023-12-17', time: '14:00' },
  { teams: ['Fulham', 'West Ham'], date: '2023-12-17', time: '14:00' },
  { teams: ['Chelsea', 'Sheffield United'], date: '2023-12-16', time: '15:00' },
  { teams: ['Newcastle', 'Fulham'], date: '2023-12-16', time: '15:00' },
];

const upcomingFixtures = [
  ...fixtures,
  { teams: ['Tottenham', 'Everton'], date: '2023-12-18', time: '20:00' },
  { teams: ['Crystal Palace', 'Burnley'], date: '2023-12-18', time: '15:00' },
  { teams: ['Leicester', 'Wolves'], date: '2023-12-19', time: '19:45' },
];

const jackpots = {
  'Football': 1000000,
  'NBA': 750000,
  'NFL': 1250000,
  'Baseball': 500000,
  'Horse Racing': 350000,
};

export default function BettingGame() {
  const [selectedSport, setSelectedSport] = useState('Football');
  const [jackpot, setJackpot] = useState(jackpots[selectedSport]);
  const [jackpotProgress, setJackpotProgress] = useState(0);
  const [selectedBets, setSelectedBets] = useState({});
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

  const handleSportChange = (sport) => {
    setSelectedSport(sport);
    setJackpot(jackpots[sport]);
  };

  const handleBetSelection = (betType, selection) => {
    setSelectedBets(prev => ({
      ...prev,
      [betType]: selection
    }));
  };

  const handleStakeChange = (e) => {
    setStake(e.target.value);
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

  const formatCountdown = (seconds) => {
    const days = Math.floor(seconds / (3600 * 24));
    const hours = Math.floor((seconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${days}d ${hours}h ${minutes}m ${remainingSeconds}s`;
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {betTypes.map((betType, index) => (
                <Card key={betType} className="shadow-md hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold">{betType}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-8 h-8 bg-gray-200 rounded-full mr-2" />
                      <p className="font-semibold flex-grow">{fixtures[index].teams[0]}</p>
                      <p className="font-semibold">vs</p>
                      <p className="font-semibold flex-grow text-right">{fixtures[index].teams[1]}</p>
                      <div className="w-8 h-8 bg-gray-200 rounded-full ml-2" />
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      {fixtures[index].date} at {fixtures[index].time}
                    </p>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="w-full bg-primary hover:bg-primary/90">
                          {selectedBets[betType] ? <Check className="mr-2 h-4 w-4" /> : <Ticket className="mr-2 h-4 w-4" />}
                          {selectedBets[betType] ? 'Selected' : 'Select'}
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
                              onClick={() => handleBetSelection(betType, option)}
                              variant={selectedBets[betType] === option ? "default" : "outline"}
                            >
                              {option}
                            </Button>
                          ))}
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>
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
                      onChange={handleStakeChange}
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
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Upcoming Matches</span>
                <div className="flex items-center text-sm font-normal">
                  <Clock className="mr-2 h-4 w-4" />
                  New selections in: {formatCountdown(countdown)}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingFixtures.map((fixture, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-secondary rounded-lg">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gray-200 rounded-full" />
                      <span className="font-medium">{fixture.teams[0]}</span>
                    </div>
                    <div className="text-center">
                      <span className="text-sm font-semibold">vs</span>
                      <div className="text-xs text-muted-foreground">{fixture.date} at {fixture.time}</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{fixture.teams[1]}</span>
                      <div className="w-8 h-8 bg-gray-200 rounded-full" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );
      case 'live':
        return <div>Live content</div>;
      case 'results':
        return <div>Results content</div>;
      case 'howItWorks':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">How It Works</CardTitle>
              <CardDescription className="text-center">Your guide to football pool betting</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { icon: Users, title: "Join a Pool", description: "Enter this week's football pool by choosing your six selections and your stake." },
                    { icon: CopyCheck, title: "Make Predictions", description: "Predict match results, goalscorers, or other bet types like Over/Under." },
                    { icon: BarChart3, title: "Track the Action", description: "Watch live scores and the leaderboard to see how your predictions stack up." },
                    { icon: Award, title: "Win the Jackpot", description: "If your selections are correct, win the full jackpot or take home your share." },
                  ].map((step, index) => (
                    <Card key={index} className="flex flex-col items-center text-center p-4">
                      <step.icon className="h-12 w-12 text-primary mb-2" />
                      <h3 className="font-bold mb-2">{step.title}</h3>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </Card>
                  ))}
                </div>
                
                <Card className="bg-primary text-primary-foreground">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold">Jackpot Rollover</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">If there are no winners, the jackpot rolls over to the next week, getting bigger and bigger!</p>
                    <div className="w-full bg-primary-foreground/20 rounded-full h-4 mb-4">
                      <div className="bg-primary-foreground h-4 rounded-full" style={{width: '75%'}}></div>
                    </div>
                    <p className="text-sm italic">Example: Jackpot growth over time</p>
                  </CardContent>
                </Card>
                
                <div className="flex justify-center">
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    Get Started Now
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        );
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
        <div className="flex justify-between items-center bg-secondary p-2 rounded-lg">
          {[
            { icon: Trophy, label: 'Home', value: 'home' },
            { icon: Calendar, label: 'Upcoming', value: 'upcoming' },
            { icon: Activity, label: 'Live', value: 'live' },
            { icon: FileText, label: 'Results', value: 'results' },
            { icon: HelpCircle, label: 'How It Works', value: 'howItWorks' },
          ].map(({ icon: Icon, label, value }) => (
            <Button
              key={value}
              variant="ghost"
              className={`flex flex-col items-center ${activeTab === value ? 'text-primary' : ''}`}
              onClick={() => {
                setActiveTab(value);
                setIsDialogOpen(true);
              }}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs mt-1">{label}</span>
            </Button>
          ))}
        </div>
      </footer>
    </div>
  );
}