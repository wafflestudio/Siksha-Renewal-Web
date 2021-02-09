import styled from 'styled-components'
import { restaurant } from '../../interfaces';
import Modal from './Modal';

const ModalContainerBlock = styled.div`
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  display: none;

  z-index: 4;

  @media (max-width: 768px) {
    display: block;
  }
`;

type ModalContainerProps = {
  restaurant: restaurant,
  setIsModalOpen: Function
}

const ModalContainer: React.FC<ModalContainerProps> = ({ restaurant, setIsModalOpen }) => {
  return (
    <ModalContainerBlock>
      <Modal restaurant={restaurant} setIsModalOpen={setIsModalOpen} />
    </ModalContainerBlock>
  );
};

export default ModalContainer;