import { useState } from "react";
import Hero from "@/components/Hero";
import LoveLetterForm from "@/components/LoveLetterForm";

const Index = () => {
  const [showForm, setShowForm] = useState(false);

  const handleGetStarted = () => {
    setShowForm(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {!showForm ? (
        <Hero onGetStarted={handleGetStarted} />
      ) : (
        <div className="container py-12">
          <LoveLetterForm />
        </div>
      )}
    </div>
  );
};

export default Index;