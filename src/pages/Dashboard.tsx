
import { useState } from 'react';
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PetCard } from "@/components/PetCard";
import { AppointmentCard } from "@/components/AppointmentCard";
import { Button } from "@/components/ui/button";
import { PawPrint, Calendar, Bell, Plus } from 'lucide-react';
import { cn } from "@/lib/utils";

const samplePets = [
  {
    id: "1",
    name: "Luna",
    species: "Kedi",
    breed: "British Shorthair",
    age: "3 yaş",
    imageUrl: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
    upcomingVaccines: 1,
    healthStatus: "healthy"
  },
  {
    id: "2", 
    name: "Max",
    species: "Köpek",
    breed: "Golden Retriever",
    age: "2 yaş",
    imageUrl: "https://images.unsplash.com/photo-1552053831-71594a27632d",
    upcomingVaccines: 2,
    healthStatus: "attention"
  },
  {
    id: "3",
    name: "Oliver",
    species: "Kedi",
    breed: "Scottish Fold",
    age: "1 yaş",
    imageUrl: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1",
    upcomingVaccines: 0,
    healthStatus: "healthy"
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
    title: "Diş Bakımı",
    date: "22 Mayıs 2023",
    time: "10:15",
    location: "PetDent Veteriner Kliniği",
    petName: "Max",
    vetName: "Dr. Mehmet Yılmaz",
    status: "upcoming"
  },
  {
    id: "3",
    title: "Kulak Enfeksiyonu Kontrolü",
    date: "5 Nisan 2023",
    time: "16:45",
    location: "Merkez Veteriner Kliniği",
    petName: "Oliver",
    vetName: "Dr. Ayşe Demir",
    status: "completed"
  }
] as const;

const sampleNotifications = [
  {
    id: "1",
    title: "Aşı Hatırlatması",
    message: "Luna'nın kuduz aşısı için 3 gün kaldı.",
    date: "2 saat önce",
    read: false
  },
  {
    id: "2",
    title: "Randevu Hatırlatması",
    message: "Max'in diş bakımı randevusu yarın saat 10:15'te.",
    date: "5 saat önce",
    read: false
  },
  {
    id: "3",
    title: "Parazitten Korunma Zamanı",
    message: "Evcil hayvanlarınızın dış parazit koruma zamanı geldi.",
    date: "2 gün önce",
    read: true
  }
] as const;

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  
  return (
    <div className="min-h-screen bg-pawcare-50/30">
      <Navbar />
      
      <main className="pt-20 pb-16">
        <div className="container px-4 py-6">
          <h1 className="text-3xl font-semibold mb-6">Kontrol Paneli</h1>
          
          {/* Dashboard Tabs */}
          <div className="flex overflow-x-auto mb-8 pb-1">
            <button
              onClick={() => setActiveTab("overview")}
              className={cn(
                "px-4 py-2 mr-2 text-sm rounded-lg whitespace-nowrap transition-colors",
                activeTab === "overview" 
                  ? "bg-pawcare-100 text-pawcare-800" 
                  : "bg-transparent text-muted-foreground hover:bg-pawcare-50 hover:text-pawcare-700"
              )}
            >
              Genel Bakış
            </button>
            <button
              onClick={() => setActiveTab("pets")}
              className={cn(
                "px-4 py-2 mr-2 text-sm rounded-lg whitespace-nowrap transition-colors",
                activeTab === "pets" 
                  ? "bg-pawcare-100 text-pawcare-800" 
                  : "bg-transparent text-muted-foreground hover:bg-pawcare-50 hover:text-pawcare-700"
              )}
            >
              Evcil Hayvanlarım
            </button>
            <button
              onClick={() => setActiveTab("appointments")}
              className={cn(
                "px-4 py-2 mr-2 text-sm rounded-lg whitespace-nowrap transition-colors",
                activeTab === "appointments" 
                  ? "bg-pawcare-100 text-pawcare-800" 
                  : "bg-transparent text-muted-foreground hover:bg-pawcare-50 hover:text-pawcare-700"
              )}
            >
              Randevular
            </button>
            <button
              onClick={() => setActiveTab("notifications")}
              className={cn(
                "px-4 py-2 mr-2 text-sm rounded-lg whitespace-nowrap transition-colors",
                activeTab === "notifications" 
                  ? "bg-pawcare-100 text-pawcare-800" 
                  : "bg-transparent text-muted-foreground hover:bg-pawcare-50 hover:text-pawcare-700"
              )}
            >
              Bildirimler
            </button>
          </div>
          
          {/* Overview Tab Content */}
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {/* Pets Summary */}
                <div className="bg-white rounded-xl shadow-sm border border-pawcare-100/50 overflow-hidden">
                  <div className="px-6 py-4 border-b border-pawcare-100/50 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <PawPrint className="h-5 w-5 text-pawcare-600" />
                      <h2 className="font-medium">Evcil Hayvanlarım</h2>
                    </div>
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <Plus className="h-4 w-4" />
                      <span>Evcil Hayvan Ekle</span>
                    </Button>
                  </div>
                  <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {samplePets.map(pet => (
                      <PetCard key={pet.id} {...pet} />
                    ))}
                  </div>
                </div>
                
                {/* Appointments */}
                <div className="bg-white rounded-xl shadow-sm border border-pawcare-100/50 overflow-hidden">
                  <div className="px-6 py-4 border-b border-pawcare-100/50 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-pawcare-600" />
                      <h2 className="font-medium">Yaklaşan Randevular</h2>
                    </div>
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <Plus className="h-4 w-4" />
                      <span>Randevu Oluştur</span>
                    </Button>
                  </div>
                  <div className="p-6 space-y-4">
                    {sampleAppointments.filter(a => a.status === "upcoming").map(appointment => (
                      <AppointmentCard key={appointment.id} {...appointment} />
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Right Column */}
              <div className="space-y-6">
                {/* Quick Actions */}
                <div className="bg-white rounded-xl shadow-sm border border-pawcare-100/50 overflow-hidden">
                  <div className="px-6 py-4 border-b border-pawcare-100/50">
                    <h2 className="font-medium">Hızlı İşlemler</h2>
                  </div>
                  <div className="p-6 space-y-3">
                    <Button variant="outline" className="w-full justify-start text-left">
                      <PawPrint className="h-4 w-4 mr-2" />
                      Yeni Evcil Hayvan Ekle
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-left">
                      <Calendar className="h-4 w-4 mr-2" />
                      Randevu Oluştur
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-left">
                      <Bell className="h-4 w-4 mr-2" />
                      Hatırlatıcı Oluştur
                    </Button>
                  </div>
                </div>
                
                {/* Notifications */}
                <div className="bg-white rounded-xl shadow-sm border border-pawcare-100/50 overflow-hidden">
                  <div className="px-6 py-4 border-b border-pawcare-100/50 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Bell className="h-5 w-5 text-pawcare-600" />
                      <h2 className="font-medium">Bildirimler</h2>
                    </div>
                    <Button variant="link" size="sm" className="text-pawcare-600 h-auto p-0">
                      Tümünü Gör
                    </Button>
                  </div>
                  <div className="divide-y divide-pawcare-100/50">
                    {sampleNotifications.map(notification => (
                      <div key={notification.id} className={cn(
                        "p-4 hover:bg-pawcare-50/50 transition-colors",
                        !notification.read && "bg-pawcare-50/30"
                      )}>
                        <div className="flex items-start justify-between">
                          <h3 className={cn(
                            "text-sm font-medium",
                            !notification.read && "text-pawcare-800"
                          )}>
                            {notification.title}
                          </h3>
                          <span className="text-xs text-muted-foreground">{notification.date}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Pets Tab Content */}
          {activeTab === "pets" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Evcil Hayvanlarım</h2>
                <Button className="flex items-center gap-1">
                  <Plus className="h-4 w-4" />
                  <span>Evcil Hayvan Ekle</span>
                </Button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {samplePets.map(pet => (
                  <PetCard key={pet.id} {...pet} />
                ))}
                
                <div 
                  className={cn(
                    "relative overflow-hidden rounded-2xl border-2 border-dashed border-pawcare-200 aspect-square",
                    "flex flex-col items-center justify-center p-6 text-center",
                    "bg-pawcare-50/50 transition-colors hover:bg-pawcare-100/50 cursor-pointer"
                  )}
                >
                  <div className="w-16 h-16 rounded-full bg-pawcare-100 flex items-center justify-center mb-4">
                    <Plus className="h-8 w-8 text-pawcare-600" />
                  </div>
                  <h3 className="text-lg font-medium text-pawcare-900 mb-2">Yeni Evcil Hayvan</h3>
                  <p className="text-sm text-muted-foreground">
                    Yeni bir evcil hayvan ekleyin ve sağlık bilgilerini takip etmeye başlayın
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {/* Appointments Tab Content */}
          {activeTab === "appointments" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Randevular</h2>
                <Button className="flex items-center gap-1">
                  <Plus className="h-4 w-4" />
                  <span>Randevu Oluştur</span>
                </Button>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Yaklaşan Randevular</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {sampleAppointments.filter(a => a.status === "upcoming").map(appointment => (
                    <AppointmentCard key={appointment.id} {...appointment} />
                  ))}
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Geçmiş Randevular</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {sampleAppointments.filter(a => a.status === "completed").map(appointment => (
                    <AppointmentCard key={appointment.id} {...appointment} />
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {/* Notifications Tab Content */}
          {activeTab === "notifications" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Bildirimler</h2>
                <Button variant="outline" size="sm">
                  Tümünü Okundu İşaretle
                </Button>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-pawcare-100/50 overflow-hidden">
                <div className="divide-y divide-pawcare-100/50">
                  {sampleNotifications.map(notification => (
                    <div key={notification.id} className={cn(
                      "p-6 hover:bg-pawcare-50/50 transition-colors",
                      !notification.read && "bg-pawcare-50/30"
                    )}>
                      <div className="flex items-start justify-between mb-2">
                        <h3 className={cn(
                          "text-base font-medium",
                          !notification.read && "text-pawcare-800"
                        )}>
                          {notification.title}
                        </h3>
                        <span className="text-sm text-muted-foreground">{notification.date}</span>
                      </div>
                      <p className="text-muted-foreground">{notification.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
