import React, { useEffect, useState } from 'react';
import axios  from "axios";

function App() {

  const [users, setUsers] = useState({
    users:[],
    id:0,
    name:'',
    email:'',
    password:''
  });
  useEffect(() => {
    // Update the document title using the browser API
    axios.get("http://localhost:8080/api/")
    .then((res)=>{
      console.log(res.data);
      setUsers({
        users:res.data,
        id:0,
        name:'',
        email:'',
        password:''
      })  
    })
  }, []);

  const submit = (event) => {
    var id = users.id;
    event.preventDefault();
    console.log("user id :"+users.id)
    if(id === 0){
      axios.post("http://localhost:8080/api/",{
        name:users.name,
        email:users.email,
        password:users.password
      })
      .then((res)=>{
        window.location.reload();
      })
    }else{
      axios.put("http://localhost:8080/api/",{
        id:users.id,
        name:users.name,
        email:users.email,
        password:users.password
      }).then(()=>{
        window.location.href = "http://localhost:8080/api/";
      })
    }
  }

  const deleteUser = (id) => {
    axios.delete(`http://localhost:8080/api/${id}`)
    .then(()=>{
      window.location.reload();
    })
  }

  const edit = (id) => {
    console.log(id);
    if (id) {
      axios.get(`http://localhost:8080/api/${id}`)
      .then((res)=>{
        console.log(res.data);
        setUsers(values => ({
          ...values,
          id:res.data.id,
          name:res.data.name,
          email:res.data.email,
          password:res.data.password
        }))
      })
    }
  }

  const handleChange = (event) => {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    console.log( name + email + password );
    setUsers(values => ({...values, name: name, email: email, password: password}))
  }

  return (
<div className="container" >
    
    <div className="row">
    <div className="col s6">
        <form onSubmit={submit}>
        <div class="input-field col s12">
          <i class="material-icons prefix">person</i>
          <input onChange={handleChange} name="name" type="text" id="name" class="autocomplete" />
          <label for="autocomplete-input">Autocomplete</label>
        </div>
        <div class="input-field col s12">
          <i class="material-icons prefix">email</i>
          <input onChange={handleChange} name="email" type="email" id="email" class="autocomplete" />
          <label for="autocomplete-input">Email</label>
        </div>
        <div class="input-field col s12">
          <i class="material-icons prefix">vpn_key</i>
          <input onChange={handleChange} name="password" type="password" id="password" class="autocomplete" />
          <label for="autocomplete-input">Password</label>
        </div>
        <button class="btn waves-effect waves-light right" type="submit" name="action">Submit
          <i class="material-icons right">send</i>
        </button>
        </form>
      </div>
      <div className="col s6">
      <table>
        <thead>
          <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>Edit</th>
              <th>Delete</th>
          </tr>
        </thead>

        <tbody>
        {
           ( users.users.length > 0 ) ? users.users.map(user=>
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>
                <button onClick={(e)=>edit(user.id)} class="btn waves-effect waves-light" type="submit" name="action">
                  <i class="material-icons">edit</i>
                </button>
                </td>
                <td>
                <button onClick={(e)=>deleteUser(user.id)} class="btn waves-effect waves-light" type="submit" name="action">
                  <i class="material-icons">delete</i>
                </button>
                </td>
              </tr>
              ) : <tr>empty data</tr>
          }
          
        </tbody>
      </table>
      </div>
    
    </div>
    </div>
  );
}

export default App;
