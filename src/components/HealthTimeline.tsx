
import { useEffect, useRef } from 'react';
import { Syringe, Calendar, Heart, PawPrint } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  type: 'vaccine' | 'checkup' | 'medicine' | 'other';
  isPast?: boolean;
}

interface HealthTimelineProps {
  events: TimelineEvent[];
}

export function HealthTimeline({ events }: HealthTimelineProps) {
  const timelineRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll('[data-timeline-item]');
            elements.forEach((el, i) => {
              setTimeout(() => {
                el.classList.add('animate-slide-in');
                el.classList.remove('opacity-0');
                el.classList.remove('-translate-x-4');
              }, i * 100);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (timelineRef.current) {
      observer.observe(timelineRef.current);
    }
    
    return () => {
      if (timelineRef.current) {
        observer.unobserve(timelineRef.current);
      }
    };
  }, []);
  
  const getIcon = (type: string) => {
    switch (type) {
      case 'vaccine':
        return <Syringe className="h-5 w-5" />;
      case 'checkup':
        return <Heart className="h-5 w-5" />;
      case 'medicine':
        return <PawPrint className="h-5 w-5" />;
      default:
        return <Calendar className="h-5 w-5" />;
    }
  };
  
  const getColor = (type: string) => {
    switch (type) {
      case 'vaccine':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'checkup':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'medicine':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };
  
  return (
    <div ref={timelineRef} className="relative">
      {/* Timeline line */}
      <div className="absolute left-4 top-5 bottom-5 w-0.5 bg-pawcare-100 rounded-full"></div>
      
      <div className="space-y-6">
        {events.map((event, index) => (
          <div 
            key={event.id}
            data-timeline-item
            className={cn(
              "relative pl-12 opacity-0 -translate-x-4",
              event.isPast ? 'opacity-60' : ''
            )}
          >
            {/* Timeline dot */}
            <div 
              className={cn(
                "absolute left-0 top-2 w-8 h-8 rounded-full border-2 flex items-center justify-center z-10",
                getColor(event.type)
              )}
            >
              {getIcon(event.type)}
            </div>
            
            {/* Content */}
            <div 
              className={cn(
                "relative bg-white p-4 rounded-xl border transition-all",
                "hover:shadow-md hover:-translate-y-0.5",
                event.isPast 
                  ? 'border-gray-100' 
                  : 'border-pawcare-100'
              )}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-medium">{event.title}</h4>
                  <p className="text-sm text-muted-foreground">{event.description}</p>
                </div>
                <span className={cn(
                  "px-2 py-1 text-xs rounded-full whitespace-nowrap",
                  "bg-pawcare-50 text-pawcare-700"
                )}>
                  {event.date}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
