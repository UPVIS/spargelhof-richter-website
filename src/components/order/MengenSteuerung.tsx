import { Minus, Plus } from 'lucide-react';

interface MengenSteuerungProps {
  value: number;
  onChange: (value: number) => void;
  einheit: string;
  min?: number;
}

export default function MengenSteuerung({ value, onChange, einheit, min = 0 }: MengenSteuerungProps) {
  const decrease = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const increase = () => {
    onChange(value + 1);
  };

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center bg-gray-100 rounded-full">
        <button
          type="button"
          onClick={decrease}
          disabled={value <= min}
          className={`
            w-10 h-10 rounded-full flex items-center justify-center transition-all
            ${value > min 
              ? 'text-[#1F2937] hover:bg-[#7B9E6B] hover:text-white' 
              : 'text-gray-300 cursor-not-allowed'
            }
          `}
        >
          <Minus className="w-4 h-4" />
        </button>
        
        <span className="w-12 text-center font-semibold text-lg text-[#1F2937] tabular-nums">
          {value}
        </span>
        
        <button
          type="button"
          onClick={increase}
          className="w-10 h-10 rounded-full flex items-center justify-center text-[#1F2937] hover:bg-[#7B9E6B] hover:text-white transition-all"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
      
      <span className="text-sm text-gray-500 min-w-[40px]">{einheit}</span>
    </div>
  );
}
