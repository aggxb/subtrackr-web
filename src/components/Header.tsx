import { Plus, Zap } from 'lucide-react';
import ButtonComponent from './ButtonComponent';
import type { ModalInfo } from '../types/ui/modal';

const Header = ({ setIsModalOpen }: Pick<ModalInfo, 'setIsModalOpen'>) => {
  return (
    <header className="flex gap-5 py-8 justify-between items-center container">
      <div className="flex gap-3 items-center">
        <div className="bg-blue-600 size-12 flex items-center justify-center rounded-2xl">
          <Zap className="animate-pulse text-blue-100" />
        </div>
        <h1 className="text-2xl font-semibold">
          SubTrackr<span className="animate-pulse">.</span>
        </h1>
      </div>
      <ButtonComponent icon={Plus} handleClick={() => setIsModalOpen(true)}>
        Nova assinatura
      </ButtonComponent>
    </header>
  );
};

export default Header;
