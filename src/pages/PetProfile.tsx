
import { useState } from "react";
import { useParams } from "react-router-dom";
import { HealthTimeline } from "@/components/HealthTimeline";
import { AppointmentCard } from "@/components/AppointmentCard";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";

// Sample data
const samplePets = {
  "1": {
    id: "1",
    name: "Luna",
    species: "Kedi",
    breed: "British Shorthair",
    age: "3 yaş",
    weight: "4.2 kg",
    gender: "Dişi",
    imageUrl: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=2043&auto=format&fit=crop",
    color: "Gri",
    birthdate: "10 Mayıs 2020",
    microchipNumber: "985732164598732",
    sterilized: true,
    upcomingVaccines: 1,
    healthStatus: "healthy"
  },
  "2": {
    id: "2",
    name: "Max",
    species: "Köpek",
    breed: "Golden Retriever",
    age: "2 yaş",
    weight: "28.5 kg",
    gender: "Erkek",
    imageUrl: "https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=1924&auto=format&fit=crop",
    color: "Altın Sarısı",
    birthdate: "23 Haziran 2021",
    microchipNumber: "985732164598733",
    sterilized: false,
    upcomingVaccines: 2,
    healthStatus: "attention"
  }
};

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
    petId: "1",
    isNext: true
  },
  {
    id: "2",
    title: "Diş Temizliği",
    date: "22 Mayıs 2023",
    time: "10:15",
    location: "Merkez Veteriner Kliniği",
    petName: "Luna",
    vetName: "Dr. Mehmet Yılmaz",
    status: "upcoming",
    petId: "1",
    isNext: false
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

const PetProfile = () => {
  const { id } = useParams<{id: string}>();
  const [activeTab, setActiveTab] = useState("overview");
  
  // Get pet data based on the ID
  const pet = samplePets[id as keyof typeof samplePets];
  
  // Filter appointments for this pet
  const petAppointments = sampleAppointments.filter(appointment => appointment.petId === id);
  
  // Check if pet exists
  if (!pet) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Evcil Hayvan Bulunamadı</h1>
        <p>Üzgünüz, aradığınız evcil hayvan bulunamadı.</p>
      </div>
    );
  }
  
  // Helper function for health status badge
  const getHealthStatusBadge = () => {
    switch (pet.healthStatus) {
      case "healthy":
        return <Badge className="bg-green-500 hover:bg-green-600">Sağlıklı</Badge>;
      case "attention":
        return <Badge className="bg-amber-500 hover:bg-amber-600">Dikkat Gerekiyor</Badge>;
      case "critical":
        return <Badge className="bg-red-500 hover:bg-red-600">Kritik</Badge>;
      default:
        return <Badge>Bilinmiyor</Badge>;
    }
  };
  
  return (
    <div className="container mx-auto p-4">
      {/* Pet Info Header */}
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <div className="w-full md:w-1/3 lg:w-1/4">
          <div className="rounded-lg overflow-hidden border border-gray-200">
            <AspectRatio ratio={1/1}>
              <img
                src={pet.imageUrl}
                alt={pet.name}
                className="w-full h-full object-cover"
              />
            </AspectRatio>
          </div>
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl md:text-3xl font-bold">{pet.name}</h1>
            <Button>Düzenle</Button>
          </div>
          
          <div className="flex items-center gap-2 mb-4">
            {getHealthStatusBadge()}
            {pet.upcomingVaccines > 0 && (
              <Badge variant="outline" className="border-amber-500 text-amber-700">
                {pet.upcomingVaccines} Yaklaşan Aşı
              </Badge>
            )}
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-3 gap-x-6">
            <div>
              <p className="text-sm text-muted-foreground">Tür</p>
              <p className="font-medium">{pet.species}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Irk</p>
              <p className="font-medium">{pet.breed}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Yaş</p>
              <p className="font-medium">{pet.age}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Cinsiyet</p>
              <p className="font-medium">{pet.gender}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Ağırlık</p>
              <p className="font-medium">{pet.weight}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Renk</p>
              <p className="font-medium">{pet.color}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tab Navigation */}
      <Tabs defaultValue="overview" onValueChange={setActiveTab} className="mb-6">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="overview">Genel Bakış</TabsTrigger>
          <TabsTrigger value="health">Sağlık Kaydı</TabsTrigger>
          <TabsTrigger value="appointments">Randevular</TabsTrigger>
          <TabsTrigger value="documents">Belgeler</TabsTrigger>
        </TabsList>
      </Tabs>
      
      {/* Tab Content */}
      <div className="space-y-8">
        {activeTab === "overview" && (
          <>
            {/* More Details Section */}
            <Card>
              <CardHeader>
                <CardTitle>Detaylı Bilgiler</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-3 gap-x-6">
                <div>
                  <p className="text-sm text-muted-foreground">Doğum Tarihi</p>
                  <p className="font-medium">{pet.birthdate}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Mikroçip Numarası</p>
                  <p className="font-medium">{pet.microchipNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Kısırlaştırma</p>
                  <p className="font-medium">{pet.sterilized ? "Evet" : "Hayır"}</p>
                </div>
              </CardContent>
            </Card>
            
            {/* Next Appointment */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Yaklaşan Randevu</h2>
                <Button variant="outline" size="sm" className="gap-1">
                  <Plus className="w-4 h-4" />
                  <span>Randevu Ekle</span>
                </Button>
              </div>
              
              {petAppointments.filter(a => a.isNext).length > 0 ? (
                petAppointments
                  .filter(a => a.isNext)
                  .map(appointment => (
                    <AppointmentCard key={appointment.id} {...appointment} />
                  ))
              ) : (
                <p className="text-muted-foreground">Yaklaşan randevu bulunmamaktadır.</p>
              )}
            </div>
            
            {/* Health Timeline */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Sağlık Zaman Çizelgesi</h2>
                <Button variant="outline" size="sm">Tümünü Gör</Button>
              </div>
              
              <HealthTimeline events={sampleTimelineEvents as any} limit={3} />
            </div>
          </>
        )}
        
        {activeTab === "health" && (
          <>
            <HealthTimeline events={sampleTimelineEvents as any} />
            
            {/* Additional health records would go here */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Sağlık Kayıtları</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Laboratuvar Sonuçları</CardTitle>
                    <CardDescription>En son güncelleme: 15 Mayıs 2023</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Tüm değerler normal sınırlar içinde</p>
                    <Button variant="outline" size="sm" className="mt-4">Detayları Gör</Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Aşılar</CardTitle>
                    <CardDescription>En son güncelleme: 12 Haziran 2023</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      <span className="font-medium">2</span> aşı tamamlandı, 
                      <span className="font-medium"> 1</span> yaklaşan aşı
                    </p>
                    <Button variant="outline" size="sm" className="mt-4">Detayları Gör</Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </>
        )}
        
        {activeTab === "appointments" && (
          <>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Tüm Randevular</h2>
              <Button variant="outline" size="sm" className="gap-1">
                <Plus className="w-4 h-4" />
                <span>Randevu Ekle</span>
              </Button>
            </div>
            
            {petAppointments.length > 0 ? (
              <div className="space-y-4">
                {petAppointments.map(appointment => (
                  <AppointmentCard key={appointment.id} {...appointment} />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">Randevu bulunmamaktadır.</p>
            )}
          </>
        )}
        
        {activeTab === "documents" && (
          <>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Belgeler</h2>
              <Button variant="outline" size="sm" className="gap-1">
                <Plus className="w-4 h-4" />
                <span>Belge Ekle</span>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Aşı Kartı</CardTitle>
                  <CardDescription>Ekleme Tarihi: 12 Haziran 2023</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" size="sm">İndir</Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Mikroçip Belgesi</CardTitle>
                  <CardDescription>Ekleme Tarihi: 10 Mayıs 2020</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" size="sm">İndir</Button>
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PetProfile;
