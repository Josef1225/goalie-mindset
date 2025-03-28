
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check, Calendar, BarChart2, Zap } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/90">
      <div className="container px-4 py-8 mx-auto">
        {/* Hero Section */}
        <section className="py-12 md:py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Track Your Habits, <span className="text-primary">Change Your Life</span>
            </h1>
            <p className="mt-6 text-xl text-muted-foreground">
              Build lasting habits and achieve your goals with our simple, effective habit tracking system. 
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
              <Button asChild size="lg" className="gap-2">
                <Link to="/auth/signup">
                  Get Started <ArrowRight size={16} />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/auth/login">Sign In</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Why use our habit tracker?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard 
                icon={<Calendar className="h-10 w-10 text-primary" />}
                title="Track Daily Progress"
                description="Monitor your habits daily, weekly, or monthly. Flexible tracking to fit your lifestyle."
              />
              <FeatureCard 
                icon={<BarChart2 className="h-10 w-10 text-primary" />}
                title="Visual Statistics"
                description="See your progress with beautiful charts and visualizations. Stay motivated with achievement streaks."
              />
              <FeatureCard 
                icon={<Zap className="h-10 w-10 text-primary" />}
                title="Build Consistency"
                description="Develop lasting habits through consistency. Our app helps you stay on track even when life gets busy."
              />
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-12 md:py-16 bg-secondary/10 rounded-3xl my-12">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <StepCard 
                number="1"
                title="Create habits"
                description="Set up the habits you want to track. Customize frequency, reminders, and more."
              />
              <StepCard 
                number="2"
                title="Track daily"
                description="Check off your habits as you complete them. Build streaks and see your progress."
              />
              <StepCard 
                number="3"
                title="Analyze progress"
                description="Review your performance and identify trends to continuously improve."
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to build better habits?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of users who have transformed their lives through consistent habit building.
            </p>
            <Button asChild size="lg" className="gap-2">
              <Link to="/auth/signup">
                Create Your Account <ArrowRight size={16} />
              </Link>
            </Button>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="py-8 border-t">
        <div className="container">
          <div className="text-center text-muted-foreground">
            <p>© {new Date().getFullYear()} Habit Tracker. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Feature Card component
const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="flex flex-col items-center text-center p-6 rounded-xl bg-card border shadow-sm">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

// Step Card component
const StepCard = ({ number, title, description }) => {
  return (
    <div className="flex flex-col items-center text-center p-6">
      <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mb-4">
        {number}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default Home;
