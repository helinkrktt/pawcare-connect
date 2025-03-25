
import { useState } from 'react';
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AppointmentCard } from "@/components/AppointmentCard";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Plus, Search, Filter } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  },
  {
    id: "4",
    title: "Aşı Randevusu",
    date: "10 Mart 2023",
    time: "11:30",
    location: "PetHealth Veteriner Kliniği",
    petName: "Luna",
    vetName: "Dr. Emre Yıldız",
    status: "completed"
  },
  {
    id: "5",
    title: "Laboratuvar Testleri",
    date: "18 Şubat 2023",
    time: "09:00",
    location: "Merkez Veteriner Kliniği",
    petName: "Max",
    vetName: "Dr. Ayşe Demir",
    status: "completed"
  }
] as const;

const CalendarView = () => {
  // Simple week view calendar
  const days = ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"];
  const hours = Array.from({ length: 9 }, (_, i) => 9 + i); // 9am to 5pm
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-pawcare-100/50 overflow-hidden p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Bugün
          </Button>
          <div className="flex border border-pawcare-100 rounded-md overflow-hidden">
            <Button variant="ghost" size="sm" className="rounded-none">
              &lt;
            </Button>
            <Button variant="ghost" size="sm" className="rounded-none">
              &gt;
            </Button>
          </div>
        </div>
        <div className="font-medium">15 - 21 Mayıs 2023</div>
      </div>
      
      <div className="grid grid-cols-8 gap-2">
        {/* Time column */}
        <div className="col-span-1">
          <div className="h-12 flex items-center justify-end pr-2 font-medium text-sm text-muted-foreground">
            Saat
          </div>
          {hours.map(hour => (
            <div 
              key={hour} 
              className="h-20 flex items-center justify-end pr-2 font-medium text-sm text-muted-foreground border-t border-pawcare-100/50"
            >
              {hour}:00
            </div>
          ))}
        </div>
        
        {/* Days */}
        {days.map((day, i) => (
          <div key={day} className="col-span-1">
            <div 
              className={cn(
                "h-12 flex flex-col items-center justify-center font-medium",
                i === 0 && "bg-pawcare-100/50"
              )}
            >
              <div className="text-sm">{day}</div>
              <div className={cn(
                "text-lg",
                i === 0 && "text-pawcare-700"
              )}>
                {15 + i}
              </div>
            </div>
            
            {hours.map(hour => (
              <div 
                key={`${day}-${hour}`} 
                className={cn(
                  "h-20 border-t border-pawcare-100/50 relative",
                  i === 0 && hour === 14 && "bg-pawcare-50/50"
                )}
              >
                {i === 0 && hour === 14 && (
                  <div 
                    className={cn(
                      "absolute inset-1 bg-pawcare-100 rounded text-xs p-1",
                      "flex flex-col justify-between"
                    )}
                  >
                    <div className="font-medium">Sağlık Kontrolü</div>
                    <div className="text-xs text-pawcare-600">Luna • 14:30</div>
                  </div>
                )}
                
                {i === 1 && hour === 10 && (
                  <div 
                    className={cn(
                      "absolute inset-1 bg-pawcare-100 rounded text-xs p-1",
                      "flex flex-col justify-between"
                    )}
                  >
                    <div className="font-medium">Diş Bakımı</div>
                    <div className="text-xs text-pawcare-600">Max • 10:15</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const Appointments = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredUpcoming = sampleAppointments.filter(
    appointment => 
      appointment.status === "upcoming" && 
      (appointment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
       appointment.petName.toLowerCase().includes(searchQuery.toLowerCase()) ||
       appointment.vetName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
       appointment.location.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  const filteredCompleted = sampleAppointments.filter(
    appointment => 
      appointment.status === "completed" && 
      (appointment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
       appointment.petName.toLowerCase().includes(searchQuery.toLowerCase()) ||
       appointment.vetName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
       appointment.location.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  return (
    <div className="min-h-screen bg-pawcare-50/30">
      <Navbar />
      
      <main className="pt-20 pb-16">
        <div className="container px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <h1 className="text-3xl font-semibold">Randevular</h1>
            
            <Button className="flex items-center gap-1">
              <Plus className="h-4 w-4" />
              <span>Yeni Randevu</span>
            </Button>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Randevu ara..." 
                className="pl-9"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" className="flex items-center gap-1">
              <Filter className="h-4 w-4" />
              <span>Filtrele</span>
            </Button>
          </div>
          
          <Tabs defaultValue="list" className="w-full">
            <TabsList className="bg-white border border-pawcare-100 mb-6">
              <TabsTrigger value="list" className="data-[state=active]:bg-pawcare-600 data-[state=active]:text-white">
                Liste Görünümü
              </TabsTrigger>
              <TabsTrigger value="calendar" className="data-[state=active]:bg-pawcare-600 data-[state=active]:text-white">
                Takvim Görünümü
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="list" className="mt-0 space-y-8">
              {/* Upcoming Appointments */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Yaklaşan Randevular</h2>
                
                {filteredUpcoming.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredUpcoming.map(appointment => (
                      <AppointmentCard key={appointment.id} {...appointment} />
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-xl shadow-sm border border-pawcare-100/50 p-8 text-center">
                    <div className="mx-auto w-12 h-12 rounded-full bg-pawcare-50 flex items-center justify-center mb-3">
                      <Calendar className="h-6 w-6 text-pawcare-400" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">Yaklaşan Randevu Bulunamadı</h3>
                    <p className="text-muted-foreground mb-4">
                      Evcil hayvanınız için yeni bir randevu oluşturun.
                    </p>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Randevu Oluştur
                    </Button>
                  </div>
                )}
              </div>
              
              {/* Completed Appointments */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Geçmiş Randevular</h2>
                
                {filteredCompleted.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredCompleted.map(appointment => (
                      <AppointmentCard key={appointment.id} {...appointment} />
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-xl shadow-sm border border-pawcare-100/50 p-8 text-center">
                    <div className="mx-auto w-12 h-12 rounded-full bg-pawcare-50 flex items-center justify-center mb-3">
                      <Clock className="h-6 w-6 text-pawcare-400" />
                    </div>
                    <h3 className="text-lg font-medium">Geçmiş Randevu Bulunamadı</h3>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="calendar" className="mt-0">
              <CalendarView />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Appointments;
