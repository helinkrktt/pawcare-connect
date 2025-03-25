
import { Calendar, Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AppointmentCardProps {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  petName: string;
  vetName?: string;
  status?: 'upcoming' | 'completed' | 'cancelled';
  isNext?: boolean;
}

export function AppointmentCard({
  id,
  title,
  date,
  time,
  location,
  petName,
  vetName,
  status = 'upcoming',
  isNext = false
}: AppointmentCardProps) {
  const statusColors = {
    upcoming: 'bg-blue-50 border-blue-100 text-blue-700',
    completed: 'bg-green-50 border-green-100 text-green-700',
    cancelled: 'bg-gray-50 border-gray-100 text-gray-700'
  };
  
  const statusText = {
    upcoming: 'Yaklaşan',
    completed: 'Tamamlandı',
    cancelled: 'İptal Edildi'
  };
  
  return (
    <div 
      className={cn(
        "relative p-5 rounded-xl transition-all",
        "bg-white border",
        isNext 
          ? "shadow-lg border-pawcare-200" 
          : "hover:shadow-md hover:-translate-y-0.5 border-gray-100",
        status === 'cancelled' && "opacity-70"
      )}
    >
      {isNext && (
        <div className="absolute -top-2 left-5 px-3 py-1 bg-pawcare-600 text-white text-xs font-medium rounded-b-lg">
          Sıradaki Randevu
        </div>
      )}
      
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-medium text-lg">{title}</h3>
          <p className="text-sm text-muted-foreground">{petName} için {vetName && `• ${vetName}`}</p>
        </div>
        
        <span className={cn(
          "px-2.5 py-0.5 text-xs font-medium rounded-full",
          statusColors[status]
        )}>
          {statusText[status]}
        </span>
      </div>
      
      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="h-4 w-4 text-pawcare-500" />
          <span>{date}</span>
          <span className="mx-1">•</span>
          <Clock className="h-4 w-4 text-pawcare-500" />
          <span>{time}</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="h-4 w-4 text-pawcare-500" />
          <span>{location}</span>
        </div>
      </div>
      
      <div className="mt-5 flex gap-2">
        {status === 'upcoming' && (
          <>
            <Button variant="outline" size="sm" className="flex-1">
              Yeniden Planla
            </Button>
            <Button variant="default" size="sm" className="flex-1">
              Detaylar
            </Button>
          </>
        )}
        
        {status === 'completed' && (
          <Button variant="outline" size="sm" className="w-full">
            Detayları Görüntüle
          </Button>
        )}
        
        {status === 'cancelled' && (
          <Button variant="outline" size="sm" className="w-full">
            Yeni Randevu Oluştur
          </Button>
        )}
      </div>
    </div>
  );
}
