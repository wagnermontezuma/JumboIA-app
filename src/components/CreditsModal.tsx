import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { FiInfo, FiX } from 'react-icons/fi';

interface CreditsModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

export const CreditsModal: React.FC<CreditsModalProps> = ({ isOpen, closeModal }) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex justify-between items-center mb-4">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 flex items-center"
                  >
                    <FiInfo className="mr-2" /> Créditos
                  </Dialog.Title>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="mt-6 flex flex-col items-center justify-center">
                  <div className="text-3xl font-bold text-blue-500 mb-4">GOTTA</div>
                  <div className="text-lg text-gray-800 mb-2">Henry Tabosa</div>
                  <div className="text-lg text-gray-800">Wagner Montezuma</div>
                </div>

                <div className="mt-8 text-center text-sm text-gray-500">
                  © {new Date().getFullYear()} JumboIA - Todos os direitos reservados
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}; 