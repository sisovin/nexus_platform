import { Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Testimonial } from '../../types';

const testimonials: Testimonial[] = [
  {
    name: "Sarah Johnson",
    role: "Product Manager",
    content: "This platform has completely transformed how we work. The efficiency gains are incredible!",
    avatar: "https://placehold.co/60x60/6366f1/ffffff?text=SJ"
  },
  {
    name: "Michael Chen",
    role: "Developer",
    content: "The best tool I've used in years. Clean interface, powerful features, and amazing support.",
    avatar: "https://placehold.co/60x60/8b5cf6/ffffff?text=MC"
  },
  {
    name: "Emma Rodriguez",
    role: "Designer",
    content: "Finally found a solution that understands our creative workflow. Highly recommended!",
    avatar: "https://placehold.co/60x60/06b6d4/ffffff?text=ER"
  }
];

export const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Users Say
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-8 rounded-2xl">
              <CardContent className="p-0">
                <div className="flex items-center mb-6">
                  <img 
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                    width={48}
                    height={48}
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-gray-600 text-sm">{testimonial.role}</div>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.content}"</p>
                <div className="flex mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};