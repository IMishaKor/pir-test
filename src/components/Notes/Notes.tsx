import { useState, useEffect } from 'react';

import { Redirect, useHistory } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import Box, { Item } from 'devextreme-react/box';
import DataGrid, { Button, Column, Paging, Pager, FilterRow, Lookup } from 'devextreme-react/data-grid';
import { Button as Btn } from 'devextreme-react/button';
import { Template } from 'devextreme-react/core/template';
import notify from 'devextreme/ui/notify';

import { useStore } from '../../store/AuthStore';
import { notesAPI } from '../../api/api';
import { note } from '../../common/type';
import { statusData } from './data';

const Notes = () => {
  const authStore = useStore();

  const [notes, setNotes] = useState<note[]>([]);
  const history = useHistory();

  useEffect(() => {
    let isSubscribed = true;
    const getNotes = () => {
      notesAPI
        .getNotes()
        .then((data) => (isSubscribed && data.data ? setNotes(data.data) : null))
        .catch((error) => (isSubscribed ? console.log(error) : null));
    };
    getNotes();

    const notesObserver = (e: StorageEvent) => {
      if (e.key === 'notes') getNotes();
    };
    window.addEventListener('storage', notesObserver, false);

    return () => {
      // От ошибка не спасло, надо подумать...
      isSubscribed = false;

      window.removeEventListener('storage', notesObserver, false);
    };
  }, []);

  const noteEdit = (e: any): void => {
    e.event.preventDefault();
    history.push(`/notes/edit/${e.row.data.noteId}`);
  };
  const noteRemove = (e: any): void => {
    e.event.preventDefault();
    notesAPI.removeNote(+e.row.data.noteId).then(() => {
      notesAPI.getNotes().then((data) => {
        if (data.data) {
          setNotes(data.data);
          notify('Заметка удалена');
        }
      });
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

  if (!authStore?.isAuth) return <Redirect to="/login" />;
  return (
    <Box direction="row" width="100%" align="center" crossAlign="center">
      <Item ratio={0} baseSize={700}>
        <DataGrid
          id="notesTable"
          dataSource={notes}
          showBorders={true}
          remoteOperations={true}
          onToolbarPreparing={onToolbarPreparing}
        >
          <FilterRow
            visible={true}
            applyFilter={{
              key: 'auto',
              name: 'Immediately',
            }}
          />

          <Column dataField="created" caption="Дата" dataType="date" width="145" />
          <Column dataField="note" caption="Заметка" dataType="string" />
          <Column dataField="status" caption="Статус" dataType="string" width="145">
            <Lookup dataSource={{ store: { type: 'array', data: statusData } }} />
          </Column>
          <Column type="buttons" width="70">
            <Button hint="Редактировать" icon="edit" onClick={noteEdit} />
            <Button hint="Удалить" icon="trash" onClick={noteRemove} />
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
