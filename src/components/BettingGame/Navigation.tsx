import { Button } from "@/components/ui/button";
import { Trophy, Calendar, Activity, FileText, HelpCircle } from "lucide-react";

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Navigation({ activeTab, onTabChange }: NavigationProps) {
  const navItems = [
    { icon: Trophy, label: 'Home', value: 'home' },
    { icon: Calendar, label: 'Upcoming', value: 'upcoming' },
    { icon: Activity, label: 'Live', value: 'live' },
    { icon: FileText, label: 'Results', value: 'results' },
    { icon: HelpCircle, label: 'How It Works', value: 'howItWorks' },
  ];

  return (
    <div className="flex justify-between items-center bg-secondary p-2 rounded-lg">
      {navItems.map(({ icon: Icon, label, value }) => (
        <Button
          key={value}
          variant="ghost"
          className={`flex flex-col items-center ${activeTab === value ? 'text-primary' : ''}`}
          onClick={() => onTabChange(value)}
        >
          <Icon className="h-5 w-5" />
          <span className="text-xs mt-1">{label}</span>
        </Button>
      ))}
    </div>
  );
}