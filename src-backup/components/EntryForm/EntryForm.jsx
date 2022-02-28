import './EntryForm.scss'
import { AttachMoney, CalendarToday, Email, LocationCity, PermIdentity, PhoneAndroid, Publish } from '@material-ui/icons';
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { update } from '../../redux/userSlice';
const EntryForm = () => {
    const dispatch = useDispatch();

    const [data, setData] = useState({"name": "Metrokafe"});
    console.log(data);
    
    const handleSubmit = (e) => {
        e.preventDefault();

        e.target.name.value = "";

        dispatch(update({data}))
        // let _name = e.target.name.value;
        // let _reservedTable = e.target.reservedTable.value;
        // let _waitTime = e.target.waitTime.value;
        // let _personCount = e.target.personCount.value;
        // let _phone = e.target.phone.value;
        // let _location = e.target.location.value;

        // console.log(_name);
        // console.log(_reservedTable);
        // console.log(_waitTime);
        // console.log(_personCount);
        // console.log(_phone);
        // console.log(_location);


    }

    return (
        <div className="entryForm">

            <div className="update">
                <span className="updateTitle">MÜŞTERİ BİLGİLERİ</span>
                    <form onSubmit={handleSubmit} className="updateForm">
                        <div className="updateLeft">
                            <div className="updateItem">
                                <label>İsim</label>
                                <input type="text" 
                                    name='name'
                                    className="userInput"
                                    placeholder='Recep'
                                    required
                                    onChange={(e) => setData(Object.assign({},
                                        data, 
                                        {"name": e.target.value}))}/>
                                </div>
                                <div className="updateItem">
                                    <label>Masa Numarası</label>
                                    <input type="text"
                                    name='reservedTable' 
                                    className="userInput"
                                    placeholder='Masa Numarası'
                                    onChange={(e) => setData(Object.assign({},
                                        data, 
                                        {"reservedTable": e.target.value}))}/>
                                </div>
                                <div className="updateItem">
                                    <label>Tahmini Bekleme Süresi</label>
                                    <input type="text"
                                    name='waitTime' 
                                    className="userInput"
                                    placeholder='20 dakika'
                                    onChange={(e) => setData(Object.assign({},
                                        data, 
                                        {"waitTime": e.target.value}))}/>
                                </div>
                                <div className="updateItem">
                                    <label>Kişi Sayısı</label>
                                    <input type="text"
                                    name='personCount' 
                                    className="userInput"
                                    placeholder='1'
                                    required defaultValue={1}
                                    onChange= {(e) => setData(Object.assign({},
                                        data, 
                                        {"personCount": e.target.value}))}/>
                                </div>
                                <div className="updateItem">
                                    <label htmlFor='phone'>Telefon Numarası</label>
                                    <input type="tel" name="phone" id="phone"
                                    pattern="[0-9]{4} [0-9]{3} [0-9]{2} [0-9]{2}"
                                    className="userInput"
                                    placeholder='0532 321 82 26'
                                    maxLength={14}
                                    onChange={(e) => setData(Object.assign({},
                                        data, 
                                        {"phone": e.target.value}))}/>
                                </div>
                                <div className="updateItem">
                                    <label>Beklediği Yer</label>
                                    <select name="location"
                                    value={"İçeride"}
                                    className="userInput"
                                    onChange={(e) => setData(Object.assign({},
                                        data, 
                                        {"location": e.target.value}))}>
                                        <option value="İçeride">İÇERİDE</option>
                                        <option value="Dışarıda">DIŞARIDA</option>
                                    </select>
                                </div>
                                <div className="updateItem">
                                    <label htmlFor="note"></label>
                                    <textarea name="note" rows="5"
                                    placeholder='Buraya not yazabilirsiniz...'
                                    onChange={(e) => setData(Object.assign({},
                                        data, 
                                        {"note": e.target.value}))}/>
                                </div>
                                <button className="updateButton"
                                    type='submit'>
                                    Ekle
                                </button>
                            </div>

                </form>
            </div>
        </div>
    )
}

export default EntryForm