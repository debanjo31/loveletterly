import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Copy, Download, Heart } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import html2canvas from "html2canvas";

interface GeneratedLetterProps {
  letter: string;
}

const GeneratedLetter = ({ letter }: GeneratedLetterProps) => {
  const { toast } = useToast();
  const [downloading, setDownloading] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(letter);
    toast({
      title: "Copied!",
      description: "Love letter copied to clipboard",
    });
  };

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const element = document.getElementById("love-letter-card");
      if (!element) return;
      
      const canvas = await html2canvas(element);
      const data = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      
      link.href = data;
      link.download = "love-letter.png";
      link.click();
      
      toast({
        title: "Downloaded!",
        description: "Your love letter has been saved",
      });
    } catch (error) {
      console.error("Error downloading letter:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to download the love letter",
      });
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card 
        id="love-letter-card"
        className="bg-white/95 backdrop-blur-sm border-primary/20 shadow-xl"
      >
        <CardContent className="p-8">
          <ScrollArea className="h-[400px] w-full pr-4">
            <div className="font-serif whitespace-pre-wrap leading-relaxed text-foreground/90">
              {letter}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <div className="flex justify-center gap-4">
        <Button
          variant="outline"
          className="gap-2"
          onClick={handleCopy}
        >
          <Copy className="w-4 h-4" />
          Copy Text
        </Button>
        <Button
          variant="secondary"
          className="gap-2"
          onClick={handleDownload}
          disabled={downloading}
        >
          <Download className="w-4 h-4" />
          Download E-Card
        </Button>
      </div>
    </div>
  );
};

export default GeneratedLetter;