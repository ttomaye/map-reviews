
import { Pizza, Utensils } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Category } from '@/types';

interface CategoryFilterProps {
  selectedCategory: Category;
  onSelectCategory: (category: Category) => void;
}

export default function CategoryFilter({ selectedCategory, onSelectCategory }: CategoryFilterProps) {
  const categories: Category[] = ['All', 'Pizza', 'Sushi', 'Mexican', 'Italian', 'American', 'Thai', 'Indian', 'Chinese'];
  
  const getCategoryIcon = (category: Category) => {
    switch (category) {
      case 'Pizza':
        return <Pizza className="w-4 h-4 mr-2" />;
      default:
        return <Utensils className="w-4 h-4 mr-2" />;
    }
  };
  
  return (
    <div className="flex flex-wrap items-center justify-start gap-2 px-2 py-4 overflow-x-auto">
      {categories.map((category) => (
        <Button
          key={category}
          variant={selectedCategory === category ? "default" : "outline"}
          size="sm"
          onClick={() => onSelectCategory(category)}
          className="flex items-center"
        >
          {category !== 'All' && getCategoryIcon(category)}
          {category}
        </Button>
      ))}
    </div>
  );
}
