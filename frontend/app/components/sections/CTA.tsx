import { Button } from '@/components/ui/button';

export const CTA = () => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of teams already using our platform to achieve their goals
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
              Start Free Trial
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold">
              Schedule Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};