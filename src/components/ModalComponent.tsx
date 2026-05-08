import type { ModalInfo } from '../types/types';
import React from 'react';
import { Modal } from '@heroui/react';
import ButtonComponent from './ButtonComponent';
import { useIsMutating } from '@tanstack/react-query';

const ModalComponent = ({
  isModalOpen,
  handleCloseModal,
  title,
  children,
  formId,
  buttonLabel,
  isMutatingLabel,
}: ModalInfo & React.ComponentProps<'dialog'>) => {
  const isMutating = useIsMutating({ mutationKey: ['subscriptions'] });

  return (
    <Modal.Backdrop
      variant="blur"
      isOpen={isModalOpen}
      onOpenChange={handleCloseModal}
    >
      <Modal.Container>
        <Modal.Dialog className="bg-black border border-neutral-800 w-full">
          <Modal.Header>
            <Modal.Heading className="text-xl font-semibold px-0.5">
              {title}
            </Modal.Heading>
          </Modal.Header>
          <Modal.Body className="grid gap-4 px-0.5">
            {children}
            <Modal.Footer>
              <ButtonComponent
                bgColor="bg-neutral-950"
                textColor="text-neutral-50"
                handleClick={handleCloseModal}
                aria-label="Cancelar"
              >
                Cancelar
              </ButtonComponent>
              <ButtonComponent
                form={formId}
                type="submit"
                bgColor="bg-blue-600"
                textColor="text-neutral-50"
                disabled={isMutating !== 0}
                aria-label={buttonLabel || 'Confirmar'}
              >
                {isMutating ? isMutatingLabel : buttonLabel || 'Confirmar'}
              </ButtonComponent>
            </Modal.Footer>
          </Modal.Body>
        </Modal.Dialog>
      </Modal.Container>
    </Modal.Backdrop>
  );
};

export default ModalComponent;
