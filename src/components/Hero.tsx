import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = ({ onGetStarted }: { onGetStarted: () => void }) => {
  return (
    <div className="relative min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 to-primary/30 -z-10" />
      
      <Heart className="w-16 h-16 text-accent animate-float mb-8" />
      
      <h1 className="text-4xl md:text-6xl font-bold text-accent mb-6">
        AI Love E-Card Generator
      </h1>
      
      <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mb-12">
        Create beautiful, personalized love letters with the help of AI. Express your feelings in ways that will touch their heart.
      </p>
      
      <Button 
        onClick={onGetStarted}
        className="bg-accent hover:bg-accent/90 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 animate-glow"
      >
        Generate Your Love E-Card
      </Button>
      
      <div className="mt-16 flex gap-4 items-center text-sm text-foreground/60">
        <Heart className="w-4 h-4" />
        <span>Powered by AI with Love</span>
        <Heart className="w-4 h-4" />
      </div>
    </div>
  );
};

export default Hero;