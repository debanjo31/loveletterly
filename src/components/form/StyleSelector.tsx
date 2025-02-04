import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface StyleSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const StyleSelector = ({ value, onChange }: StyleSelectorProps) => {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">Letter Style</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="border-primary/20">
          <SelectValue placeholder="Choose a style" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="romantic">Romantic</SelectItem>
          <SelectItem value="playful">Playful</SelectItem>
          <SelectItem value="poetic">Poetic</SelectItem>
          <SelectItem value="shakespearean">Shakespearean</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default StyleSelector;