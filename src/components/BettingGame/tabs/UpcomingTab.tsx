import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";
import { upcomingFixtures } from "../constants";

interface UpcomingTabProps {
  countdown: number;
}

export function UpcomingTab({ countdown }: UpcomingTabProps) {
  const formatCountdown = (seconds: number) => {
    const days = Math.floor(seconds / (3600 * 24));
    const hours = Math.floor((seconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${days}d ${hours}h ${minutes}m ${remainingSeconds}s`;
  };

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
}