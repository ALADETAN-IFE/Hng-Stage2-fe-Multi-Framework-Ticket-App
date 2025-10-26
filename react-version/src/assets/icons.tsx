import React from 'react';
import { 
  HiTicket, 
  HiClock, 
  HiBolt,
  HiCheckCircle, 
  HiPlus, 
  HiPencil, 
  HiTrash, 
  HiXMark, 
  HiShieldCheck,
  HiClipboard,
  HiCheck,
  HiExclamationTriangle
} from 'react-icons/hi2';

// Icon components using react-icons
export const TicketIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <HiTicket className={className} />
);

export const ClockIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <HiClock className={className} />
);

export const LightningIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <HiBolt className={className} />
);

export const CheckIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <HiCheckCircle className={className} />
);

export const PlusIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <HiPlus className={className} />
);

export const EditIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <HiPencil className={className} />
);

export const DeleteIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <HiTrash className={className} />
);

export const CloseIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <HiXMark className={className} />
);

export const ShieldIcon: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => (
  <HiShieldCheck className={className} />
);

export const ClipboardIcon: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => (
  <HiClipboard className={className} />
);

export const CheckMarkIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <HiCheck className={className} />
);

export const ExclamationIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <HiExclamationTriangle className={className} />
);

// Custom WavyBackground component (keeping as SVG since it's decorative)
export const WavyBackground: React.FC = () => (
  <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-16">
    <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" fill="currentColor" className="text-purple-200"></path>
    <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" fill="currentColor" className="text-purple-300"></path>
    <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112,48.74,165.56,47.33,44.83-1.18,88.3-20.13,131.24-33.14,42.94-13,87.1-24.64,131.76-25.37,44.65-.73,89.15,9.15,133.4,24.1,44.25,14.93,88.5,35.81,132.8,56.8V0Z" fill="currentColor" className="text-purple-400"></path>
  </svg>
);