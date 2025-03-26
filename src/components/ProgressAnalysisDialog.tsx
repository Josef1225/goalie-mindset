
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

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
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>AI Progress Analysis</DialogTitle>
          <DialogDescription>
            Here's an analysis of your habit tracking progress
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-4 space-y-4">
          {loading && (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2">Analyzing your progress...</span>
            </div>
          )}
          
          {error && (
            <div className="p-4 bg-destructive/10 text-destructive rounded-md">
              {error}
            </div>
          )}
          
          {!loading && !error && analysis && (
            <div className="prose prose-sm max-w-none">
              <div dangerouslySetInnerHTML={{ __html: analysis.replace(/\n/g, '<br />') }} />
            </div>
          )}
          
          <div className="flex justify-end">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
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
