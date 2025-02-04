import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Copy, Download, Heart, Share2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import html2canvas from "html2canvas";

interface GeneratedLetterProps {
  letter: string;
}

const GeneratedLetter = ({ letter }: GeneratedLetterProps) => {
  const { toast } = useToast();
  const [downloading, setDownloading] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState("/val.png");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    drawImage();
  }, [backgroundImage]); // Only backgroundImage is needed here

  const drawImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      // Text configuration
      const fontSize = 40;
      ctx.font = `${fontSize}px Arial`;
      ctx.fillStyle = "black";
      ctx.textAlign = "center";

      // Calculate max width (4/6 of canvas width)
      const maxWidth = (canvas.width * 4) / 6;
      const lineHeight = fontSize * 1.5; // 1.5x font size for better readability

      // Word wrap function
      function wrapText(text: string): string[] {
        const words = text.split(" ");
        const lines: string[] = [];
        let currentLine = "";

        words.forEach((word) => {
          const testLine = currentLine ? `${currentLine} ${word}` : word;
          const metrics = ctx.measureText(testLine);

          if (metrics.width > maxWidth && currentLine) {
            lines.push(currentLine);
            currentLine = word;
          } else {
            currentLine = testLine;
          }
        });

        if (currentLine) {
          lines.push(currentLine);
        }

        return lines;
      }

      // Process each line and wrap if needed
      const wrappedLines: string[] = [];
      letter.split("\n").forEach((line) => {
        wrappedLines.push(...wrapText(line));
      });

      const totalTextHeight = wrappedLines.length * lineHeight;
      const startY = (canvas.height - totalTextHeight) / 2;

      // Draw wrapped lines
      wrappedLines.forEach((line, index) => {
        const yPosition = startY + index * lineHeight;
        ctx.fillText(line, canvas.width / 2, yPosition);
      });
    };
    img.src = backgroundImage;
  };

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
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const img = new Image();
      img.crossOrigin = "anonymous";

      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = backgroundImage;
      });

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      // Text configuration
      const fontSize = 40;
      ctx.font = `${fontSize}px Arial`;
      ctx.fillStyle = "black";
      ctx.textAlign = "center";

      // Calculate max width (4/6 of canvas width)
      const maxWidth = (canvas.width * 4) / 6;
      const lineHeight = fontSize * 1.5;

      // Word wrap function
      function wrapText(text: string): string[] {
        const words = text.split(" ");
        const lines: string[] = [];
        let currentLine = "";

        words.forEach((word) => {
          const testLine = currentLine ? `${currentLine} ${word}` : word;
          const metrics = ctx.measureText(testLine);

          if (metrics.width > maxWidth && currentLine) {
            lines.push(currentLine);
            currentLine = word;
          } else {
            currentLine = testLine;
          }
        });

        if (currentLine) {
          lines.push(currentLine);
        }
        return lines;
      }

      // Process and wrap lines
      const wrappedLines: string[] = [];
      letter.split("\n").forEach((line) => {
        wrappedLines.push(...wrapText(line));
      });

      // Center text block
      const totalTextHeight = wrappedLines.length * lineHeight;
      const startY = (canvas.height - totalTextHeight) / 2;

      // Draw wrapped lines
      wrappedLines.forEach((line, index) => {
        const yPosition = startY + index * lineHeight;
        ctx.fillText(line, canvas.width / 2, yPosition);
      });

      // Download logic
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

  const handleShare = async () => {
    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const img = new Image();
      img.crossOrigin = "anonymous";

      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = backgroundImage;
      });

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      // Text configuration
      const fontSize = 40;
      ctx.font = `${fontSize}px Arial`;
      ctx.fillStyle = "black";
      ctx.textAlign = "center";

      // Calculate max width (4/6 of canvas width)
      const maxWidth = (canvas.width * 4) / 6;
      const lineHeight = fontSize * 1.5;

      // Word wrap function
      function wrapText(text: string): string[] {
        const words = text.split(" ");
        const lines: string[] = [];
        let currentLine = "";

        words.forEach((word) => {
          const testLine = currentLine ? `${currentLine} ${word}` : word;
          const metrics = ctx.measureText(testLine);

          if (metrics.width > maxWidth && currentLine) {
            lines.push(currentLine);
            currentLine = word;
          } else {
            currentLine = testLine;
          }
        });

        if (currentLine) {
          lines.push(currentLine);
        }
        return lines;
      }

      // Process and wrap lines
      const wrappedLines: string[] = [];
      letter.split("\n").forEach((line) => {
        wrappedLines.push(...wrapText(line));
      });

      // Center text block
      const totalTextHeight = wrappedLines.length * lineHeight;
      const startY = (canvas.height - totalTextHeight) / 2;

      // Draw wrapped lines
      wrappedLines.forEach((line, index) => {
        const yPosition = startY + index * lineHeight;
        ctx.fillText(line, canvas.width / 2, yPosition);
      });

      // Get image data
      const imageData = canvas.toDataURL("image/png");
      // const data = canvas.toDataURL("image/png");

      // Convert base64 to blob
      const response = await fetch(imageData);
      const blob = await response.blob();

      // Create file from blob
      const file = new File([blob], "love-letter.png", {
        type: "image/png",
        lastModified: Date.now(),
      });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: "Love Letter",
          text: "Check out this love letter!",
        });

        toast({
          title: "Shared successfully!",
          description: "Your love letter has been shared",
        });
      } else {
        // Fallback for devices that don't support file sharing
        const shareData = {
          title: "Love Letter",
          text: "Check out this love letter!",
          url: window.location.href,
        };

        if (navigator.share) {
          await navigator.share(shareData);
          toast({
            title: "Shared!",
            description: "Link to create love letter has been shared",
          });
        } else {
          throw new Error("Sharing not supported on this device");
        }
      }
    } catch (error) {
      console.error("Error sharing:", error);
      toast({
        variant: "destructive",
        title: "Sharing failed",
        description:
          error instanceof Error ? error.message : "Failed to share image",
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card
        id="love-letter-card"
        className="bg-white/95 backdrop-blur-sm border-primary/20 shadow-xl"
      >
        <CardContent className="p-4 lg:p-8">
          <ScrollArea className="h-[500px] w-full pr-4">
            <div className="font-serif whitespace-pre-wrap leading-relaxed text-foreground/90">
              {letter}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <div className="flex flex-col md:flex-row justify-center gap-4">
        <Button variant="outline" className="gap-2" onClick={handleCopy}>
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
        <Button variant="secondary" className="gap-2" onClick={handleShare}>
          <Share2 className="w-4 h-4" />
          Share
        </Button>
      </div>

      {/* <div className="flex justify-center">
        <canvas ref={canvasRef} className="border border-gray-300"></canvas>
      </div> */}
    </div>
  );
};

export default GeneratedLetter;
