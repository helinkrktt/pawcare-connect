
import { useEffect, useRef } from 'react';
import { Heart, Calendar, Bell, PawPrint } from 'lucide-react';
import { cn } from '@/lib/utils';

const features = [
  {
    icon: PawPrint,
    title: "Evcil Hayvan Profilleri",
    description: "Tüm evcil hayvanlarınız için detaylı profiller oluşturun ve sağlık geçmişlerini tek bir yerden takip edin."
  },
  {
    icon: Heart,
    title: "Sağlık Kayıtları",
    description: "Veteriner ziyaretleri, aşılar, ilaçlar ve tedavileri kolayca kaydedin ve geçmiş bilgilere anında erişin."
  },
  {
    icon: Calendar,
    title: "Aşı Takvimleri",
    description: "Özel aşı takvimleri oluşturun ve hayvanınızın sağlığı için kritik tarihleri asla kaçırmayın."
  },
  {
    icon: Bell,
    title: "Akıllı Hatırlatmalar",
    description: "Zamanı gelen aşılar, kontroller ve ilaçlar için otomatik hatırlatmalar alın."
  }
];

export function Features() {
  const featuresRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll('[data-animate]');
            elements.forEach((el, i) => {
              setTimeout(() => {
                el.classList.add('animate-slide-up');
                el.classList.remove('opacity-0');
                el.classList.remove('translate-y-4');
              }, i * 150);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (featuresRef.current) {
      observer.observe(featuresRef.current);
    }
    
    return () => {
      if (featuresRef.current) {
        observer.unobserve(featuresRef.current);
      }
    };
  }, []);
  
  return (
    <section ref={featuresRef} className="py-20 px-4 bg-gradient-to-b from-white to-pawcare-50">
      <div className="container mx-auto">
        <div data-animate className="opacity-0 translate-y-4 text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center rounded-full px-4 py-1.5 mb-4 bg-pawcare-100 text-pawcare-800 text-sm font-medium">
            Öne Çıkan Özellikler
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold mb-6">
            Evcil hayvanınızın sağlığını takip etmek hiç bu kadar{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pawcare-600 to-pawcare-400">
              kolay olmamıştı
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            PawCare ile evcil hayvanlarınızın sağlık kayıtlarını yönetmek, aşı takvimlerini takip etmek ve
            randevularını planlamak için ihtiyacınız olan her şey tek bir platformda.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {features.map((feature, i) => (
            <div 
              key={feature.title} 
              data-animate 
              className="opacity-0 translate-y-4 relative group"
            >
              <div 
                className={cn(
                  "relative z-10 p-6 sm:p-8 rounded-2xl",
                  "bg-white/90 backdrop-blur-md",
                  "border border-pawcare-100/50",
                  "transition-all duration-300",
                  "group-hover:shadow-xl group-hover:shadow-pawcare-100/20",
                  "group-hover:-translate-y-1"
                )}
              >
                <div className="flex flex-col sm:flex-row gap-5 items-start">
                  <div 
                    className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center",
                      "bg-pawcare-100 text-pawcare-600",
                      "transition-all duration-300",
                      "group-hover:bg-pawcare-600 group-hover:text-white"
                    )}
                  >
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div 
                className={cn(
                  "absolute inset-0 z-0",
                  "bg-gradient-to-br from-pawcare-100/50 to-pawcare-50/50 opacity-0",
                  "rounded-2xl",
                  "transition-opacity duration-300",
                  "group-hover:opacity-80"
                )}
              ></div>
              <div 
                className={cn(
                  "absolute -bottom-2 -right-2 w-16 h-16 rounded-full",
                  "bg-pawcare-100/20",
                  "opacity-0 scale-50",
                  "transition-all duration-300 delay-75",
                  "group-hover:opacity-80 group-hover:scale-100"
                )}
              ></div>
              <div 
                className={cn(
                  "absolute -top-1 -left-1 w-8 h-8 rounded-full",
                  "bg-pawcare-200/30",
                  "opacity-0 scale-50",
                  "transition-all duration-300 delay-100",
                  "group-hover:opacity-80 group-hover:scale-100"
                )}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
