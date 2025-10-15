import { Star, ChevronRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
              <Star className="w-4 h-4 mr-2" />
              Featured in TechCrunch
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
              Transform Your Digital
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Experience</span>
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed">
              The all-in-one platform that helps teams collaborate, create, and scale with ease. 
              Join thousands of companies already using our cutting-edge solutions.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-blue-600 hover:bg-blue-700 px-8 py-4 text-lg font-semibold">
                Start Free Trial
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="outline" className="px-8 py-4 text-lg font-semibold">
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </div>
            
            <div className="flex items-center space-x-8 pt-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <img 
                    key={i}
                    src={`https://placehold.co/40x40/6366f1/ffffff?text=U${i}`}
                    alt={`User ${i}`}
                    className="w-10 h-10 rounded-full border-2 border-white"
                  />
                ))}
              </div>
              <p className="text-gray-600">
                <span className="font-semibold text-gray-900">50,000+</span> users trust us
              </p>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative z-10">
              <img 
                src="https://placehold.co/600x500/f8fafc/64748b?text=Dashboard+Preview"
                alt="Dashboard Preview"
                className="rounded-2xl shadow-2xl"
                width={600}
                height={500}
              />
            </div>
            <div className="absolute -top-4 -right-4 w-full h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl opacity-20 blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};