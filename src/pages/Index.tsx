
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";
import { BookOpen, Brain, GraduationCap, Puzzle, Stars } from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated, login } = useUser();

  useEffect(() => {
    // Welcome message
    setTimeout(() => {
      toast("Welcome to KidLearn! 👋", {
        description: "The fun way to learn and grow.",
      });
    }, 1000);
  }, []);
  
  const features = [
    {
      icon: <BookOpen className="text-kid-blue" size={24} />,
      title: "Interactive Lessons",
      description: "Fun and engaging lessons designed to captivate young minds"
    },
    {
      icon: <Puzzle className="text-kid-purple" size={24} />,
      title: "Fun Quizzes",
      description: "Test knowledge with enjoyable quizzes that make learning exciting"
    },
    {
      icon: <Stars className="text-kid-orange" size={24} />,
      title: "Rewards System",
      description: "Earn stars and unlock achievements as you learn and progress"
    },
    {
      icon: <Brain className="text-kid-teal" size={24} />,
      title: "Adaptive Learning",
      description: "Content that adapts to your child's learning pace and style"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative pt-28 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-purple-50 -z-10" />
        
        {/* Decorative circles */}
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-kid-blue/10 blur-3xl -z-10 animate-pulse-gentle" />
        <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-kid-purple/10 blur-3xl -z-10 animate-pulse-gentle" />
        
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="flex-1 space-y-6 text-center md:text-left">
              <div className="inline-block text-sm font-medium px-3 py-1 bg-primary/10 text-primary rounded-full animate-fade-in">
                Learning made fun for kids
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight animate-fade-in">
                <span className="text-gradient">Inspire</span> young minds to learn and{" "}
                <span className="text-gradient">grow</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto md:mx-0 animate-fade-in delayed-100">
                Interactive lessons and engaging quizzes designed specifically for children,
                making education an adventure they'll love.
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start animate-fade-in delayed-200">
                <Button
                  size="lg"
                  className="button-primary"
                  onClick={() => isAuthenticated ? navigate("/dashboard") : login()}
                >
                  {isAuthenticated ? "Go to Dashboard" : "Get Started"}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="button-secondary"
                  onClick={() => navigate("/lessons")}
                >
                  Explore Lessons
                </Button>
              </div>
            </div>
            
            <div className="flex-1 animate-fade-in delayed-300">
              <div className="relative">
                <div className="absolute -inset-4 rounded-xl bg-gradient-to-r from-kid-blue/20 to-kid-purple/20 blur-xl -z-10" />
                <img
                  src="https://images.unsplash.com/photo-1503676382389-4809596d5290?q=80&w=1776&auto=format&fit=crop"
                  alt="Kids learning"
                  className="rounded-xl shadow-xl w-full aspect-[4/3] object-cover animate-float"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              <span className="text-gradient">Features</span> designed for young learners
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform combines education with play, creating an environment where 
              children can develop skills while having fun.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="glass-card p-6 rounded-xl flex flex-col items-center text-center 
                          transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="p-3 rounded-full bg-background mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-kid-blue/10 to-kid-purple/10">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Ready to start the learning adventure?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Join thousands of families who are making education enjoyable with KidLearn.
            </p>
            <Button 
              size="lg" 
              className="button-primary"
              onClick={() => isAuthenticated ? navigate("/dashboard") : login()}
            >
              {isAuthenticated ? "Go to Dashboard" : "Get Started Now"}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
