import {createSlice} from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: "user",
    initialState: {
        tableData: [],
        data: {
            "name": "Recep",
            "reservedTable": "12",
            "waitTime": "10 dakika",
            "personCount": "3",
            "phone": "0532 321 82 26",
            "location": "İçeride",
            
        },
    },
    reducers: {
        updateTableData: (state, action) => {
            state.tableData = action.payload.data;
        },
        update: (state, action) => {
            state.data = action.payload.data;
        }
    }
})

export const {update, updateTableData} = userSlice.actions;
export default userSlice.reducer;