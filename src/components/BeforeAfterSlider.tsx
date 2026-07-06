import React, { useState, useRef, useEffect } from 'react';

// Map image codes to the generated local assets or online images
export const resolveImage = (img: string): string => {
  if (img === 'closet_hero') {
    return '/src/assets/images/organized_closet_hero_1783305649580.jpg';
  }
  if (img === 'pantry_shelves') {
    return '/src/assets/images/organized_pantry_shelves_1783305692550.jpg';
  }
  return img;
};

interface BeforeAfterSliderProps {
  key?: React.Key;
  beforeImage: string;
  afterImage: string;
  title: string;
  spaceType: string;
  description: string;
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  title,
  spaceType,
  description
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const beforeSrc = resolveImage(beforeImage);
  const afterSrc = resolveImage(afterImage);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div className="bg-[#F4F1EC] p-6 rounded-2xl border border-[#E6DED4] shadow-sm flex flex-col md:flex-row gap-6 items-center">
      {/* Interactive Slider Area */}
      <div 
        ref={containerRef}
        className="relative w-full md:w-3/5 aspect-4/3 rounded-xl overflow-hidden select-none cursor-ew-resize border border-[#E6DED4]"
        onMouseDown={() => setIsDragging(true)}
        onTouchStart={() => setIsDragging(true)}
      >
        {/* After Image (Full Background) */}
        <img 
          src={afterSrc} 
          alt="Organised space after edit" 
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          referrerPolicy="no-referrer"
        />
        <div className="absolute right-4 bottom-4 bg-[#2B2B2B]/60 text-white text-xs tracking-wider uppercase px-2 py-1 rounded backdrop-blur-xs font-sans">
          After
        </div>

        {/* Before Image (Left Overlay, clipped based on sliderPosition) */}
        <div 
          className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
          style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
        >
          <img 
            src={beforeSrc} 
            alt="Space before edit" 
            className="absolute inset-0 w-full h-full object-cover"
            referrerPolicy="no-referrer"
            style={{ width: containerRef.current?.getBoundingClientRect().width }}
          />
          <div className="absolute left-4 bottom-4 bg-[#2B2B2B]/60 text-white text-xs tracking-wider uppercase px-2 py-1 rounded backdrop-blur-xs font-sans">
            Before
          </div>
        </div>

        {/* Slider Handle Separator Line */}
        <div 
          className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg cursor-ew-resize flex items-center justify-center pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Elegant Circular Drag Handle */}
          <div className="w-10 h-10 rounded-full bg-white border-2 border-[#A89A8A] shadow-md flex items-center justify-center pointer-events-auto transform -translate-x-1/2">
            <svg 
              className="w-5 h-5 text-[#A89A8A] flex-shrink-0" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l-3 3 3 3m8-6l3 3-3 3" />
            </svg>
          </div>
        </div>
      </div>

      {/* Description Area */}
      <div className="w-full md:w-2/5 flex flex-col justify-center text-left">
        <span className="text-[#A89A8A] font-sans text-xs uppercase tracking-widest mb-1 font-medium">
          {spaceType}
        </span>
        <h3 className="font-serif text-2xl text-[#2B2B2B] mb-3 leading-snug">
          {title}
        </h3>
        <p className="font-body text-[#555] text-sm leading-relaxed mb-4">
          {description}
        </p>
        
        {/* Helper instruction */}
        <div className="flex items-center gap-2 text-xs font-sans text-[#A89A8A]/80 italic mt-auto bg-[#E6DED4]/40 p-3 rounded-lg border border-[#E6DED4]/50">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Drag the white circle handle left & right to see the transformation details.</span>
        </div>
      </div>
    </div>
  );
}
