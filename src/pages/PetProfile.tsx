
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HealthTimeline } from "@/components/HealthTimeline";
import { Button } from "@/components/ui/button";
import { Heart, Calendar, Weight, Ruler, Cake, PawPrint, Info, Syringe, FilePlus, Edit } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const samplePets = [
  {
    id: "1",
    name: "Luna",
    species: "Kedi",
    breed: "British Shorthair",
    age: "3 yaş",
    gender: "Dişi",
    weight: "4.2 kg",
    height: "25 cm",
    birthDate: "10 Mayıs 2020",
    color: "Gri",
    microchip: "985121056478523",
    imageUrl: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
    healthStatus: "healthy"
  },
  {
    id: "2", 
    name: "Max",
    species: "Köpek",
    breed: "Golden Retriever",
    age: "2 yaş",
    gender: "Erkek",
    weight: "28.5 kg",
    height: "58 cm",
    birthDate: "22 Haziran 2021",
    color: "Altın Sarısı",
    microchip: "985121056478742",
    imageUrl: "https://images.unsplash.com/photo-1552053831-71594a27632d",
    healthStatus: "attention"
  },
  {
    id: "3",
    name: "Oliver",
    species: "Kedi",
    breed: "Scottish Fold",
    age: "1 yaş",
    gender: "Erkek",
    weight: "3.8 kg",
    height: "23 cm",
    birthDate: "15 Mart 2022",
    color: "Gri ve Beyaz",
    microchip: "985121056471234",
    imageUrl: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1",
    healthStatus: "healthy"
  }
] as const;

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
] as const;

const sampleAppointments = [
  {
    id: "1",
    title: "Yıllık Sağlık Kontrolü",
    date: "15 Mayıs 2023",
    time: "14:30",
    location: "Merkez Veteriner Kliniği",
    petName: "Luna",
    vetName: "Dr. Ayşe Demir",
    status: "upcoming",
    isNext: true
  },
  {
    id: "2",
    title: "Aşı Randevusu",
    date: "10 Mart 2023",
    time: "11:30",
    location: "PetHealth Veteriner Kliniği",
    petName: "Luna",
    vetName: "Dr. Emre Yıldız",
    status: "completed"
  }
] as const;

const PetProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Find the pet by ID
  const pet = samplePets.find(p => p.id === id) || samplePets[0];
  
  // Filter events for this pet (in a real app, this would filter by pet ID)
  const petEvents = sampleTimelineEvents;
  
  // Filter appointments for this pet
  const petAppointments = sampleAppointments.filter(a => a.petName === pet.name);
  
  const statusColors = {
    healthy: 'bg-green-100 text-green-800',
    attention: 'bg-amber-100 text-amber-800',
    critical: 'bg-red-100 text-red-800'
  };

  const statusText = {
    healthy: 'Sağlıklı',
    attention: 'Kontrol Gerekli',
    critical: 'Acil Bakım'
  };
  
  return (
    <div className="min-h-screen bg-pawcare-50/30">
      <Navbar />
      
      <main className="pt-20 pb-16">
        <div className="container px-4 py-6">
          {/* Pet Header */}
          <div className="bg-white rounded-xl shadow-sm border border-pawcare-100/50 overflow-hidden mb-8">
            <div className="h-48 sm:h-64 bg-gradient-to-r from-pawcare-600 to-pawcare-400 relative overflow-hidden">
              <div className="absolute inset-0 bg-black/20 z-10"></div>
              
              <div 
                className={cn(
                  "absolute bottom-0 left-0 right-0 p-6 z-20 flex items-end justify-between",
                  "text-white"
                )}
              >
                <div>
                  <h1 className="text-3xl font-semibold">{pet.name}</h1>
                  <p>{pet.breed} • {pet.age}</p>
                </div>
                
                <span className={cn(
                  "px-3 py-1 rounded-full text-sm font-medium",
                  statusColors[pet.healthStatus]
                )}>
                  {statusText[pet.healthStatus]}
                </span>
              </div>
              
              <div className="absolute top-6 right-6 z-20">
                <Button variant="outline" size="sm" className="bg-white/10 backdrop-blur-sm hover:bg-white/20 border-white/20 text-white">
                  <Edit className="h-4 w-4 mr-2" />
                  Düzenle
                </Button>
              </div>
            </div>
            
            <div className="p-6 sm:p-8 flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-1/3 lg:w-1/4">
                <div 
                  className={cn(
                    "relative aspect-square overflow-hidden rounded-xl border border-pawcare-100 -mt-20 sm:-mt-28 md:-mt-16 bg-white shadow-md",
                    "image-transition",
                    imageLoaded ? "image-transition-loaded" : "image-transition-loading"
                  )}
                >
                  <img 
                    src={pet.imageUrl} 
                    alt={pet.name}
                    className="w-full h-full object-cover"
                    onLoad={() => setImageLoaded(true)}
                  />
                </div>
              </div>
              
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-1">
                    <Info className="h-4 w-4" />
                    Genel Bilgiler
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <PawPrint className="h-4 w-4 text-pawcare-600" />
                      <span className="text-sm text-muted-foreground">Tür:</span>
                      <span className="text-sm font-medium">{pet.species}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <PawPrint className="h-4 w-4 text-pawcare-600" />
                      <span className="text-sm text-muted-foreground">Irk:</span>
                      <span className="text-sm font-medium">{pet.breed}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Cake className="h-4 w-4 text-pawcare-600" />
                      <span className="text-sm text-muted-foreground">Doğum Tarihi:</span>
                      <span className="text-sm font-medium">{pet.birthDate}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <PawPrint className="h-4 w-4 text-pawcare-600" />
                      <span className="text-sm text-muted-foreground">Cinsiyet:</span>
                      <span className="text-sm font-medium">{pet.gender}</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-1">
                    <PawPrint className="h-4 w-4" />
                    Fiziksel Özellikler
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Weight className="h-4 w-4 text-pawcare-600" />
                      <span className="text-sm text-muted-foreground">Ağırlık:</span>
                      <span className="text-sm font-medium">{pet.weight}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Ruler className="h-4 w-4 text-pawcare-600" />
                      <span className="text-sm text-muted-foreground">Boy:</span>
                      <span className="text-sm font-medium">{pet.height}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <PawPrint className="h-4 w-4 text-pawcare-600" />
                      <span className="text-sm text-muted-foreground">Renk:</span>
                      <span className="text-sm font-medium">{pet.color}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <PawPrint className="h-4 w-4 text-pawcare-600" />
                      <span className="text-sm text-muted-foreground">Microchip:</span>
                      <span className="text-sm font-medium">{pet.microchip}</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-1">
                    <Heart className="h-4 w-4" />
                    Sağlık Durumu
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-pawcare-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">Genel Sağlık</span>
                        <span className={cn(
                          "px-2 py-0.5 text-xs rounded-full",
                          statusColors[pet.healthStatus]
                        )}>
                          {statusText[pet.healthStatus]}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Son kontrol: 15 Mayıs 2023
                      </p>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1 flex items-center justify-center gap-1.5">
                        <Syringe className="h-4 w-4" />
                        <span>Aşılar</span>
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 flex items-center justify-center gap-1.5">
                        <FilePlus className="h-4 w-4" />
                        <span>Kayıtlar</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Tabs for Pet Health Data */}
          <Tabs defaultValue="timeline" className="w-full">
            <TabsList className="bg-white border border-pawcare-100 mb-6">
              <TabsTrigger value="timeline" className="data-[state=active]:bg-pawcare-600 data-[state=active]:text-white">
                <Calendar className="h-4 w-4 mr-2" />
                Zaman Çizelgesi
              </TabsTrigger>
              <TabsTrigger value="appointments" className="data-[state=active]:bg-pawcare-600 data-[state=active]:text-white">
                <Calendar className="h-4 w-4 mr-2" />
                Randevular
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="timeline" className="mt-0">
              <div className="bg-white rounded-xl shadow-sm border border-pawcare-100/50 p-6">
                <HealthTimeline events={petEvents} />
              </div>
            </TabsContent>
            
            <TabsContent value="appointments" className="mt-0">
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-4">Yaklaşan Randevular</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {petAppointments.filter(a => a.status === "upcoming").map(appointment => (
                      <AppointmentCard key={appointment.id} {...appointment} />
                    ))}
                    
                    {petAppointments.filter(a => a.status === "upcoming").length === 0 && (
                      <div className="col-span-full bg-white rounded-xl shadow-sm border border-pawcare-100/50 p-8 text-center">
                        <div className="mx-auto w-12 h-12 rounded-full bg-pawcare-50 flex items-center justify-center mb-3">
                          <Calendar className="h-6 w-6 text-pawcare-400" />
                        </div>
                        <h3 className="text-lg font-medium mb-2">Yaklaşan Randevu Bulunamadı</h3>
                        <p className="text-muted-foreground mb-4">
                          {pet.name} için yeni bir randevu oluşturun.
                        </p>
                        <Button>
                          <Plus className="h-4 w-4 mr-2" />
                          Randevu Oluştur
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold mb-4">Geçmiş Randevular</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {petAppointments.filter(a => a.status === "completed").map(appointment => (
                      <AppointmentCard key={appointment.id} {...appointment} />
                    ))}
                    
                    {petAppointments.filter(a => a.status === "completed").length === 0 && (
                      <div className="col-span-full bg-white rounded-xl shadow-sm border border-pawcare-100/50 p-8 text-center">
                        <div className="mx-auto w-12 h-12 rounded-full bg-pawcare-50 flex items-center justify-center mb-3">
                          <Calendar className="h-6 w-6 text-pawcare-400" />
                        </div>
                        <h3 className="text-lg font-medium">Geçmiş Randevu Bulunamadı</h3>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PetProfile;
