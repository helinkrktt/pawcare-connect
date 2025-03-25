
import { useState } from 'react';
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HealthTimeline } from "@/components/HealthTimeline";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PawPrint, Heart, Syringe, Calendar, Plus, FilePlus } from 'lucide-react';

const samplePets = [
  {
    id: "1",
    name: "Luna",
    species: "Kedi",
    imageUrl: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
  },
  {
    id: "2", 
    name: "Max",
    species: "Köpek",
    imageUrl: "https://images.unsplash.com/photo-1552053831-71594a27632d",
  },
  {
    id: "3",
    name: "Oliver",
    species: "Kedi",
    imageUrl: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1",
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

const sampleVaccines = [
  {
    id: "1",
    name: "Kuduz Aşısı",
    lastDate: "10 Temmuz 2022",
    nextDate: "10 Temmuz 2023",
    petName: "Luna",
    status: "upcoming"
  },
  {
    id: "2",
    name: "Karma Aşı",
    lastDate: "12 Haziran 2023",
    nextDate: "12 Haziran 2024",
    petName: "Luna",
    status: "completed"
  },
  {
    id: "3",
    name: "Leptospiroz Aşısı",
    lastDate: "15 Mart 2023",
    nextDate: "15 Mart 2024",
    petName: "Max",
    status: "completed"
  },
  {
    id: "4",
    name: "Karma Aşı",
    lastDate: "20 Nisan 2023",
    nextDate: "20 Nisan 2024",
    petName: "Max",
    status: "completed"
  },
  {
    id: "5",
    name: "İç Parazit İlacı",
    lastDate: "1 Haziran 2023",
    nextDate: "1 Eylül 2023",
    petName: "Oliver",
    status: "upcoming"
  }
] as const;

const sampleMedicalRecords = [
  {
    id: "1",
    title: "Yıllık Sağlık Kontrolü",
    date: "15 Mayıs 2023",
    description: "Genel sağlık durumu iyi. Kan testleri normal sınırlar içinde.",
    petName: "Luna",
    veterinarian: "Dr. Ayşe Demir",
    medicalCenter: "Merkez Veteriner Kliniği"
  },
  {
    id: "2",
    title: "Diş Bakımı ve Temizliği",
    date: "10 Nisan 2023",
    description: "Diş taşları temizlendi, genel diş sağlığı iyi.",
    petName: "Max",
    veterinarian: "Dr. Mehmet Yılmaz",
    medicalCenter: "PetDent Veteriner Kliniği"
  },
  {
    id: "3",
    title: "Kulak Enfeksiyonu Tedavisi",
    date: "5 Nisan 2023",
    description: "Sağ kulakta enfeksiyon teşhisi. 7 gün antibiyotik tedavisi reçete edildi.",
    petName: "Oliver",
    veterinarian: "Dr. Ayşe Demir",
    medicalCenter: "Merkez Veteriner Kliniği"
  }
] as const;

const Health = () => {
  const [selectedPet, setSelectedPet] = useState<string>("all");

  const filteredEvents = selectedPet === "all" 
    ? sampleTimelineEvents 
    : sampleTimelineEvents;
  
  const filteredVaccines = selectedPet === "all"
    ? sampleVaccines
    : sampleVaccines.filter(vaccine => {
        const pet = samplePets.find(p => p.name === vaccine.petName);
        return pet && pet.id === selectedPet;
      });
  
  const filteredRecords = selectedPet === "all"
    ? sampleMedicalRecords
    : sampleMedicalRecords.filter(record => {
        const pet = samplePets.find(p => p.name === record.petName);
        return pet && pet.id === selectedPet;
      });
  
  return (
    <div className="min-h-screen bg-pawcare-50/30">
      <Navbar />
      
      <main className="pt-20 pb-16">
        <div className="container px-4 py-6">
          <h1 className="text-3xl font-semibold mb-6">Sağlık Kayıtları</h1>
          
          {/* Pet Selection */}
          <div className="mb-8">
            <h2 className="text-base font-medium mb-3">Evcil Hayvan Seçin</h2>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedPet("all")}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm transition-colors",
                  selectedPet === "all"
                    ? "bg-pawcare-600 text-white"
                    : "bg-white border border-pawcare-200 text-muted-foreground hover:border-pawcare-300 hover:text-foreground"
                )}
              >
                Tümü
              </button>
              
              {samplePets.map(pet => (
                <button
                  key={pet.id}
                  onClick={() => setSelectedPet(pet.id)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors",
                    selectedPet === pet.id
                      ? "bg-pawcare-600 text-white"
                      : "bg-white border border-pawcare-200 text-muted-foreground hover:border-pawcare-300 hover:text-foreground"
                  )}
                >
                  <div className="w-6 h-6 rounded-full overflow-hidden bg-pawcare-100">
                    <img src={pet.imageUrl} alt={pet.name} className="w-full h-full object-cover" />
                  </div>
                  <span>{pet.name}</span>
                </button>
              ))}
            </div>
          </div>
          
          {/* Main Content */}
          <Tabs defaultValue="timeline" className="w-full">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <TabsList className="bg-white border border-pawcare-100">
                <TabsTrigger value="timeline" className="data-[state=active]:bg-pawcare-600 data-[state=active]:text-white">
                  <Calendar className="h-4 w-4 mr-2" />
                  Zaman Çizelgesi
                </TabsTrigger>
                <TabsTrigger value="vaccines" className="data-[state=active]:bg-pawcare-600 data-[state=active]:text-white">
                  <Syringe className="h-4 w-4 mr-2" />
                  Aşılar
                </TabsTrigger>
                <TabsTrigger value="records" className="data-[state=active]:bg-pawcare-600 data-[state=active]:text-white">
                  <Heart className="h-4 w-4 mr-2" />
                  Sağlık Kayıtları
                </TabsTrigger>
              </TabsList>
              
              <div className="flex items-center gap-2">
                <Button variant="outline" className="flex items-center gap-1">
                  <Plus className="h-4 w-4" />
                  <span>Yeni Aşı</span>
                </Button>
                <Button className="flex items-center gap-1">
                  <FilePlus className="h-4 w-4" />
                  <span>Kayıt Ekle</span>
                </Button>
              </div>
            </div>
            
            <TabsContent value="timeline" className="mt-0">
              <div className="bg-white rounded-xl shadow-sm border border-pawcare-100/50 p-6">
                <HealthTimeline events={filteredEvents} />
              </div>
            </TabsContent>
            
            <TabsContent value="vaccines" className="mt-0 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Upcoming Vaccines */}
                <div className="bg-white rounded-xl shadow-sm border border-pawcare-100/50 overflow-hidden">
                  <div className="px-6 py-4 border-b border-pawcare-100/50 flex items-center gap-2">
                    <Syringe className="h-5 w-5 text-pawcare-600" />
                    <h2 className="font-medium">Yaklaşan Aşılar</h2>
                  </div>
                  <div className="divide-y divide-pawcare-100/50">
                    {filteredVaccines.filter(v => v.status === "upcoming").map(vaccine => (
                      <div key={vaccine.id} className="p-4 hover:bg-pawcare-50/50 transition-colors">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-medium">{vaccine.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {vaccine.petName} için • Son aşı: {vaccine.lastDate}
                            </p>
                          </div>
                          <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-pawcare-100 text-pawcare-800">
                            {vaccine.nextDate}
                          </span>
                        </div>
                      </div>
                    ))}
                    
                    {filteredVaccines.filter(v => v.status === "upcoming").length === 0 && (
                      <div className="p-8 text-center text-muted-foreground">
                        <div className="mx-auto w-12 h-12 rounded-full bg-pawcare-50 flex items-center justify-center mb-3">
                          <Syringe className="h-6 w-6 text-pawcare-400" />
                        </div>
                        <p>Yaklaşan aşı bulunmuyor</p>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Completed Vaccines */}
                <div className="bg-white rounded-xl shadow-sm border border-pawcare-100/50 overflow-hidden">
                  <div className="px-6 py-4 border-b border-pawcare-100/50 flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-pawcare-600" />
                    <h2 className="font-medium">Tamamlanan Aşılar</h2>
                  </div>
                  <div className="divide-y divide-pawcare-100/50">
                    {filteredVaccines.filter(v => v.status === "completed").map(vaccine => (
                      <div key={vaccine.id} className="p-4 hover:bg-pawcare-50/50 transition-colors">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-medium">{vaccine.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {vaccine.petName} için • Sonraki aşı: {vaccine.nextDate}
                            </p>
                          </div>
                          <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-green-100 text-green-800">
                            {vaccine.lastDate}
                          </span>
                        </div>
                      </div>
                    ))}
                    
                    {filteredVaccines.filter(v => v.status === "completed").length === 0 && (
                      <div className="p-8 text-center text-muted-foreground">
                        <div className="mx-auto w-12 h-12 rounded-full bg-pawcare-50 flex items-center justify-center mb-3">
                          <Calendar className="h-6 w-6 text-pawcare-400" />
                        </div>
                        <p>Tamamlanan aşı bulunmuyor</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="records" className="mt-0">
              <div className="bg-white rounded-xl shadow-sm border border-pawcare-100/50 overflow-hidden">
                <div className="px-6 py-4 border-b border-pawcare-100/50 flex items-center gap-2">
                  <Heart className="h-5 w-5 text-pawcare-600" />
                  <h2 className="font-medium">Sağlık Kayıtları</h2>
                </div>
                <div className="divide-y divide-pawcare-100/50">
                  {filteredRecords.map(record => (
                    <div key={record.id} className="p-6 hover:bg-pawcare-50/50 transition-colors">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
                        <div>
                          <h3 className="font-medium text-lg">{record.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {record.petName} için • {record.medicalCenter} • {record.veterinarian}
                          </p>
                        </div>
                        <span className="px-3 py-1 text-xs font-medium rounded-full bg-pawcare-100 text-pawcare-800 whitespace-nowrap">
                          {record.date}
                        </span>
                      </div>
                      <p className="text-muted-foreground">{record.description}</p>
                    </div>
                  ))}
                  
                  {filteredRecords.length === 0 && (
                    <div className="p-8 text-center text-muted-foreground">
                      <div className="mx-auto w-12 h-12 rounded-full bg-pawcare-50 flex items-center justify-center mb-3">
                        <Heart className="h-6 w-6 text-pawcare-400" />
                      </div>
                      <p>Sağlık kaydı bulunmuyor</p>
                    </div>
                  )}
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

export default Health;
