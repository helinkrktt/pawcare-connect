import { useEffect, useState } from "react";
import { HealthTimeline } from "@/components/HealthTimeline";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Import any necessary libraries or components here

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

const Health = () => {
  const [activeTab, setActiveTab] = useState("timeline");

  // Component rendering
  return (
    <div className="container mx-auto p-4 md:p-6">
      <h1 className="text-2xl font-bold mb-6">Sağlık Durumu</h1>
      
      {/* Health Summary Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Toplam Evcil Hayvan</CardTitle>
            <CardDescription>Sisteminizde kayıtlı</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">3</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Yaklaşan Aşılar</CardTitle>
            <CardDescription>Gelecek 30 gün içinde</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">2</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Sağlık Durumu</CardTitle>
            <CardDescription>Genel bakış</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="size-3 rounded-full bg-green-500"></div>
              <p>2 Sağlıklı</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="size-3 rounded-full bg-amber-500"></div>
              <p>1 Dikkat Gerekiyor</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Main Content */}
      <Tabs defaultValue="timeline">
        <TabsList className="mb-6">
          <TabsTrigger value="timeline">Sağlık Zaman Çizelgesi</TabsTrigger>
          <TabsTrigger value="medications">İlaçlar</TabsTrigger>
          <TabsTrigger value="vaccines">Aşılar</TabsTrigger>
          <TabsTrigger value="allergies">Alerjiler</TabsTrigger>
        </TabsList>
        
        <TabsContent value="timeline" className="space-y-6">
          <HealthTimeline events={sampleTimelineEvents as any} />
        </TabsContent>
        
        <TabsContent value="medications">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Devam Eden İlaç Tedavileri</h2>
            
            <Card>
              <CardHeader>
                <CardTitle>Antibiyotik</CardTitle>
                <CardDescription>Max için, günde 2 kez, yemekten sonra</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Başlangıç: 28 Nisan 2023</p>
                    <p className="text-sm text-muted-foreground">Bitiş: 12 Mayıs 2023</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="size-3 rounded-full bg-amber-500"></div>
                      <p className="font-medium">3 gün kaldı</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Collapsible>
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Geçmiş İlaç Tedavileri</h2>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm">Göster</Button>
                </CollapsibleTrigger>
              </div>
              
              <CollapsibleContent className="mt-4 space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Göz Damlası</CardTitle>
                    <CardDescription>Luna için, günde 3 kez</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-muted-foreground">Başlangıç: 10 Mart 2023</p>
                        <p className="text-sm text-muted-foreground">Bitiş: 24 Mart 2023</p>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <div className="size-3 rounded-full bg-green-500"></div>
                          <p className="font-medium">Tamamlandı</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </TabsContent>
        
        <TabsContent value="vaccines">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Yaklaşan Aşılar</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Kuduz Aşısı</CardTitle>
                  <CardDescription>Luna için, yıllık</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <p className="text-muted-foreground">10 Temmuz 2023</p>
                    <Button size="sm">Randevu Al</Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Karma Aşı</CardTitle>
                  <CardDescription>Max için, yıllık</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <p className="text-muted-foreground">25 Temmuz 2023</p>
                    <Button size="sm">Randevu Al</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <h2 className="text-xl font-semibold mt-8">Tamamlanan Aşılar</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Karma Aşı</CardTitle>
                  <CardDescription>Luna için, yıllık</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <p className="text-muted-foreground">12 Haziran 2023</p>
                    <div className="flex items-center gap-2">
                      <div className="size-3 rounded-full bg-green-500"></div>
                      <p className="font-medium">Tamamlandı</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="allergies">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Bilinen Alerjiler</h2>
              <Button size="sm">Alerji Ekle</Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Tavuk Proteini</CardTitle>
                  <CardDescription>Max için</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">
                    Semptomlar: Kaşıntı, Kızarıklık, Kusma
                  </p>
                  <p className="text-sm font-medium">Şiddet: Orta</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Polen</CardTitle>
                  <CardDescription>Luna için</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">
                    Semptomlar: Hapşırma, Gözlerde Sulanma
                  </p>
                  <p className="text-sm font-medium">Şiddet: Hafif</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Health;
