import { useState, useEffect } from 'react';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import Box, { Item } from 'devextreme-react/box';
import Form, { ButtonItem, GroupItem, SimpleItem, Label, EmailRule, RequiredRule } from 'devextreme-react/form';
import notify from 'devextreme/ui/notify';
import { useParamTypes } from '../../common/type';
import { notesAPI } from '../../api/api';
import Auth from '../../store/Auth';
import { editNoteFormData, statusData } from './data';

const EditNote = () => {
  const [formData, setFormData] = useState(editNoteFormData);
  const [formFetch, setFormFetch] = useState(false);
  const [formFetchData, setFormFetchData] = useState(true);
  const history = useHistory();
  const { noteId } = useParams<useParamTypes>();

  const handleSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    setFormFetch(true);
    notesAPI.editNote(formData).then((data) => {
      if (!data.error) {
        notify('Заметка изменена', 'success', 3000);
        history.push('/notes');
      }
      setFormFetch(false);
    });
  };
  useEffect(() => {
    notesAPI.getNote(+noteId, Auth.sessionTabId).then((data) => {
      if (data.data) {
        setFormData({
          noteId: data.data.noteId,
          note: data.data.note,
          status: data.data.status,
        });
        setFormFetchData(false);
      }
    });
  }, []);

  if (!Auth.isAuth) {
    return <Redirect to="/login" />;
  }
  return (
    <Box direction="row" width="100%" align="center" crossAlign="center">
      <Item ratio={0} baseSize={700}>
        <form action="your-action" onSubmit={handleSubmit}>
          <Form
            formData={formData}
            labelLocation="top"
            readOnly={false}
            showColonAfterLabel={true}
            validationGroup="customerData"
          >
            <GroupItem caption="Редактирование заметки">
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
              }}
            />
          </Form>
        </form>
      </Item>
    </Box>
  );
};

export default EditNote;
