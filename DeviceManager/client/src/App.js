import axios from 'axios';
import {useState}  from 'react';
import "./App.css";

function App() {
  const [devices, setDevices] = useState([]);
  const [oneDevice, setOneDevice] = useState({});

  function handleGetAllClick() {
    axios({
      method: 'get',
      url: 'http://127.0.0.1:3000/api/v1/device',
    })
      .then(function (response) {
        setDevices(response.data.deviceInfo);
      })
    }

  function handleCreateSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    axios({
      method: 'post',
      url: 'http://127.0.0.1:3000/api/v1/device',
      headers: { 'content-type': 'application/json' },
      data: formJson
    })
    .then((res)=>{
      console.log(res);
    })
  }

  function handleCreateBtn(e) {
    e.preventDefault();
    const form = document.deviceForm;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    axios({
      method: 'post',
      url: 'http://127.0.0.1:3000/api/v1/device',
      headers: { 'content-type': 'application/json' },
      data: formJson
    })
    .then((res)=>{
      console.log(res);
    })
  }

  function handleUpdateBtn(e) {
    e.preventDefault();
    const form = document.deviceForm;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    axios({
      method: 'put',
      url: 'http://127.0.0.1:3000/api/v1/device',
      headers: { 'content-type': 'application/json' },
      data: formJson
    })
    .then((res)=>{
      console.log(res);
    })
  }

  function confirmGetOneSubmit() {
    axios({
      method: 'get',
      url: 'http://127.0.0.1:3000/api/v1/device/' + document.snGetOneForm.sn.value,
    })
    .then(function (response) {
      setOneDevice(response.data.deviceInfo);
    })
  }

  function handleDeleteSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    axios({
      method: 'delete',
      url: 'http://127.0.0.1:3000/api/v1/device',
      headers: { 'content-type': 'application/json' },
      data: formJson
    })
    .then((res)=>{
      console.log(res);
    })
  }
  return (
    <>
      <div>
        <button onClick={handleGetAllClick}>
         GET All Device
        </button>
        <table >
          <thead>
            <tr>
              <th className='th'>id</th>
              <th className='th'>name</th>
              <th className='th'>sn</th>
              <th className='th'>model</th>
              <th className='th'>grade</th>
              <th className='th'>owner</th>
              <th className='th'>underMaintenance</th>
              <th className='th'>country</th>
              <th className='th'>city</th>
              <th className='th'>createAt</th>
              <th className='th'>updateAt</th>
            </tr>
          </thead>
          <tbody>
            {devices.map((device) => (
            <tr key={device.id}>
              <td className='td'>{device.id}</td>
              <td className='td'>{device.name}</td>
              <td className='td'>{device.sn}</td>
              <td className='td'>{device.model}</td>
              <td className='td'>{device.grade}</td>
              <td className='td'>{device.owner}</td>
              <td className='td'>{device.underMaintenance && device.underMaintenance.toString()}</td>
              <td className='td'>{device.country}</td>
              <td className='td'>{device.city}</td>
              <td className='td'>{device.createdAt && device.createdAt.toString("dd/MM/yyyy HH:mm")}</td>
              <td className='td'>{device.updatedAt && device.updatedAt.toString("dd/MM/yyyy HH:mm")}</td>
            </tr>
          ) )}
          </tbody>
        </table>
      </div>
      <br/>
        <form name="deviceForm" className="vertical-form" onSubmit={handleCreateSubmit}>
          <div>
              <br />
              <label className="vertical-label">
                name: <input type="text" name="name" />
              </label>
              <br />
              <label className="vertical-label">
                sn: <input type="text" name="sn" />
              </label>
              <br />
              <label className="vertical-label">
                model: <input type="text" name="model" />
              </label>
              <br />
              <label className="vertical-label">
                grade: <input type="text" name="grade" />
              </label>
              <br />
              <label className="vertical-label">
                owner: <input type="text" name="owner" />
              </label>
              <br />
              <label className="vertical-label">
                underMaintenance: <input type="checkbox" name="underMaintenance" />
              </label>
              <br />
              <label className="vertical-label">
                country: <input type="text" name="country" />
              </label>
              <br />
              <label className="vertical-label">
                city: <input type="text" name="city" />
              </label>
              <br />
          </div>
          <br/>
          <div>
            <input type="button" value="Create" onClick={handleCreateBtn} />
            <input type="button" value="Update" onClick={handleUpdateBtn}/>
          </div>
              
          
      </form>
      <br/>
      <div>
        <form name="snGetOneForm">
          <label>
              sn: <input type="text" name="sn" />
          </label>
          <input type="button" value="GET One Device" onClick={()=>confirmGetOneSubmit()} />
        </form>
        <div>
          <table className='gridTable'>
            <thead>
              <tr>
                <th className='th'>id</th>
                <th className='th'>name</th>
                <th className='th'>sn</th>
                <th className='th'>model</th>
                <th className='th'>grade</th>
                <th className='th'>owner</th>
                <th className='th'>underMaintenance</th>
                <th className='th'>country</th>
                <th className='th'>city</th>
                <th className='th'>createAt</th>
                <th className='th'>updateAt</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='td'>{oneDevice.id}</td>
                <td className='td'>{oneDevice.name}</td>
                <td className='td'>{oneDevice.sn}</td>
                <td className='td'>{oneDevice.model}</td>
                <td className='td'>{oneDevice.grade}</td>
                <td className='td'>{oneDevice.owner}</td>
                <td className='td'>{oneDevice.underMaintenance && oneDevice.underMaintenance.toString()}</td>
                <td className='td'>{oneDevice.country}</td>
                <td className='td'>{oneDevice.city}</td>
                <td className='td'>{oneDevice.createdAt && oneDevice.createdAt.toString()}</td>
                <td className='td'>{oneDevice.createdAt && oneDevice.updatedAt.toString()}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <form name="snDeleteForm" className="vertical-form" onSubmit={handleDeleteSubmit}>
          <label className="vertical-label">
              sn: <input type="text" name="sn" />
            </label>
          <input type="submit" value="Delete One Device"/>
        </form>
      </div>
    </>
  )
}

export default App;
