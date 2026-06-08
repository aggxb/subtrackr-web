// interface -> representa as informações utilizadas no modal
export type ModalInfo = {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleCloseModal: () => void;
  formId?: string;
  buttonLabel?: string;
  isMutatingLabel?: string;
};