
import { useState, useEffect } from 'react';
import { ExpenseForm } from '@/components/ExpenseForm';
import { ExpenseSummary } from '@/components/ExpenseSummary';
import { ExpenseList } from '@/components/ExpenseList';
import { Navigation } from '@/components/Navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, PlusCircle, BarChart3, List } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export interface Expense {
  id: string;
  amount: number;
  category: string;
  date: string;
  description?: string;
}

const Index = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [activeView, setActiveView] = useState<'add' | 'summary' | 'list'>('add');
  const { toast } = useToast();

  // Load expenses from localStorage on component mount
  useEffect(() => {
    const savedExpenses = localStorage.getItem('personal-expenses');
    if (savedExpenses) {
      try {
        setExpenses(JSON.parse(savedExpenses));
      } catch (error) {
        console.error('Error loading expenses:', error);
      }
    }
  }, []);

  // Save expenses to localStorage whenever expenses change
  useEffect(() => {
    localStorage.setItem('personal-expenses', JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (expense: Omit<Expense, 'id'>) => {
    const newExpense: Expense = {
      ...expense,
      id: Date.now().toString(),
    };
    setExpenses(prev => [newExpense, ...prev]);
    toast({
      title: "Expense Added",
      description: `₹${expense.amount} for ${expense.category} has been logged.`,
    });
  };

  const deleteExpense = (id: string) => {
    setExpenses(prev => prev.filter(expense => expense.id !== id));
    toast({
      title: "Expense Deleted",
      description: "The expense has been removed from your records.",
      variant: "destructive",
    });
  };

  const exportData = () => {
    const csvContent = [
      'Date,Category,Amount,Description',
      ...expenses.map(expense => 
        `${expense.date},${expense.category},${expense.amount},"${expense.description || ''}"`
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `expenses-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Data Exported",
      description: "Your expense data has been downloaded as CSV.",
    });
  };

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-2">
            Personal Expense Tracker
          </h1>
          <p className="text-gray-600 text-lg">
            Take control of your finances with smart expense tracking
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Total Expenses</p>
                <p className="text-2xl font-bold">₹{totalExpenses.toLocaleString()}</p>
              </div>
              <BarChart3 className="h-10 w-10 text-blue-200" />
            </div>
          </Card>
          
          <Card className="p-6 bg-gradient-to-r from-green-500 to-green-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Total Entries</p>
                <p className="text-2xl font-bold">{expenses.length}</p>
              </div>
              <List className="h-10 w-10 text-green-200" />
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">This Month</p>
                <p className="text-2xl font-bold">
                  ₹{expenses
                    .filter(expense => {
                      const expenseMonth = new Date(expense.date).getMonth();
                      const currentMonth = new Date().getMonth();
                      return expenseMonth === currentMonth;
                    })
                    .reduce((sum, expense) => sum + expense.amount, 0)
                    .toLocaleString()}
                </p>
              </div>
              <PlusCircle className="h-10 w-10 text-purple-200" />
            </div>
          </Card>
        </div>

        {/* Navigation */}
        <Navigation activeView={activeView} setActiveView={setActiveView} />

        {/* Main Content */}
        <div className="mt-8">
          {activeView === 'add' && (
            <div className="max-w-2xl mx-auto">
              <ExpenseForm onAddExpense={addExpense} />
            </div>
          )}
          
          {activeView === 'summary' && (
            <ExpenseSummary expenses={expenses} />
          )}
          
          {activeView === 'list' && (
            <ExpenseList expenses={expenses} onDeleteExpense={deleteExpense} />
          )}
        </div>

        {/* Export Button */}
        {expenses.length > 0 && (
          <div className="fixed bottom-6 right-6">
            <Button 
              onClick={exportData}
              className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white shadow-lg"
              size="lg"
            >
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
