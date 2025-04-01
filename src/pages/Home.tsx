
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Calendar, BarChart2, Zap, Star, Shield, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="text-2xl font-bold text-primary">HabitTracker</div>
        <div className="flex gap-4">
          <Button asChild variant="ghost">
            <Link to="/auth/login">Sign in</Link>
          </Button>
          <Button asChild>
            <Link to="/auth/signup">Get started</Link>
          </Button>
        </div>
      </header>
      
      {/* Hero Section with animation */}
      <section className="py-16 md:py-24 container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-700">
              Build Better Habits,<br /> Transform Your Life
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simple, effective habit tracking to help you achieve your goals and become your best self.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
          >
            <Button asChild size="lg" className="gap-2 text-lg px-6 py-6 bg-gradient-to-r from-primary to-blue-600 hover:from-blue-600 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300">
              <Link to="/auth/signup">
                Get Started Free <ArrowRight size={18} />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-6 py-6 border-2">
              <Link to="/auth/login">Sign In</Link>
            </Button>
          </motion.div>
        </div>
        
        {/* Floating cards showcase */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="mt-16 relative max-w-5xl mx-auto"
        >
          <div className="relative h-[300px] md:h-[400px] overflow-hidden rounded-xl shadow-2xl border border-blue-100">
            <div className="absolute inset-0 bg-gradient-to-br from-white/90 to-blue-50/90 backdrop-blur-sm z-10"></div>
            <div className="absolute top-10 left-4 right-4 grid grid-cols-1 md:grid-cols-3 gap-4 z-20">
              <HabitCard 
                title="Morning Meditation" 
                streak={8} 
                color="bg-gradient-to-br from-purple-50 to-purple-100"
                icon={<Star className="h-5 w-5 text-purple-500" />}
                delay={0.6}
              />
              <HabitCard 
                title="Read 30 minutes" 
                streak={12} 
                color="bg-gradient-to-br from-blue-50 to-blue-100"
                icon={<TrendingUp className="h-5 w-5 text-blue-500" />}
                delay={0.8}
              />
              <HabitCard 
                title="Exercise" 
                streak={5} 
                color="bg-gradient-to-br from-green-50 to-green-100"
                icon={<Shield className="h-5 w-5 text-green-500" />}
                delay={1}
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Section with animated entries */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold">Why use our habit tracker?</h2>
            <div className="h-1 w-20 bg-primary mx-auto mt-4 rounded-full"></div>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <FeatureCard 
              icon={<Calendar className="h-10 w-10 text-primary" />}
              title="Track Daily Progress"
              description="Monitor your habits on a daily, weekly, or monthly basis. Our flexible tracking adapts to fit your lifestyle."
              delay={0.2}
            />
            <FeatureCard 
              icon={<BarChart2 className="h-10 w-10 text-primary" />}
              title="Visual Analytics"
              description="See your progress with beautiful charts and visualizations. Stay motivated with achievement streaks and insights."
              delay={0.4}
            />
            <FeatureCard 
              icon={<Zap className="h-10 w-10 text-primary" />}
              title="Build Consistency"
              description="Develop lasting habits through consistency. Our app helps you stay on track even when life gets busy."
              delay={0.6}
            />
          </div>
        </div>
      </section>

      {/* How It Works Section with animation */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold">How It Works</h2>
            <div className="h-1 w-20 bg-primary mx-auto mt-4 rounded-full"></div>
          </motion.div>
          
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 relative">
              <div className="absolute top-12 left-[10%] right-[10%] h-1 bg-blue-200 hidden md:block"></div>
              <StepCard 
                number="1"
                title="Create habits"
                description="Set up the habits you want to track. Customize frequency, reminders, and more."
                delay={0.3}
              />
              <StepCard 
                number="2"
                title="Track daily"
                description="Check off your habits as you complete them. Build streaks and see your progress."
                delay={0.5}
              />
              <StepCard 
                number="3"
                title="Analyze progress"
                description="Review your performance and identify trends to continuously improve."
                delay={0.7}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold">What People Say</h2>
            <div className="h-1 w-20 bg-primary mx-auto mt-4 rounded-full"></div>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <TestimonialCard 
              text="\"This app changed my morning routine completely. I'm now more productive than ever.\""
              name="Emma S."
              role="Teacher"
              delay={0.2}
            />
            <TestimonialCard 
              text="\"I've tried many habit trackers, but this one is different. Simple yet powerful.\""
              name="Michael R."
              role="Designer"
              delay={0.4}
            />
            <TestimonialCard 
              text="\"The analytics help me understand my patterns and make better choices.\""
              name="Sarah J."
              role="Marketing Director"
              delay={0.6}
            />
          </div>
        </div>
      </section>

      {/* CTA Section with animation */}
      <section className="py-20 bg-gradient-to-br from-primary/90 to-blue-600 text-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to build better habits?</h2>
            <p className="text-xl text-white/80 mb-8">
              Join thousands of users who have transformed their lives through consistent habit building.
            </p>
            <Button asChild size="lg" className="gap-2 text-lg px-8 py-6 bg-white text-primary hover:bg-white/90 transition-all duration-300">
              <Link to="/auth/signup">
                Create Your Account <ArrowRight size={18} />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-900 text-white/70">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="font-medium text-lg text-white mb-2">HabitTracker</p>
            <p className="mb-4">© {new Date().getFullYear()} All rights reserved.</p>
            <div className="flex justify-center gap-4">
              <a href="#" className="opacity-70 hover:opacity-100 transition-opacity">Terms</a>
              <a href="#" className="opacity-70 hover:opacity-100 transition-opacity">Privacy</a>
              <a href="#" className="opacity-70 hover:opacity-100 transition-opacity">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Animated Feature Card component
const FeatureCard = ({ icon, title, description, delay = 0 }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      viewport={{ once: true }}
      className="flex flex-col items-center text-center p-6 rounded-xl bg-white border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <div className="mb-4 p-3 bg-blue-50 rounded-full">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

// Animated Step Card component
const StepCard = ({ number, title, description, delay = 0 }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      viewport={{ once: true }}
      className="flex flex-col items-center text-center p-6 relative z-10"
    >
      <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold mb-4 shadow-lg">
        {number}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

// Testimonial Card component
const TestimonialCard = ({ text, name, role, delay = 0 }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-blue-50 p-6 rounded-xl border border-blue-100"
    >
      <p className="text-gray-700 mb-4 italic">{text}</p>
      <div>
        <p className="font-semibold">{name}</p>
        <p className="text-sm text-gray-600">{role}</p>
      </div>
    </motion.div>
  );
};

// Habit Card component for hero section
const HabitCard = ({ title, streak, color, icon, delay = 0 }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className={`${color} p-4 rounded-lg shadow-md border border-gray-100`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {icon}
          <h3 className="font-medium">{title}</h3>
        </div>
        <div className="flex items-center gap-1 text-sm font-medium text-gray-700">
          <CheckCircle className="h-4 w-4 text-green-500" />
          {streak} days
        </div>
      </div>
      <div className="w-full bg-white/50 rounded-full h-2 mt-2">
        <div className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full" style={{ width: `${Math.min(streak * 7, 100)}%` }}></div>
      </div>
    </motion.div>
  );
};

export default Home;
