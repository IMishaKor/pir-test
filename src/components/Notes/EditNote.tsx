import { useState, useEffect } from 'react';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import Box, { Item } from 'devextreme-react/box';
import Form, { ButtonItem, GroupItem, SimpleItem, Label, RequiredRule } from 'devextreme-react/form';
import notify from 'devextreme/ui/notify';
import { useParamTypes } from '../../common/type';
import { notesAPI } from '../../api/api';
import { useStore } from '../../store/AuthStore';
import { editNoteFormData, statusData } from './data';

const EditNote = observer(() => {
  const authStore = useStore();
  const [refBtnSubmit, setRefBtnSubmit] = useState<HTMLButtonElement | null>(null);

  const [formData, setFormData] = useState(editNoteFormData);
  const [formFetch, setFormFetch] = useState(false);
  const [formFetchData, setFormFetchData] = useState(true);
  const history = useHistory();
  const { noteId } = useParams<useParamTypes>();

  const handleSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    setFormFetch(true);
    notesAPI
      .editNote(formData)
      .then((data) => {
        if (!data.error) {
          notify('Заметка изменена', 'success', 3000);
          history.push('/notes');
        }
        setFormFetch(false);
      })
      .catch((error) => {
        notify(error, 'error', 3000);
        setFormFetch(false);
      });
  };
  useEffect(() => {
    notesAPI
      .getNote(+noteId, authStore?.sessionTabId || '')
      .then((data) => {
        if (data.data) {
          if (authStore?.sessionTabId !== data.data.editNow) {
            notify('Заметку кто-то редактирует, попробуйте позже', 'warning', 3000);
            history.push('/notes');
          }
          setFormData({
            noteId: data.data.noteId,
            note: data.data.note,
            status: data.data.status,
          });
          setFormFetchData(false);
        }
      })
      .catch((error) => {
        notify(error, 'error', 3000);
        setFormFetch(false);
      });
  }, []);
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

  if (!authStore?.isAuth) {
    return <Redirect to="/login" />;
  }
  return (
    <Box direction="row" width="100%" align="center" crossAlign="center">
      <Item ratio={0} baseSize={700}>
        <form action="your-action" onSubmit={handleSubmit}>
          <Form formData={formData} labelLocation="top" readOnly={false} showColonAfterLabel={true} colCount={2}>
            <GroupItem caption="Редактирование заметки" colSpan="2">
              <SimpleItem dataField="note" editorType="dxTextBox" editorOptions={{ disabled: formFetchData }}>
                <Label text="Текст заметки" />
                <RequiredRule message="Заметка без самой заметки не заметка!" />
              </SimpleItem>
              <SimpleItem
                dataField="status"
                editorType="dxSelectBox"
                editorOptions={{ items: statusData, disabled: formFetchData }}
              />
            </GroupItem>

            <ButtonItem
              horizontalAlignment="left"
              buttonOptions={{
                text: 'Сохранить',
                type: 'success',
                useSubmitBehavior: true,
                disabled: formFetchData || formFetch,
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

export default EditNote;
