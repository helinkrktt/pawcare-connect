
import { useState, useRef, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { PawPrint, ArrowRight } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

type FAQItem = {
  question: string;
  answer: string;
};

const faqItems: FAQItem[] = [
  {
    question: "PawCare nedir?",
    answer: "PawCare, evcil hayvan sahiplerinin hayvanlarının sağlık bilgilerini, aşı takvimlerini ve veteriner randevularını tek bir platformda takip edebilmelerini sağlayan dijital bir sağlık takip sistemidir. Uygulama, evcil hayvanlarınızın sağlık geçmişini kaydetmenize, hatırlatmalar almanıza ve sağlık durumlarını kolayca izlemenize olanak tanır."
  },
  {
    question: "PawCare kullanmak ücretli mi?",
    answer: "PawCare'in temel özellikleri tamamen ücretsizdir. Evcil hayvanlarınızın profil bilgilerini girme, sağlık kayıtlarını tutma, aşı takvimlerini takip etme ve temel hatırlatmaları alma gibi temel özellikler ücretsiz olarak sunulmaktadır. Premium özellikler için aylık veya yıllık abonelik planlarımız mevcuttur."
  },
  {
    question: "Kaç evcil hayvan ekleyebilirim?",
    answer: "Ücretsiz planda 5 evcil hayvana kadar ekleyebilirsiniz. Premium paketlerimizde ise sınırsız sayıda evcil hayvan ekleyebilirsiniz."
  },
  {
    question: "Evcil hayvanımın sağlık kayıtlarını nasıl ekleyebilirim?",
    answer: "Evcil hayvanınızı sisteme ekledikten sonra, profil sayfasından 'Sağlık Kaydı Ekle' butonuna tıklayarak geçmiş ve güncel sağlık kayıtlarını ekleyebilirsiniz. Aşı bilgileri, ilaç kayıtları, ameliyatlar ve rutin kontroller gibi tüm sağlık bilgilerini detaylı olarak girebilirsiniz."
  },
  {
    question: "Aşı hatırlatmaları nasıl çalışır?",
    answer: "Evcil hayvanınızın aşı bilgilerini sisteme girdiğinizde, sistem otomatik olarak bir sonraki aşı tarihini hesaplar ve yaklaşan tarihler için size e-posta ve uygulama bildirimleri gönderir. Hatırlatmalarınızı kişiselleştirebilir ve ne kadar önce bildirim almak istediğinizi ayarlayabilirsiniz."
  },
  {
    question: "Veteriner ile randevu oluşturabilir miyim?",
    answer: "Evet, PawCare sistemine kayıtlı veteriner kliniklerinden doğrudan randevu talep edebilirsiniz. Veterineriniz sistemimizde kayıtlı değilse, manuel olarak randevu bilgisi ekleyebilir ve hatırlatma alabilirsiniz."
  },
  {
    question: "Birden fazla kullanıcı aynı evcil hayvan profilini yönetebilir mi?",
    answer: "Evet, Premium pakette aile üyeleri veya bakıcılar gibi birden fazla kullanıcı aynı evcil hayvan profillerine erişim sağlayabilir. Bu sayede eşiniz, çocuklarınız veya bakıcınız da evcil hayvanınızın sağlık durumunu takip edebilir ve gerektiğinde güncellemeler yapabilir."
  },
  {
    question: "Verilerim güvende mi?",
    answer: "Evet, PawCare olarak kullanıcı verilerinin güvenliği bizim için çok önemlidir. Tüm veriler şifrelenerek saklanır ve sadece yetkilendirilmiş kişilerin erişimine açıktır. En son güvenlik protokollerini ve teknolojilerini kullanarak verilerinizi koruyoruz."
  },
  {
    question: "Mobil uygulama var mı?",
    answer: "Evet, PawCare iOS ve Android platformları için mobil uygulamalara sahiptir. Mobil uygulamalarımız sayesinde evcil hayvanlarınızın sağlık bilgilerine her yerden erişebilir ve anlık bildirimler alabilirsiniz."
  },
  {
    question: "Evcil hayvanımın ilaç takibini yapabilir miyim?",
    answer: "Kesinlikle. PawCare, evcil hayvanınızın kullandığı ilaçları, dozajları ve kullanım sürelerini takip etmenize olanak tanır. Düzenli ilaç kullanımı gerektiren durumlarda hatırlatma alabilir, ilaç stok durumunuzu kontrol edebilirsiniz."
  }
];

const FAQ = () => {
  const [openItems, setOpenItems] = useState<Record<number, boolean>>({});
  const faqSectionRef = useRef<HTMLDivElement>(null);
  
  const toggleItem = (index: number) => {
    setOpenItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };
  
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
    
    if (faqSectionRef.current) {
      observer.observe(faqSectionRef.current);
    }
    
    return () => {
      if (faqSectionRef.current) {
        observer.unobserve(faqSectionRef.current);
      }
    };
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <section className="py-16 md:py-24">
          <div className="container max-w-4xl">
            <div className="text-center mb-16">
              <div data-animate className="opacity-0 translate-y-4 inline-flex items-center rounded-full px-4 py-1.5 mb-6 bg-pawcare-100 text-pawcare-800 text-sm font-medium">
                Sıkça Sorulan Sorular
              </div>
              <h1 data-animate className="opacity-0 translate-y-4 text-4xl font-bold mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pawcare-600 to-pawcare-400">PawCare</span> Hakkında Merak Edilenler
              </h1>
              <p data-animate className="opacity-0 translate-y-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Evcil hayvanlarınızın sağlığını takip etmenin en kolay yolu olan PawCare hakkında sık sorulan soruların cevaplarını burada bulabilirsiniz.
              </p>
            </div>
            
            <div ref={faqSectionRef} className="space-y-4">
              {faqItems.map((item, index) => (
                <div 
                  key={index} 
                  data-animate 
                  className={cn(
                    "opacity-0 translate-y-4 border border-pawcare-100/50 rounded-lg overflow-hidden bg-white",
                    openItems[index] && "shadow-sm"
                  )}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <Collapsible
                    open={openItems[index]}
                    onOpenChange={() => toggleItem(index)}
                  >
                    <CollapsibleTrigger className="flex justify-between items-center w-full p-4 text-left font-medium hover:bg-pawcare-50 transition-colors">
                      <span>{item.question}</span>
                      <div className={cn(
                        "h-6 w-6 rounded-full flex items-center justify-center border border-pawcare-200 text-pawcare-600 transition-transform",
                        openItems[index] && "bg-pawcare-100 rotate-180"
                      )}>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6 2.5V9.5M6 9.5L10 5.5M6 9.5L2 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="p-4 pt-0 text-muted-foreground border-t border-pawcare-100/50">
                        {item.answer}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </div>
              ))}
            </div>
            
            <div data-animate className="opacity-0 translate-y-4 mt-16 p-6 bg-pawcare-50 rounded-xl border border-pawcare-100">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="bg-white p-3 rounded-full shadow-sm">
                    <PawPrint className="h-8 w-8 text-pawcare-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Başka sorularınız mı var?</h3>
                    <p className="text-muted-foreground">Bizimle iletişime geçmekten çekinmeyin.</p>
                  </div>
                </div>
                <Button asChild className="w-full md:w-auto">
                  <Link to="/contact" className="flex items-center gap-2">
                    İletişime Geçin
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            
            <div data-animate className="opacity-0 translate-y-4 mt-16 text-center">
              <h3 className="text-2xl font-semibold mb-6">
                Evcil hayvanınızın sağlığını takip etmeye hazır mısınız?
              </h3>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button asChild className="h-12 px-8 text-base" size="lg">
                  <Link to="/register">Hemen Başla</Link>
                </Button>
                <Button asChild variant="outline" className="h-12 px-8 text-base" size="lg">
                  <Link to="/get-started">Nasıl Çalışır</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default FAQ;
