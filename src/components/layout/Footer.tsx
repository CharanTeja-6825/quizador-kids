
import React from "react";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="mt-auto py-6 px-4 border-t border-border/40">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center">
            <span className={cn(
              "text-xl font-display font-bold",
              "bg-gradient-to-r from-kid-blue to-kid-purple bg-clip-text text-transparent"
            )}>
              KidLearn
            </span>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">About</a>
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Help</a>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <span>Made with</span>
            <Heart size={14} className="mx-1 text-kid-pink" />
            <span>for curious minds</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
