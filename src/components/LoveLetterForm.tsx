import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, Sparkles } from "lucide-react";

const LoveLetterForm = ({ onGenerate }: { onGenerate: (data: any) => void }) => {
  const [formData, setFormData] = useState({
    partnerName: "",
    duration: "",
    memories: "",
    style: "romantic",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(formData);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-accent mb-2">Create Your Love Letter</h2>
          <p className="text-foreground/60">Fill in the details to generate a personalized love letter</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Partner's Name</label>
            <Input
              placeholder="Enter their name"
              value={formData.partnerName}
              onChange={(e) => setFormData({ ...formData, partnerName: e.target.value })}
              className="border-primary/20 focus:border-accent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Relationship Duration</label>
            <Input
              placeholder="e.g., 2 years"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              className="border-primary/20 focus:border-accent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Special Memories</label>
            <Textarea
              placeholder="Share some special moments or inside jokes..."
              value={formData.memories}
              onChange={(e) => setFormData({ ...formData, memories: e.target.value })}
              className="border-primary/20 focus:border-accent min-h-[120px]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Letter Style</label>
            <Select
              value={formData.style}
              onValueChange={(value) => setFormData({ ...formData, style: value })}
            >
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
        </div>

        <Button
          type="submit"
          className="w-full bg-accent hover:bg-accent/90 text-white py-6 rounded-full group"
        >
          <Sparkles className="w-5 h-5 mr-2 animate-glow" />
          Generate Love Letter
          <Heart className="w-5 h-5 ml-2 group-hover:animate-float" />
        </Button>
      </form>
    </div>
  );
};

export default LoveLetterForm;