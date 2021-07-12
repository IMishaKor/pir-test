import React, { useEffect, useRef, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import Box, { Item } from 'devextreme-react/box';
import Form, { ButtonItem, GroupItem, SimpleItem, Label, RequiredRule } from 'devextreme-react/form';
import notify from 'devextreme/ui/notify';
import { notesAPI } from '../../api/api';
import { useStore } from '../../store/AuthStore';
import { addNoteFormData, statusData } from './data';

const AddNote = observer(() => {
  const authStore = useStore();
  const [refBtnSubmit, setRefBtnSubmit] = useState<HTMLButtonElement | null>(null);
  const [formFetch, setFormFetch] = useState(false);
  const history = useHistory();

  const handleSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    setFormFetch(true);
    notesAPI.addNote(addNoteFormData).then((data) => {
      if (!data.error) {
        addNoteFormData.note = '';
        addNoteFormData.status = statusData[0];
        notify('Заметка добавлена', 'success', 3000);
        history.push('/notes');
      }
      setFormFetch(false);
    });
  };

  useEffect(() => {
    const seveNoteKeydown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key.toLowerCase() === 's') {
        e.preventDefault();
        refBtnSubmit?.focus();
        refBtnSubmit?.click();
      }
    };
    document.addEventListener('keydown', seveNoteKeydown, false);
    return () => {
      document.removeEventListener('keydown', seveNoteKeydown, false);
    };
    // eslint-disable-next-line
  }, [refBtnSubmit]);

  if (!authStore?.isAuth) return <Redirect to="/login" />;
  return (
    <Box direction="row" width="100%" align="center" crossAlign="center">
      <Item ratio={0} baseSize={700}>
        <form action="your-action" onSubmit={handleSubmit}>
          <Form formData={addNoteFormData} labelLocation="top" readOnly={false} showColonAfterLabel={true} colCount={2}>
            <GroupItem caption="Добавление заметки" colSpan="2">
              <SimpleItem dataField="note" editorType="dxTextBox">
                <Label text="Текст заметки" />
                <RequiredRule message="Заметка без самой заметки не заметка!" />
              </SimpleItem>
              <SimpleItem dataField="status" editorType="dxSelectBox" editorOptions={{ items: statusData }} />
            </GroupItem>

            <ButtonItem
              horizontalAlignment="left"
              buttonOptions={{
                text: 'Добавить',
                type: 'success',
                useSubmitBehavior: true,
                disabled: formFetch,
                onInitialized: (e: any) => {
                  // кастыль для получения ссылки на кнопку отправки формы с валидацией
                  setRefBtnSubmit(e.element);
                },
              }}
            />
            <ButtonItem
              horizontalAlignment="right"
              buttonOptions={{
                text: 'Отмена',
                onClick: () => history.push('/notes'),
              }}
            />
          </Form>
        </form>
      </Item>
    </Box>
  );
});

export default AddNote;
