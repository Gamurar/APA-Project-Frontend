import React, { useState, useEffect } from 'react';
import { useModalOpen } from 'state/application/hooks'
import { ApplicationModal } from 'state/application/actions'
import styled from 'styled-components'
import { ReactComponent as CrossIcon } from 'assets/svg/cross.svg'
import { TYPE } from 'theme'
import { useToggleModal } from 'state/application/hooks'
import { Input, Button } from 'components'

interface Props {
  updateStringList: () => void,
}

export const AddStringModal = ({ updateStringList } : Props) => {
  const isOpen = useModalOpen(ApplicationModal.ADD_STRING)
  const toggleModal = useToggleModal(ApplicationModal.ADD_STRING)
  const [error, setError] = useState(true)
  const [typedValue, setTypedValue] = useState('')

  useEffect(() => {
    setTypedValue('');
  }, [isOpen]);

  const onUserInput = (event: any) => {
    const value = event.target.value;
    if (value === '') {
      setError(true)
    } else {
      setError(false)
    }
    setTypedValue(value);
  }

  function sendAddStringReq(str: string) {
    if (!str) {
        return;
    }

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: str })
    }

    fetch('http://localhost:3001/add-string', requestOptions)
      .then((res) => res.json())
      .then((res) => {
        console.log(res.data);
        updateStringList();
        toggleModal();
      })
      .catch((err) => {
        console.log("error: ", err);
      });
  }

  function onAddString() {
    sendAddStringReq(typedValue);
  }


  return (
    <>
      {isOpen && (
        <ModalOverlay>
          <ModalContainer>
            <CrossIconStyled onClick={toggleModal}/>
            <TYPE.H4>Add new string</TYPE.H4>
            <Input type="text" name="name" onInput={onUserInput} value={typedValue}/>
            <Button disabled={error} onClick={onAddString}>Add string</Button>
          </ModalContainer>
        </ModalOverlay>
      )}
    </>
  )
}

const CrossIconStyled = styled(CrossIcon)`
  float: right;
  margin-top: -5%;
  margin-right: -5%;
  cursor: pointer;
`

const ModalContainer = styled.div`
  background-color: white;
  width: 483px;
  height: auto;
  padding: 29px 31px 41px 31px;
  box-sizing: border-box;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  margin-top: 20vh;
  border-radius: 4px;
  text-align: left;
`

const ModalOverlay = styled.div`
  position: absolute;
  background-color: rgba(41, 47, 48, 0.7);
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
`
