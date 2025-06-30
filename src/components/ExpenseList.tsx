
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Trash2, Search, Filter, Calendar, DollarSign } from 'lucide-react';
import type { Expense } from '@/pages/Index';

interface ExpenseListProps {
  expenses: Expense[];
  onDeleteExpense: (id: string) => void;
}

export const ExpenseList = ({ expenses, onDeleteExpense }: ExpenseListProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState<'date' | 'amount' | 'category'>('date');

  const categories = Array.from(new Set(expenses.map(expense => expense.category)));

  const filteredAndSortedExpenses = expenses
    .filter(expense => {
      const matchesSearch = expense.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (expense.description && expense.description.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = filterCategory === 'all' || expense.category === filterCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'amount':
          return b.amount - a.amount;
        case 'category':
          return a.category.localeCompare(b.category);
        default:
          return 0;
      }
    });

  const getCategoryColor = (category: string) => {
    const colors = {
      'Food & Dining': 'bg-red-100 text-red-800',
      'Transportation': 'bg-blue-100 text-blue-800',
      'Shopping': 'bg-purple-100 text-purple-800',
      'Entertainment': 'bg-pink-100 text-pink-800',
      'Bills & Utilities': 'bg-orange-100 text-orange-800',
      'Healthcare': 'bg-green-100 text-green-800',
      'Education': 'bg-indigo-100 text-indigo-800',
      'Travel': 'bg-cyan-100 text-cyan-800',
      'Groceries': 'bg-lime-100 text-lime-800',
      'Other': 'bg-gray-100 text-gray-800',
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  if (expenses.length === 0) {
    return (
      <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardContent className="p-12 text-center">
          <DollarSign className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No expenses recorded</h3>
          <p className="text-gray-500">Start by adding your first expense.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-blue-600" />
            Filter & Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search expenses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={(value) => setSortBy(value as 'date' | 'amount' | 'category')}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Sort by Date</SelectItem>
                <SelectItem value="amount">Sort by Amount</SelectItem>
                <SelectItem value="category">Sort by Category</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Expense List */}
      <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Expense History ({filteredAndSortedExpenses.length} entries)</span>
            <span className="text-lg font-normal text-gray-600">
              Total: ₹{filteredAndSortedExpenses.reduce((sum, expense) => sum + expense.amount, 0).toLocaleString()}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {filteredAndSortedExpenses.map((expense) => (
            <div key={expense.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <Badge className={`${getCategoryColor(expense.category)} border-none`}>
                    {expense.category}
                  </Badge>
                  <span className="text-2xl font-bold">₹{expense.amount.toLocaleString()}</span>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(expense.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </div>
                  {expense.description && (
                    <span className="italic">"{expense.description}"</span>
                  )}
                </div>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDeleteExpense(expense.id)}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
