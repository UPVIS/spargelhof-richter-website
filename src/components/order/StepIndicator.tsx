import { motion } from 'framer-motion';
import { Check, ShoppingCart, User } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: 1 | 2;
}

const steps = [
  { number: 1, label: 'Produktauswahl', icon: ShoppingCart },
  { number: 2, label: 'Kontaktdaten', icon: User },
];

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center mb-10">
      {steps.map((step, index) => {
        const Icon = step.icon;
        const isCompleted = currentStep > step.number;
        const isCurrent = currentStep === step.number;
        
        return (
          <div key={step.number} className="flex items-center">
            <div className="flex flex-col items-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`
                  w-14 h-14 rounded-full flex items-center justify-center
                  transition-all duration-300 shadow-md
                  ${isCompleted 
                    ? 'bg-[#7B9E6B] text-white' 
                    : isCurrent 
                      ? 'bg-[#7B9E6B] text-white shadow-lg ring-4 ring-[#7B9E6B]/20' 
                      : 'bg-gray-100 text-gray-400'
                  }
                `}
              >
                {isCompleted ? (
                  <Check className="w-6 h-6" />
                ) : (
                  <Icon className="w-6 h-6" />
                )}
              </motion.div>
              <span 
                className={`
                  mt-3 text-sm font-medium
                  ${isCurrent || isCompleted ? 'text-[#1F2937]' : 'text-gray-400'}
                `}
              >
                {step.label}
              </span>
            </div>
            
            {index < steps.length - 1 && (
              <div 
                className={`
                  w-20 sm:w-32 h-1 mx-4 rounded-full transition-colors duration-300
                  ${currentStep > step.number ? 'bg-[#7B9E6B]' : 'bg-gray-200'}
                `}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
