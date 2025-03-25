
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PawPrint, Heart, Syringe, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PetCardProps {
  id: string;
  name: string;
  species: string;
  breed?: string;
  age?: string;
  imageUrl?: string;
  upcomingVaccines?: number;
  healthStatus?: 'healthy' | 'attention' | 'critical';
}

export function PetCard({ 
  id, 
  name, 
  species, 
  breed = '', 
  age = '', 
  imageUrl = 'https://images.unsplash.com/photo-1582562124811-c09040d0a901',
  upcomingVaccines = 0,
  healthStatus = 'healthy'
}: PetCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

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
    <Link 
      to={`/pet/${id}`}
      className={cn(
        "block relative overflow-hidden rounded-2xl",
        "transition-all duration-300 group",
        "hover:shadow-xl hover:shadow-pawcare-100/20",
        "hover:-translate-y-1"
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10 opacity-50 transition-opacity group-hover:opacity-70" />
      
      <div 
        className={cn(
          "relative aspect-square overflow-hidden",
          "image-transition",
          imageLoaded ? "image-transition-loaded" : "image-transition-loading"
        )}
      >
        <img 
          src={imageUrl} 
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onLoad={() => setImageLoaded(true)}
        />
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
        <div className="flex items-center justify-between mb-2">
          <span className={cn(
            "px-2.5 py-0.5 rounded-full text-xs font-medium",
            statusColors[healthStatus]
          )}>
            {statusText[healthStatus]}
          </span>
          <div className="bg-white/20 backdrop-blur-md rounded-full p-1">
            <PawPrint className="h-4 w-4 text-white" />
          </div>
        </div>
        
        <h3 className="text-xl font-semibold text-white">{name}</h3>
        <p className="text-white/80 text-sm">{species}{breed ? ` • ${breed}` : ''}{age ? ` • ${age}` : ''}</p>
        
        <div className="mt-3 flex items-center gap-3">
          {upcomingVaccines > 0 && (
            <div className="flex items-center gap-1 text-xs bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded-full">
              <Syringe className="h-3 w-3" />
              <span>{upcomingVaccines}</span>
            </div>
          )}
          <div className="flex items-center gap-1 text-xs bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded-full">
            <Heart className="h-3 w-3" />
            <span>Sağlık</span>
          </div>
          <div className="flex items-center gap-1 text-xs bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded-full">
            <Calendar className="h-3 w-3" />
            <span>Takvim</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
