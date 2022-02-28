import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { AccountCircleOutlined, ArrowDownwardOutlined, ArrowUpwardOutlined, CheckCircleOutlined, DeleteOutline } from '@material-ui/icons'
import './Table.scss'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Snackbar from '@mui/material/Snackbar';
import { updateTableData } from '../../redux/userSlice';

// const rows = [
//   { id: 1, date: new Date().getHours().toString(), name: 'Çetin', tableType: "*", age: 35 },
//   { id: 2, date: new Date().getDay().toString(), name: 'Recep', tableType: "+", age: 442 },
//   { id: 3, date: new Date().getDay().toString(), name: 'Mustafa', tableType: "-", age: 435 },
//   { id: 4, date: new Date().getDay().toString(), name: 'Mahfuze', tableType: "*",  age: 126 },
//   { id: 5, date: new Date().getDay().toString(), name: 'Metin', age: 777 },
//   { id: 6, date: new Date().getDay().toString(), name: 'Muhammed', age: 150 },
//   { id: 7, date: new Date().getDay().toString(), name: 'Yasin', age: 44 },
//   { id: 8, date: new Date().getDay().toString(), name: 'Sümeyye', age: 36 },
//   { id: 9, date: new Date().getDay().toString(), name: 'Betül', age: 65 },
// ];
let rowData = [];
let previousStateData = {};

export default function Table() {

  const [rowDatas, setRowDatas] = useState([{"name": "recep"}]);
  const dispatch = useDispatch();

  const handleRowEditCommit = React.useCallback(
    (params) => {
        rowData[params.id-1][params.field] = params.value;
        setDeleteData([]);
      },
    []
  );

  const [snackbarState, setSnackbarState] = useState({'state': false, 'message': "DEFAULT MESSAGE FROM SELECTRA"});
  const [deleteData, setDeleteData] = useState([]);

  // Timer Function
  // useEffect(() => {
  //   let interval;
  //   interval = setInterval(() => {
  //     console.log('INTERVAL EVENT')
  //   }, 10000); // Miliseconds
  //   return () => clearInterval(interval);
  // }, [])

  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.key === 'z'){
        handleClick("CTRL + Z pressed");
      }
    });
    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.key === 'y'){
        handleClick("CTRL + Z pressed");
      }
    });
  }, [])

  const handleClick = (message) => {
    setSnackbarState({'state': true, 'message': message});
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarState({'state': false, 'message': 'Closing...'});
  };

  const renumberList = (list) => {
    for (let i = 0; i < list.length; i++) {
      const element = list[i];
      element["id"] = i+1;
    }
  }

  const sortList = (list) => {
    list.sort((a, b) => {
      return a["id"]-b["id"]
    });
    return list;
  }

  const moveRow = (id, direction) => {

    console.log(id);
    handleClick(`ID is: ${id} Direction is: ${direction}`)
    if (direction === "up" & id !== 1){
      rowData[id-1]["id"] -= 1;
      rowData[id-2]["id"] += 1;
    } else if (direction === "down" & id !== rowData.length){
      rowData[id-1]["id"] += 1;
      rowData[id]["id"] -= 1;
    }

    rowData = sortList([...rowData]);
    renumberList(rowData);
    setDeleteData([]);
  }

  useSelector( (state) => {

    if (previousStateData != null & previousStateData === state.user.data){
      console.log("Same data came and ignored");
      return;
    }

    console.log("Data came to TABLE");
    previousStateData = state.user.data;
    let inputData = state.user.data;
    if (!inputData['personCount']){
      inputData = Object.assign({}, inputData, {"name": inputData["name"] + " (1)"})
    } else {
      inputData = Object.assign({}, inputData, {"name": `${inputData["name"]} (${inputData["personCount"]})`})
    }

    if (!inputData['location']){
      inputData = Object.assign({}, inputData, {"location": "İçeride"});
    } 

    if (!inputData['note']){
      inputData = Object.assign({}, inputData, {"note": "Müşteri Notu"});
    } 

    let newData = Object.assign({}, inputData, {"id":  rowData.length+1, "date": `${new Date().getHours().toString()}:${new Date().getMinutes().toString()}`});
    rowData = [...rowData, newData];

    dispatch(updateTableData(rowData));
    return rowData; 
  });

  const handleDelete = (id) => {
      rowData = (rowData.filter((item) => item.id !== id));

      renumberList(rowData);
      setDeleteData([]);
  }

  const handleAccept = (id) => {

  }
  
  const columns = [
    { 
      cellClassName: 'idColumn',
      field: 'id', 
      headerName: 'ID', 
      width: 40, 
    },
    {
      cellClassName: 'dateColumn',
      field: 'date',
      renderHeader: (params) => {
        return (
          <h4>Geldiği Saat</h4>
        )
      },
      minWidth: 120,
      renderCell: (params) => {
        return (
          <div className='dateContainer'>
            <div className="dateRelativeContainer">
              <progress className="dateProgressbar" value={50} max={100}/>
              <span className="dateText">{params.value}</span>
            </div>
          </div>
        )
      },
      sortable: true,
    },

    /* NAME COLUMN */
    {
      cellClassName: 'nameColumn',
      field: 'name',
      renderHeader: (params) => {
        return (
          <>
              <h4>{'İsim'}</h4>
              <AccountCircleOutlined style={{marginLeft: 5}}/>
          </>
        )
      },
      renderCell: (params) => {
        return (
          <h4>{params.value}</h4>
        )
      },
      sortable: false,
      flex: true,
      minWidth: 80,
    },

    /* WAIT TIME COLUMN */
    {
      cellClassName: 'waitTimeColumn',
      field: 'waitTime',
      editable: true,
      flex: true,
      minWidth: 60,
      renderHeader: (params) => {
        return (
          <div className="waitTimeHeader">
            <p>Tahmini Süre</p>
          </div>
        )
      },
    },

    /* PHONE COLUMN */
    {
      cellClassName: 'phoneColumn',
      field: 'phone',
      headerName: 'Telefon Numarası',
      flex: true,
      editable: true,
    },

    /* LOCATION COLUMN */
    {
      cellClassName: 'locationColumn',
      field: 'location',
      headerName: 'Beklediği Yer',
      flex: true,
      editable: true,
      minWidth: 50,
      renderCell: (params) => {
        return (
          <h4>{params.value}</h4>
        )
      }
    },

    /* RESERVED TABLE COLUMN */
    {
      cellClassName: 'reservedTableColumn',
      field: 'reservedTable',
      flex: true,
      editable: true,
      sortable: false,
      renderHeader: (params) => {
        return (
          <div className="reservedTable">
            <p>Masa Numarası</p>
          </div>
        )
      },
      renderCell: (params) => {
        return (
          <h4>{params.value}</h4>
        )
      }
    },

    /* NOTES COLUMN */
    {
      cellClassName: 'notesColumn',
      field: 'note',
      flex: true,
      sortable: false,
      renderHeader: (params) => {
        return (
          <div className="reservedTable">
            <p>Not</p>
          </div>
        )
      },
      renderCell: (params) => {
        return (
          <textarea style={{height:45, resize:'none', width:'100%'}} 
          rows="4" 
          placeholder="Not girebilirsiniz"
          value={params.value}
          onChange={(e) => { rowData[params.row.id-1]["note"] = e.target.value; console.log(rowData[params.row.id-1]); }}/>
        )
      }
    },

    /* EDIT COLUMN */
    {
      cellClassName: 'editColumn',
      field: 'edit',
      headerName: 'Düzenle',
      description: 'Hücre değerlerini düzenleme için kullanılır',
      sortable: false,
      editable: false,
      minWidth: 100,
      flex: true,
      renderCell: (params) => {
        return (
          <>
            <div className="iconContainer">
              <ArrowUpwardOutlined className='arrow up' onClick={() => {moveRow(params.row.id, "up"); console.log(params)}}/>
            </div>
            <div className="iconContainer">
              <ArrowDownwardOutlined className='arrow down' onClick={() => moveRow(params.row.id, "down")}/>
            </div>
            <div className="iconContainer">
              <CheckCircleOutlined className="arrow up" onClick={() => handleAccept(params.row.id)}/>
            </div>
            <div className="iconContainer">
              <DeleteOutline className="deleteButton" onClick={() => handleDelete(params.row.id)}/>
            </div>
          </>
        )
      }
    }
  ];

  return (
    <div className='dataGrid'>
      <DataGrid
        rows={rowData}
        columns={columns}
        pageSize={8}
        rowsPerPageOptions={[8]}
        // checkboxSelection
        disableSelectionOnClick
        editMode='cell'
        onCellEditCommit={handleRowEditCommit}
      />

      <Snackbar
        open={snackbarState['state']}
        autoHideDuration={2000}
        onClose={handleClose}
        message={snackbarState['message']}
        action={
          <button onClick={handleClose}>Undo</button>
        }
      />
    </div>
  );
}