import { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import Box, { Item } from 'devextreme-react/box';
import Form, { ButtonItem, GroupItem, SimpleItem, Label, EmailRule, RequiredRule } from 'devextreme-react/form';
import notify from 'devextreme/ui/notify';
import { notesAPI } from '../../api/api';
import Auth from '../../store/Auth';
import { addNoteFormData, statusData } from './data';

const AddNote = () => {
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

  if (!Auth.isAuth) {
    return <Redirect to="/login" />;
  }
  return (
    <Box direction="row" width="100%" align="center" crossAlign="center">
      <Item ratio={0} baseSize={700}>
        <form action="your-action" onSubmit={handleSubmit}>
          <Form
            formData={addNoteFormData}
            labelLocation="top"
            readOnly={false}
            showColonAfterLabel={true}
            validationGroup="customerData"
          >
            <GroupItem caption="Добавление заметки">
              {/* При попытке указать тип dxTextArea возникает ошибка */}
              <SimpleItem dataField="note" editorType="dxTextBox">
                <Label text="Текст заметки" />
                <RequiredRule message="Заметка без самой заметки не заметка!" />
              </SimpleItem>
              <SimpleItem dataField="status" editorType="dxSelectBox" editorOptions={{ items: statusData }} />
            </GroupItem>

            <ButtonItem
              horizontalAlignment="left"
              buttonOptions={{ text: 'Добавить', type: 'success', useSubmitBehavior: true, disabled: formFetch }}
            />
          </Form>
        </form>
      </Item>
    </Box>
  );
};

export default AddNote;
