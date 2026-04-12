import { IconType } from "react-icons";

export interface WhyChooseItem {
  label: string;
  value: string;
  icon: IconType;
}

export interface adminNavProps {
  name: string;
  path?: string;
  icon: IconType;
  children?: adminNavProps[]
}

export interface courseCardProps {
  title: string;
  description: string;
  img: string;
}

// types/modal.ts
export interface ModalProps {
  isOpen: boolean;                     // controls visibility
  title?: string;                       // optional modal title
  children: React.ReactNode;            // modal content
  onClose: () => void;                  // function to close modal
  confirmText?: string;                 // optional confirm button text
  cancelText?: string;                  // optional cancel button text
  onConfirm?: () => void;               // confirm callback
  showCancelButton?: boolean;  
  widthClass?: string;         // toggle cancel button
}

export type FilterOptions = {
  search?: string;
  category?: string;
  level?: string;
};

export type Course = {
  id: string;
  title: string;
  briefDefinition: string;
  category: {
    id: string;
    name: string;
  };
  level: "beginner" | "intermediate" | "advanced";
};