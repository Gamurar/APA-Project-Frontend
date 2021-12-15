import React from 'react';
import { SmallButton } from 'components/Views/Button'
import { ApplicationModal } from 'state/application/actions'
import { useToggleModal } from 'state/application/hooks'


const AddStringBtn = (props: any) => {
  const toggleModal = useToggleModal(ApplicationModal.ADD_STRING)

  function onClick() {
    toggleModal()
  }

  return (
    <>
      <SmallButton onClick={onClick}>
          + Add String
      </SmallButton>
    </>
  );
};

export default AddStringBtn;
