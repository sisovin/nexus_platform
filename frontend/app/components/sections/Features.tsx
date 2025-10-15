import { Zap, Shield, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Feature } from '../../types';

const features: Feature[] = [
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Lightning Fast",
    description: "Optimized for speed and performance to deliver the best user experience."
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Secure & Reliable",
    description: "Enterprise-grade security with 99.9% uptime guarantee."
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Community Driven",
    description: "Join thousands of satisfied users building amazing things."
  }
];

export const Features = () => {
  return (
    <section id="features" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to succeed in one comprehensive platform
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="p-8 rounded-2xl hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};