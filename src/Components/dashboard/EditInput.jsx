import React, { useState, useCallback } from 'react';
import { Input, InputGroup } from 'rsuite';
import { AiTwotoneEdit, AiOutlineCheck } from 'react-icons/ai';
import InputGroupButton from 'rsuite/esm/InputGroup/InputGroupButton';
import { toaster, Notification } from 'rsuite';

const EditInput = ({
  initialValue,
  onSave,
  titleName,
  label,
  placeholder = 'Change Display Name...',
  emptyMessage = 'Input is Empty',
  ...inputProps
}) => {
  const editStyleTrue = {
    background: 'rgba(61, 131, 187, 1)',
    color: 'white',
    fontSize: 20,
  };
  const editStyleFalse = {
    background: 'rgba(211, 80, 80, 1)',
    color: 'white',
    fontSize: 20,
  };

  const [input, setInput] = useState(initialValue);
  const [isEditable, setIsEditable] = useState(false);

  const onInputChange = useCallback(value => {
    setInput(value);
  }, []);
  const onEditClick = useCallback(() => {
    setIsEditable(p => !p);
    setInput(initialValue);
  }, [initialValue]);

  const onSaveClick = async () => {
    const trimmed = input.trim();

    if (!trimmed.match(/^[a-z\sa-z]{3,16}$/i)) {
      toaster.push(
        <Notification
          style={{ backgroundColor: '#F9FEBA' }}
          closable
          type="warning"
          header="Choose another name..."
          duration={5000}
        >
          Display name must be 3-16 characters & no symbols
        </Notification>,
        {
          placement: 'topCenter',
        }
      );

      return;
    }
    if (trimmed !== initialValue) {
      await onSave(trimmed);
    }
    setIsEditable(false);
  };

  return (
    <div>
      <p className="mb-2">{titleName}</p>
      <InputGroup>
        <InputGroup.Button
          onClick={onEditClick}
          style={!isEditable ? editStyleTrue : editStyleFalse}
        >
          <AiTwotoneEdit />
        </InputGroup.Button>
        <Input
          {...inputProps}
          disabled={!isEditable}
          value={input}
          placeholder={placeholder}
          onChange={onInputChange}
        />
        {isEditable && (
          <InputGroupButton style={editStyleTrue} onClick={onSaveClick}>
            <AiOutlineCheck />
          </InputGroupButton>
        )}
      </InputGroup>
    </div>
  );
};

export default EditInput;
