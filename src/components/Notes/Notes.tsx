import { useState, useEffect } from 'react';

import { Redirect, NavLink, useHistory } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import Box, { Item } from 'devextreme-react/box';
import DataGrid, { Button, Column, Paging, Pager } from 'devextreme-react/data-grid';
import { Button as Btn } from 'devextreme-react/button';
import { Template } from 'devextreme-react/core/template';

import Auth from '../../store/Auth';
import { notesAPI } from '../../api/api';
import { note } from '../../common/type';

const Notes = () => {
  const [notes, setNotes] = useState<note[]>([]);
  const history = useHistory();

  useEffect(() => {
    let isSubscribed = true;
    notesAPI
      .getNotes()
      .then((data) => (isSubscribed && data.data ? setNotes(data.data) : null))
      .catch((error) => (isSubscribed ? console.log(error) : null));
    return () => {
      // От ошибка не спасло, надо подумать...
      isSubscribed = false;
    };
  }, []);

  if (!Auth.isAuth) {
    return <Redirect to="/login" />;
  }

  const noteEdit = (e: any): void => {
    e.event.preventDefault();
    history.push(`/notes/edit/${e.row.data.noteId}`);
  };
  const noteRemove = (e: any): void => {
    e.event.preventDefault();
    notesAPI.removeNote(+e.row.data.noteId).then(() => {
      notesAPI.getNotes().then((data) => (data.data ? setNotes(data.data) : null));
    });
  };

  const onToolbarPreparing = (e: any): void => {
    e.toolbarOptions.items.push({
      location: 'before',
      template: 'titleTable',
    });
    e.toolbarOptions.items.push({
      location: 'after',
      template: 'addBtn',
    });
  };
  const addBtn = () => {
    return (
      <Btn
        icon="add"
        onClick={() => {
          history.push(`/notes/add/`);
        }}
      />
    );
  };
  const titleTable = () => {
    return <div style={{ fontSize: 20 }}>Список заметок</div>;
  };

  return (
    <Box direction="row" width="100%" align="center" crossAlign="center">
      <Item ratio={0} baseSize={700}>
        <DataGrid dataSource={notes} showBorders={true} remoteOperations={true} onToolbarPreparing={onToolbarPreparing}>
          <Column dataField="created" caption="Дата" dataType="datetime" />
          <Column dataField="note" caption="Заметка" dataType="string" />
          <Column dataField="status" caption="Статус" dataType="string" />
          <Column type="buttons" width={110}>
            <Button hint="Clone" icon="edit" onClick={noteEdit} />
            <Button hint="Clone" icon="trash" onClick={noteRemove} />
          </Column>
          <Paging defaultPageSize={3} />
          <Pager showPageSizeSelector={true} allowedPageSizes={[3, 6, 'all']} />
          <Template name="addBtn" render={addBtn} />
          <Template name="titleTable" render={titleTable} />
        </DataGrid>
      </Item>
    </Box>
  );
};

export default observer(Notes);
