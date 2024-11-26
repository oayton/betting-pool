import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, CopyCheck, BarChart3, Award } from "lucide-react";

export function HowItWorksTab() {
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
}