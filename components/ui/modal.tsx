// components/ui/Modal.tsx
'use client'

import { ModalProps } from "@/utils/prop";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {MdOutlineClose} from "react-icons/md"


export default function Modal({
  isOpen,
  title,
  children,
  onClose,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  showCancelButton = false,
  widthClass = "w-100"
}: ModalProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-40  " onClose={onClose}>
        {/* Background overlay */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-30"
          leave="ease-in duration-200"
          leaveFrom="opacity-30"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/10 backdrop-blur-sm" />
        </Transition.Child>

        {/* Modal content */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className={`relative ${widthClass} transform overflow-y-auto rounded-2xl bg-white p-4 text-left align-middle shadow-xl transition-all max-h-[90vh]`}>
             
              {title && (
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 mb-4"
                >
                  {title}
                </Dialog.Title>
              )}
              
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white  bg-black size-10 rounded-full grid place-content-center cursor-pointer"
              >
                <MdOutlineClose size={20} />
              </button>

              <div className="mb-4">{children}</div>

              <div className="flex justify-end gap-2">
                {showCancelButton && (
                  <button
                    className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
                    onClick={onClose}
                  >
                    {cancelText}
                  </button>
                )}
                {onConfirm && (
                  <button
                    className="px-4 py-2 rounded-lg bg-myprimaryColor text-white hover:bg-myprimaryColor/90"
                    onClick={onConfirm}
                  >
                    {confirmText}
                  </button>
                )}
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}