
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Check, Star, TrendingUp, Zap, Calendar } from "lucide-react";

interface HelpDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const HelpDialog: React.FC<HelpDialogProps> = ({
  open,
  onOpenChange,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center text-xl">
            <BookOpen className="h-5 w-5 mr-2 text-primary" />
            Help & Documentation
          </DialogTitle>
          <DialogDescription>
            Learn how to use HabitTracker and get the most out of your habit building journey
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="getting-started" className="w-full">
          <TabsList className="grid grid-cols-3 w-full mb-4">
            <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
            <TabsTrigger value="features">Features Guide</TabsTrigger>
            <TabsTrigger value="tips">Tips & Benefits</TabsTrigger>
          </TabsList>
          
          <TabsContent value="getting-started" className="space-y-4">
            <h3 className="text-lg font-medium">Welcome to HabitTracker</h3>
            <p className="text-muted-foreground">Follow these steps to get started on your habit building journey:</p>
            
            <div className="space-y-4 mt-4">
              <div className="flex gap-3 items-start">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">1</div>
                <div>
                  <h4 className="font-medium">Create your first habit</h4>
                  <p className="text-muted-foreground">Click the plus button or "Create Habit" to add a new habit you want to track.</p>
                </div>
              </div>
              
              <div className="flex gap-3 items-start">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">2</div>
                <div>
                  <h4 className="font-medium">Track daily progress</h4>
                  <p className="text-muted-foreground">On the Today page, check off your habits as you complete them each day.</p>
                </div>
              </div>
              
              <div className="flex gap-3 items-start">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">3</div>
                <div>
                  <h4 className="font-medium">Monitor your streaks</h4>
                  <p className="text-muted-foreground">Build consistency by maintaining your streak - the app will automatically track consecutive days.</p>
                </div>
              </div>
              
              <div className="flex gap-3 items-start">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">4</div>
                <div>
                  <h4 className="font-medium">Analyze your progress</h4>
                  <p className="text-muted-foreground">Use the Stats page to see visualizations of your habit-building journey and get AI insights.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mt-4">
              <h4 className="font-medium flex items-center">
                <Zap className="h-4 w-4 mr-2 text-primary" />
                Quick Tip
              </h4>
              <p className="text-sm mt-1">Start with just 1-3 habits to avoid overwhelming yourself. You can always add more as you build consistency!</p>
            </div>
          </TabsContent>
          
          <TabsContent value="features" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-primary" />
                    Today View
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">The Today page displays habits you need to complete today. Tap the check button to mark them as done.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Check className="h-5 w-5 mr-2 text-primary" />
                    Habits List
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">View and manage all your active habits. Edit details, delete habits, or see individual streaks.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2 text-primary" />
                    Stats & Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Visualize your progress over time, identify patterns in your habit consistency, and get AI-powered insights.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Star className="h-5 w-5 mr-2 text-primary" />
                    AI Assistance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Get personalized insights and feedback from our AI assistant to improve your habit building journey.</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
              <h4 className="font-medium">Additional Features</h4>
              <ul className="mt-2 space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" /> 
                  <span>Streak goals that automatically move completed habits to history</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" /> 
                  <span>History page to see all completed habits and achievements</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" /> 
                  <span>Customizable habit settings and reminders</span>
                </li>
              </ul>
            </div>
          </TabsContent>
          
          <TabsContent value="tips" className="space-y-6">
            <h3 className="text-lg font-medium">Benefits of Regular Habit Tracking</h3>
            
            <div className="space-y-4">
              <div className="p-4 border rounded-lg bg-white">
                <h4 className="font-medium flex items-center text-primary">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Improved Consistency
                </h4>
                <p className="mt-1 text-sm">The visual representation of streaks provides motivation to maintain your habits, leading to more consistent behavior.</p>
              </div>
              
              <div className="p-4 border rounded-lg bg-white">
                <h4 className="font-medium flex items-center text-primary">
                  <Zap className="h-4 w-4 mr-2" />
                  Increased Accountability
                </h4>
                <p className="mt-1 text-sm">Tracking creates a sense of responsibility and accountability to yourself and your goals.</p>
              </div>
              
              <div className="p-4 border rounded-lg bg-white">
                <h4 className="font-medium flex items-center text-primary">
                  <Star className="h-4 w-4 mr-2" />
                  Evidence-Based Progress
                </h4>
                <p className="mt-1 text-sm">See tangible evidence of your progress over time, helping to maintain motivation during challenging periods.</p>
              </div>
            </div>
            
            <div className="bg-primary/5 p-5 rounded-xl border">
              <h3 className="font-medium mb-3">Tips for Long-term Success</h3>
              <ul className="space-y-3">
                <li className="flex gap-2">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Start with small, achievable habits and build up gradually</span>
                </li>
                <li className="flex gap-2">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Connect new habits to existing ones (habit stacking)</span>
                </li>
                <li className="flex gap-2">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Don't break the chain - focus on maintaining streaks</span>
                </li>
                <li className="flex gap-2">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Use the two-day rule: never skip a habit two days in a row</span>
                </li>
                <li className="flex gap-2">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Review your progress weekly and adjust your habits as needed</span>
                </li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-end mt-4">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="btn-hover-effect"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HelpDialog;
