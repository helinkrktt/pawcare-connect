
import { PawPrint } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-pawcare-50/50 border-t border-pawcare-100/20 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div className="max-w-xs">
            <Link 
              to="/" 
              className="flex items-center gap-2 text-xl font-semibold text-foreground mb-4"
            >
              <PawPrint className="h-7 w-7 text-pawcare-600" />
              <span>PawCare</span>
            </Link>
            <p className="text-muted-foreground text-sm mb-4">
              Evcil hayvanlarınızın sağlık takibi için modern, güvenilir ve kullanımı kolay platform.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-medium mb-4">Platform</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Ana Sayfa
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Kontrol Paneli
                  </Link>
                </li>
                <li>
                  <Link to="/health" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Sağlık Kayıtları
                  </Link>
                </li>
                <li>
                  <Link to="/appointments" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Randevular
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Kaynaklar</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Evcil Hayvan Bakım Rehberi
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    SSS
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Destek
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">İletişim</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Hakkımızda
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    İletişim
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Gizlilik Politikası
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Kullanım Şartları
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-pawcare-100/20 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} PawCare. Tüm hakları saklıdır.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Gizlilik
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Şartlar
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Çerezler
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
