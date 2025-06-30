
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PlusCircle, BarChart3, List } from 'lucide-react';

interface NavigationProps {
  activeView: 'add' | 'summary' | 'list';
  setActiveView: (view: 'add' | 'summary' | 'list') => void;
}

export const Navigation = ({ activeView, setActiveView }: NavigationProps) => {
  const navItems = [
    { id: 'add', label: 'Add Expense', icon: PlusCircle, color: 'from-blue-600 to-blue-700' },
    { id: 'summary', label: 'View Summary', icon: BarChart3, color: 'from-green-600 to-green-700' },
    { id: 'list', label: 'Expense History', icon: List, color: 'from-purple-600 to-purple-700' },
  ] as const;

  return (
    <Card className="p-2 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = activeView === item.id;
          
          return (
            <Button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              variant={isActive ? "default" : "ghost"}
              className={`h-16 text-base font-medium transition-all duration-200 ${
                isActive 
                  ? `bg-gradient-to-r ${item.color} text-white shadow-lg` 
                  : 'hover:bg-gray-100'
              }`}
            >
              <IconComponent className="h-5 w-5 mr-2" />
              {item.label}
            </Button>
          );
        })}
      </div>
    </Card>
  );
};
