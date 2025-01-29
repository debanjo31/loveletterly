import { useState } from "react";
import Hero from "@/components/Hero";
import LoveLetterForm from "@/components/LoveLetterForm";

const Index = () => {
  const [showForm, setShowForm] = useState(false);

  const handleGetStarted = () => {
    setShowForm(true);
  };

  const handleGenerate = (data: any) => {
    console.log("Generating letter with data:", data);
    // TODO: Implement letter generation logic
  };

  return (
    <div className="min-h-screen bg-background">
      {!showForm ? (
        <Hero onGetStarted={handleGetStarted} />
      ) : (
        <div className="container py-12">
          <LoveLetterForm onGenerate={handleGenerate} />
        </div>
      )}
    </div>
  );
};

export default Index;