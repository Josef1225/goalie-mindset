
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, BrainIcon } from "lucide-react";

interface ProgressAnalysisDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  analysis: string | null;
  loading: boolean;
  error: string | null;
}

const ProgressAnalysisDialog: React.FC<ProgressAnalysisDialogProps> = ({
  open,
  onOpenChange,
  analysis,
  loading,
  error,
}) => {
  // Function to format the analysis text with proper styling
  const formatAnalysis = (text: string) => {
    if (!text) return '';
    
    // Replace line breaks with paragraph tags
    let formattedText = text
      .split('\n\n')
      .map(paragraph => `<p>${paragraph}</p>`)
      .join('');
    
    // Bold section headers (like "OVERALL PROGRESS:")
    formattedText = formattedText.replace(
      /([A-Z\s]+):/g, 
      '<h3 class="text-lg font-semibold mt-4 mb-2">$1</h3>'
    );
    
    return formattedText;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl glass-effect">
        <DialogHeader>
          <DialogTitle className="flex items-center text-xl">
            <BrainIcon className="h-5 w-5 mr-2 text-primary" />
            AI Progress Analysis
          </DialogTitle>
          <DialogDescription className="text-base">
            Here's an in-depth analysis of your habit tracking progress
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-6 space-y-4">
          {loading && (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2 text-lg">Analyzing your progress...</span>
            </div>
          )}
          
          {error && (
            <div className="p-6 bg-destructive/10 text-destructive rounded-xl border border-destructive/20">
              <p className="font-medium mb-2">Error</p>
              <p>{error}</p>
            </div>
          )}
          
          {!loading && !error && analysis && (
            <div className="prose prose-lg max-w-none p-6 bg-white/50 rounded-xl border border-border/40">
              <div dangerouslySetInnerHTML={{ __html: formatAnalysis(analysis) }} />
            </div>
          )}
          
          <div className="flex justify-end pt-4">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="btn-hover-effect"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProgressAnalysisDialog;
