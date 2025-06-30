
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { PlusCircle, DollarSign, Tag, Calendar, FileText } from 'lucide-react';
import type { Expense } from '@/pages/Index';

interface ExpenseFormProps {
  onAddExpense: (expense: Omit<Expense, 'id'>) => void;
}

const categories = [
  'Food & Dining',
  'Transportation',
  'Shopping',
  'Entertainment',
  'Bills & Utilities',
  'Healthcare',
  'Education',
  'Travel',
  'Groceries',
  'Other'
];

export const ExpenseForm = ({ onAddExpense }: ExpenseFormProps) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !category) return;

    setIsSubmitting(true);
    
    try {
      onAddExpense({
        amount: parseFloat(amount),
        category,
        date,
        description: description.trim() || undefined,
      });

      // Reset form
      setAmount('');
      setCategory('');
      setDate(new Date().toISOString().split('T')[0]);
      setDescription('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-t-lg">
        <CardTitle className="text-2xl flex items-center gap-2">
          <PlusCircle className="h-6 w-6" />
          Add New Expense
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="amount" className="text-sm font-medium flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-blue-600" />
                Amount (₹)
              </Label>
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="0"
                step="0.01"
                required
                className="text-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category" className="text-sm font-medium flex items-center gap-2">
                <Tag className="h-4 w-4 text-green-600" />
                Category
              </Label>
              <Select value={category} onValueChange={setCategory} required>
                <SelectTrigger className="text-lg">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="date" className="text-sm font-medium flex items-center gap-2">
              <Calendar className="h-4 w-4 text-purple-600" />
              Date
            </Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="text-lg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium flex items-center gap-2">
              <FileText className="h-4 w-4 text-orange-600" />
              Description (Optional)
            </Label>
            <Textarea
              id="description"
              placeholder="Add a note about this expense..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="resize-none"
              rows={3}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white text-lg py-6"
            disabled={!amount || !category || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Adding Expense...
              </>
            ) : (
              <>
                <PlusCircle className="h-5 w-5 mr-2" />
                Add Expense
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
