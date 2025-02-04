import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart, Sparkles } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import GeneratedLetter from "./GeneratedLetter";
import InputField from "./form/InputField";
import StyleSelector from "./form/StyleSelector";

const LoveLetterForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    partnerName: "",
    duration: "",
    memories: "",
    tone: "romantic",
  });
  const [loading, setLoading] = useState(false);
  const [generatedLetter, setGeneratedLetter] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("https://love-api-oxg4.onrender.com/api/letter/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          partnerName: formData.partnerName,
          memories: formData.memories,
          tone: formData.tone,
          relationshipDuration: parseInt(formData.duration) || 0,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate letter");
      }

      const data = await response.json();
      setGeneratedLetter(data.text);
      
      toast({
        title: "Success!",
        description: "Your love letter has been generated",
      });
    } catch (error) {
      console.error("Error generating letter:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate love letter. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-3">
      {!generatedLetter ? (
        <div className="max-w-2xl mx-auto p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-accent mb-2">Create Your Love Letter</h2>
              <p className="text-foreground/60">Fill in the details to generate a personalized love letter</p>
            </div>

            <div className="space-y-4">
              <InputField
                label="Partner's Name"
                value={formData.partnerName}
                onChange={(value) => setFormData({ ...formData, partnerName: value })}
                placeholder="Enter their name"
                required
              />

              <InputField
                label="Relationship Duration (years)"
                type="number"
                value={formData.duration}
                onChange={(value) => setFormData({ ...formData, duration: value })}
                placeholder="e.g., 2"
                required
              />

              <InputField
                label="Special Memories & Traits"
                type="textarea"
                value={formData.memories}
                onChange={(value) => setFormData({ ...formData, memories: value })}
                placeholder="Share some special moments or personality traits..."
                required
              />

              <StyleSelector
                value={formData.tone}
                onChange={(value) => setFormData({ ...formData, tone: value })}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-accent hover:bg-accent/90 text-white py-6 rounded-full group"
              disabled={loading}
            >
              {loading ? (
                <Sparkles className="w-5 h-5 mr-2 animate-spin" />
              ) : (
                <Sparkles className="w-5 h-5 mr-2 animate-glow" />
              )}
              {loading ? "Generating..." : "Generate Love Letter"}
              <Heart className="w-5 h-5 ml-2 group-hover:animate-float" />
            </Button>
          </form>
        </div>
      ) : (
        <div className="space-y-6">
          <Button
            variant="ghost"
            onClick={() => setGeneratedLetter(null)}
            className="mb-4"
          >
            ← Create Another Letter
          </Button>
          <GeneratedLetter letter={generatedLetter} />
        </div>
      )}
    </div>
  );
};

export default LoveLetterForm;