
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

// Simple markdown formatter for our basic markdown needs
const formatMarkdown = (text: string) => {
  if (!text) return '';
  
  // Format headers
  let formatted = text.replace(/## (.*?)\n/g, '<h2 class="text-xl font-bold mt-4 mb-2">$1</h2>');
  formatted = formatted.replace(/### (.*?)\n/g, '<h3 class="text-lg font-semibold mt-3 mb-2">$1</h3>');
  
  // Format bold text
  formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  // Format paragraphs
  formatted = formatted.replace(/\n\n/g, '</p><p class="my-2">');
  
  // Format lists
  formatted = formatted.replace(/- (.*?)\n/g, '<li>$1</li>');
  formatted = formatted.replace(/<li>(.*?)<\/li>/g, '<ul class="list-disc pl-5 my-2">$&</ul>');
  formatted = formatted.replace(/<ul class="list-disc pl-5 my-2"><\/ul>/g, '');
  formatted = formatted.replace(/<\/ul><ul class="list-disc pl-5 my-2">/g, '');
  
  return `<p class="my-2">${formatted}</p>`;
};

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
            <div className="prose prose-lg max-w-none p-4 bg-white/50 rounded-xl border border-border/40">
              <div dangerouslySetInnerHTML={{ __html: formatMarkdown(analysis) }} />
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
