
import { useState, useRef, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PawPrint, Heart, Calendar, Bell, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const GetStarted = () => {
  const tabsRef = useRef<HTMLDivElement>(null);
  
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
    
    if (tabsRef.current) {
      observer.observe(tabsRef.current);
    }
    
    return () => {
      if (tabsRef.current) {
        observer.unobserve(tabsRef.current);
      }
    };
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <section className="py-16 md:py-24">
          <div className="container max-w-5xl">
            <div className="text-center mb-16">
              <div data-animate className="opacity-0 translate-y-4 inline-flex items-center rounded-full px-4 py-1.5 mb-6 bg-pawcare-100 text-pawcare-800 text-sm font-medium">
                PawCare ile başlayın
              </div>
              <h1 data-animate className="opacity-0 translate-y-4 text-4xl font-bold mb-6">
                Evcil Hayvanlarınızın Sağlığını <span className="text-transparent bg-clip-text bg-gradient-to-r from-pawcare-600 to-pawcare-400">Takip Etmeye Başlayın</span>
              </h1>
              <p data-animate className="opacity-0 translate-y-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Sadece birkaç basit adımla PawCare'i kullanmaya başlayabilirsiniz. Aşağıdaki adımları takip edin ve hemen hayvanlarınızın sağlığını takip etmeye başlayın.
              </p>
            </div>
            
            <div ref={tabsRef} className="opacity-0 translate-y-4" data-animate>
              <Tabs defaultValue="register" className="w-full">
                <TabsList className="grid w-full grid-cols-4 mb-12">
                  <TabsTrigger value="register" className="data-[state=active]:bg-pawcare-50 data-[state=active]:text-pawcare-800 py-3">
                    <span className="flex flex-col items-center gap-2">
                      <div className="bg-pawcare-100 text-pawcare-600 rounded-full w-8 h-8 flex items-center justify-center">1</div>
                      <span className="hidden sm:inline">Kayıt Olun</span>
                    </span>
                  </TabsTrigger>
                  <TabsTrigger value="profile" className="data-[state=active]:bg-pawcare-50 data-[state=active]:text-pawcare-800 py-3">
                    <span className="flex flex-col items-center gap-2">
                      <div className="bg-pawcare-100 text-pawcare-600 rounded-full w-8 h-8 flex items-center justify-center">2</div>
                      <span className="hidden sm:inline">Profil Oluşturun</span>
                    </span>
                  </TabsTrigger>
                  <TabsTrigger value="pets" className="data-[state=active]:bg-pawcare-50 data-[state=active]:text-pawcare-800 py-3">
                    <span className="flex flex-col items-center gap-2">
                      <div className="bg-pawcare-100 text-pawcare-600 rounded-full w-8 h-8 flex items-center justify-center">3</div>
                      <span className="hidden sm:inline">Evcil Hayvanları Ekleyin</span>
                    </span>
                  </TabsTrigger>
                  <TabsTrigger value="enjoy" className="data-[state=active]:bg-pawcare-50 data-[state=active]:text-pawcare-800 py-3">
                    <span className="flex flex-col items-center gap-2">
                      <div className="bg-pawcare-100 text-pawcare-600 rounded-full w-8 h-8 flex items-center justify-center">4</div>
                      <span className="hidden sm:inline">Kullanmaya Başlayın</span>
                    </span>
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="register" className="p-6 bg-white rounded-lg border border-pawcare-100/50 shadow-sm">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                      <div className="mb-4 inline-flex p-3 rounded-full bg-pawcare-100">
                        <PawPrint className="h-8 w-8 text-pawcare-600" />
                      </div>
                      <h3 className="text-2xl font-semibold mb-4">Hesap Oluşturun</h3>
                      <p className="text-muted-foreground mb-6">
                        PawCare'e kayıt olmak hızlı ve kolaydır. E-posta adresiniz ve şifrenizle hemen kayıt olabilirsiniz.
                      </p>
                      <ul className="space-y-3 mb-6">
                        <li className="flex items-start gap-3">
                          <div className="rounded-full bg-green-100 p-1 mt-0.5">
                            <svg className="h-4 w-4 text-green-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </div>
                          <span>Tamamen ücretsiz kayıt</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="rounded-full bg-green-100 p-1 mt-0.5">
                            <svg className="h-4 w-4 text-green-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </div>
                          <span>E-posta veya sosyal medya hesaplarınızla hızlı kayıt</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="rounded-full bg-green-100 p-1 mt-0.5">
                            <svg className="h-4 w-4 text-green-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </div>
                          <span>Güvenli ve özel bilgilerinizi koruyan sistem</span>
                        </li>
                      </ul>
                      <Button asChild className="w-full">
                        <Link to="/register">Hemen Kayıt Olun</Link>
                      </Button>
                    </div>
                    <div className="bg-pawcare-50 rounded-lg p-6 border border-pawcare-100/50 hidden md:block">
                      <img 
                        src="https://images.unsplash.com/photo-1587764379873-97837921fd44?w=800&auto=format&fit=crop&q=60" 
                        alt="Kayıt formu" 
                        className="rounded-lg shadow-md w-full"
                      />
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="profile" className="p-6 bg-white rounded-lg border border-pawcare-100/50 shadow-sm">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                      <div className="mb-4 inline-flex p-3 rounded-full bg-pawcare-100">
                        <Heart className="h-8 w-8 text-pawcare-600" />
                      </div>
                      <h3 className="text-2xl font-semibold mb-4">Kişisel Profilinizi Oluşturun</h3>
                      <p className="text-muted-foreground mb-6">
                        Kişisel bilgilerinizi ekleyin ve profilinizi tamamlayın. Bu, evcil hayvanlarınızla ilgili daha kişiselleştirilmiş öneriler almanıza yardımcı olacaktır.
                      </p>
                      <ul className="space-y-3 mb-6">
                        <li className="flex items-start gap-3">
                          <div className="rounded-full bg-green-100 p-1 mt-0.5">
                            <svg className="h-4 w-4 text-green-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </div>
                          <span>Basit ve kullanımı kolay profil düzenleme</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="rounded-full bg-green-100 p-1 mt-0.5">
                            <svg className="h-4 w-4 text-green-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </div>
                          <span>İhtiyaç duyulan temel bilgileri ekleme</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="rounded-full bg-green-100 p-1 mt-0.5">
                            <svg className="h-4 w-4 text-green-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </div>
                          <span>İstediğiniz zaman düzenleme ve güncelleme imkanı</span>
                        </li>
                      </ul>
                      <Button asChild variant="outline" className="w-full">
                        <Link to="/login">Profilinize Gidin</Link>
                      </Button>
                    </div>
                    <div className="bg-pawcare-50 rounded-lg p-6 border border-pawcare-100/50 hidden md:block">
                      <img 
                        src="https://images.unsplash.com/photo-1550534791-2677533605ab?w=800&auto=format&fit=crop&q=60" 
                        alt="Profil düzenleme" 
                        className="rounded-lg shadow-md w-full"
                      />
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="pets" className="p-6 bg-white rounded-lg border border-pawcare-100/50 shadow-sm">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                      <div className="mb-4 inline-flex p-3 rounded-full bg-pawcare-100">
                        <Calendar className="h-8 w-8 text-pawcare-600" />
                      </div>
                      <h3 className="text-2xl font-semibold mb-4">Evcil Hayvanlarınızı Ekleyin</h3>
                      <p className="text-muted-foreground mb-6">
                        Evcil hayvanlarınızın temel bilgilerini (yaş, cins, tür, vb.) ve geçmiş sağlık kayıtlarını sisteme ekleyin.
                      </p>
                      <ul className="space-y-3 mb-6">
                        <li className="flex items-start gap-3">
                          <div className="rounded-full bg-green-100 p-1 mt-0.5">
                            <svg className="h-4 w-4 text-green-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </div>
                          <span>Birden fazla evcil hayvan ekleme imkanı</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="rounded-full bg-green-100 p-1 mt-0.5">
                            <svg className="h-4 w-4 text-green-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </div>
                          <span>Geçmiş sağlık kayıtlarını kolayca içe aktarma</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="rounded-full bg-green-100 p-1 mt-0.5">
                            <svg className="h-4 w-4 text-green-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </div>
                          <span>Fotoğraf ekleme ve detaylı profil oluşturma</span>
                        </li>
                      </ul>
                      <Button asChild variant="outline" className="w-full">
                        <Link to="/dashboard">Evcil Hayvan Ekleyin</Link>
                      </Button>
                    </div>
                    <div className="bg-pawcare-50 rounded-lg p-6 border border-pawcare-100/50 hidden md:block">
                      <img 
                        src="https://images.unsplash.com/photo-1560743641-3914f2c45636?w=800&auto=format&fit=crop&q=60" 
                        alt="Evcil hayvan ekleme" 
                        className="rounded-lg shadow-md w-full"
                      />
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="enjoy" className="p-6 bg-white rounded-lg border border-pawcare-100/50 shadow-sm">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                      <div className="mb-4 inline-flex p-3 rounded-full bg-pawcare-100">
                        <Bell className="h-8 w-8 text-pawcare-600" />
                      </div>
                      <h3 className="text-2xl font-semibold mb-4">PawCare'i Keşfedin</h3>
                      <p className="text-muted-foreground mb-6">
                        Artık hazırsınız! Tüm özelliklerimizi keşfedin ve evcil hayvanlarınızın sağlığını takip etmeye başlayın.
                      </p>
                      <ul className="space-y-3 mb-6">
                        <li className="flex items-start gap-3">
                          <div className="rounded-full bg-green-100 p-1 mt-0.5">
                            <svg className="h-4 w-4 text-green-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </div>
                          <span>Otomatik hatırlatmalar sayesinde aşı takvimlerini takip edin</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="rounded-full bg-green-100 p-1 mt-0.5">
                            <svg className="h-4 w-4 text-green-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </div>
                          <span>Sağlık kayıtlarını ve gelişmeleri grafiklerle izleyin</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="rounded-full bg-green-100 p-1 mt-0.5">
                            <svg className="h-4 w-4 text-green-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </div>
                          <span>Veteriner randevularını kolayca planlayın</span>
                        </li>
                      </ul>
                      <Button asChild className="w-full">
                        <Link to="/dashboard">Kontrol Paneline Git</Link>
                      </Button>
                    </div>
                    <div className="bg-pawcare-50 rounded-lg p-6 border border-pawcare-100/50 hidden md:block">
                      <img 
                        src="https://images.unsplash.com/photo-1444212477490-ca407925329e?w=800&auto=format&fit=crop&q=60" 
                        alt="PawCare kullanımı" 
                        className="rounded-lg shadow-md w-full"
                      />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
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
                  <Link to="/faq">Daha Fazla Bilgi</Link>
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

export default GetStarted;
