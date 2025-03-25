
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Footer } from "@/components/Footer";
import { PetCard } from "@/components/PetCard";
import { AppointmentCard } from "@/components/AppointmentCard";
import { HealthTimeline } from "@/components/HealthTimeline";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const samplePets = [
  {
    id: "1",
    name: "Luna",
    species: "Kedi",
    breed: "British Shorthair",
    age: "3 yaş",
    imageUrl: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
    upcomingVaccines: 1,
    healthStatus: "healthy" as "healthy" | "attention" | "critical"
  },
  {
    id: "2", 
    name: "Max",
    species: "Köpek",
    breed: "Golden Retriever",
    age: "2 yaş",
    imageUrl: "https://images.unsplash.com/photo-1552053831-71594a27632d",
    upcomingVaccines: 2,
    healthStatus: "attention" as "healthy" | "attention" | "critical"
  }
];

const sampleAppointments = [
  {
    id: "1",
    title: "Yıllık Sağlık Kontrolü",
    date: "15 Mayıs 2023",
    time: "14:30",
    location: "Merkez Veteriner Kliniği",
    petName: "Luna",
    vetName: "Dr. Ayşe Demir",
    status: "upcoming" as "upcoming" | "completed" | "cancelled",
    isNext: true
  }
];

const sampleTimelineEvents = [
  {
    id: "1",
    date: "12 Haziran 2023",
    title: "Karma Aşı",
    description: "Yıllık karma aşı yapıldı",
    type: "vaccine",
    isPast: true
  },
  {
    id: "2",
    date: "15 Mayıs 2023",
    title: "Genel Sağlık Kontrolü",
    description: "Rutin sağlık kontrolü - tüm değerler normal",
    type: "checkup",
    isPast: true
  },
  {
    id: "3",
    date: "28 Nisan 2023",
    title: "Ateş ve Öksürük",
    description: "Hafif enfeksiyon teşhisi - antibiyotik tedavisi başlandı",
    type: "medicine",
    isPast: true
  },
  {
    id: "4",
    date: "10 Temmuz 2023",
    title: "Kuduz Aşısı",
    description: "Kuduz aşısı zamanı geldi",
    type: "vaccine",
    isPast: false
  }
];

// Animal image gallery data
const animalImages = [
  {
    url: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1",
    caption: "Yavru Kedi",
    species: "Kedi"
  },
  {
    url: "https://images.unsplash.com/photo-1560743641-3914f2c45636",
    caption: "Sadık Dost",
    species: "Köpek"
  },
  {
    url: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d",
    caption: "Safari'de Geyik ve Zebra",
    species: "Vahşi Yaşam"
  },
  {
    url: "https://images.unsplash.com/photo-1518877593221-1f28583780b4",
    caption: "Denizin Devleri",
    species: "Balina"
  },
  {
    url: "https://images.unsplash.com/photo-1441057206919-63d19fac2369",
    caption: "Antarktika'nın Sakinleri",
    species: "Penguen"
  },
  {
    url: "https://images.unsplash.com/photo-1501286353178-1ec871214838",
    caption: "Akıllı Meraklılar",
    species: "Maymun"
  }
];

const Index = () => {
  const demoSectionRef = useRef<HTMLDivElement>(null);
  const animalGalleryRef = useRef<HTMLDivElement>(null);
  
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
    
    if (demoSectionRef.current) {
      observer.observe(demoSectionRef.current);
    }
    
    if (animalGalleryRef.current) {
      observer.observe(animalGalleryRef.current);
    }
    
    return () => {
      if (demoSectionRef.current) {
        observer.unobserve(demoSectionRef.current);
      }
      if (animalGalleryRef.current) {
        observer.unobserve(animalGalleryRef.current);
      }
    };
  }, []);
  
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      
      {/* Animal Gallery Section */}
      <section ref={animalGalleryRef} className="py-20 px-4 bg-gradient-to-b from-white to-pawcare-50">
        <div className="container mx-auto">
          <div data-animate className="opacity-0 translate-y-4 text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center rounded-full px-4 py-1.5 mb-4 bg-pawcare-100 text-pawcare-800 text-sm font-medium">
              Hayvan Dünyası
            </div>
            <h2 className="text-3xl sm:text-4xl font-semibold mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pawcare-600 to-pawcare-400">
                Sevimli Dostlarımız
              </span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Yaşamımızı paylaştığımız sevimli dostlarımız ve onların sağlığı bizim için her şeyden önemli.
            </p>
          </div>
          
          <div data-animate className="opacity-0 translate-y-4 max-w-5xl mx-auto">
            <Carousel className="w-full">
              <CarouselContent>
                {animalImages.map((image, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-2">
                      <div className="overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg border border-pawcare-100/50 h-full">
                        <div className="aspect-square relative overflow-hidden">
                          <img 
                            src={image.url} 
                            alt={image.caption} 
                            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                          />
                        </div>
                        <div className="p-4">
                          <div className="mb-2">
                            <span className="inline-block px-2 py-1 text-xs font-medium bg-pawcare-100 text-pawcare-700 rounded-full">
                              {image.species}
                            </span>
                          </div>
                          <h3 className="font-medium text-lg">{image.caption}</h3>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="hidden md:flex">
                <CarouselPrevious />
                <CarouselNext />
              </div>
            </Carousel>
          </div>
        </div>
      </section>
      
      {/* Demo Section */}
      <section ref={demoSectionRef} className="py-20 px-4">
        <div className="container mx-auto">
          <div data-animate className="opacity-0 translate-y-4 text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center rounded-full px-4 py-1.5 mb-4 bg-pawcare-100 text-pawcare-800 text-sm font-medium">
              Demoya Göz Atın
            </div>
            <h2 className="text-3xl sm:text-4xl font-semibold mb-6">
              Evcil hayvanlarınızın sağlık takibi{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pawcare-600 to-pawcare-400">
                tek platform üzerinden
              </span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Tüm evcil hayvanlarınızın sağlık bilgilerini, randevularını ve ilaç takvimlerini
              kolayca yönetin ve takip edin.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div data-animate className="opacity-0 translate-y-4 lg:order-2">
              <div 
                className={cn(
                  "bg-white rounded-2xl shadow-lg overflow-hidden",
                  "border border-pawcare-100/50"
                )}
              >
                <div className="px-6 py-4 border-b border-pawcare-100/50 flex items-center justify-between">
                  <h3 className="font-medium">Evcil Hayvanlarım</h3>
                  <Button variant="outline" size="sm">Tümünü Gör</Button>
                </div>
                <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {samplePets.map(pet => (
                    <PetCard key={pet.id} {...pet} />
                  ))}
                </div>
              </div>
              
              <div 
                className={cn(
                  "mt-8 bg-white rounded-2xl shadow-lg overflow-hidden",
                  "border border-pawcare-100/50"
                )}
              >
                <div className="px-6 py-4 border-b border-pawcare-100/50 flex items-center justify-between">
                  <h3 className="font-medium">Randevularım</h3>
                  <Button variant="outline" size="sm">Tümünü Gör</Button>
                </div>
                <div className="p-6 space-y-4">
                  {sampleAppointments.map(appointment => (
                    <AppointmentCard key={appointment.id} {...appointment} />
                  ))}
                </div>
              </div>
            </div>
            
            <div data-animate className="opacity-0 translate-y-4 lg:order-1">
              <div 
                className={cn(
                  "bg-white rounded-2xl shadow-lg overflow-hidden",
                  "border border-pawcare-100/50 h-full"
                )}
              >
                <div className="px-6 py-4 border-b border-pawcare-100/50 flex items-center justify-between">
                  <h3 className="font-medium">Sağlık Zaman Çizelgesi</h3>
                  <Button variant="outline" size="sm">Tümünü Gör</Button>
                </div>
                <div className="p-6">
                  <HealthTimeline events={sampleTimelineEvents} />
                </div>
              </div>
            </div>
          </div>
          
          <div data-animate className="opacity-0 translate-y-4 mt-20 text-center">
            <h2 className="text-2xl md:text-3xl font-semibold mb-6">
              PawCare ile evcil hayvanlarınızın sağlığını takip etmeye hazır mısınız?
            </h2>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
              <Button asChild className="h-12 px-8 text-base" size="lg">
                <Link to="/get-started">Hemen Başla</Link>
              </Button>
              <Button asChild variant="outline" className="h-12 px-8 text-base" size="lg">
                <Link to="/faq">Demo Videoyu İzle</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
