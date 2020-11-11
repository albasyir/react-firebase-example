import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import UserService from './services/userservice'
class App extends Component {

    constructor() {
        super()
        this.state = {
            id : "",
            name : "",
            address : "",
            users : [],
            edit : false
        }

        this.ref = UserService.getAll()
        this.unsubscribe = null;

        this.changeName = this.changeName.bind(this)
        this.changeAddress = this.changeAddress.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        // this.onEdit = this.onEdit.bind(this)
    }


    onRenderUserList = (docs) => {
        const users = []

        docs.forEach((doc) => {

            const { name, address} = doc.data()
            users.push({
                id : doc.id,
                name : name,
                address : address
            })
        })

        this.setState({
            users
        })
        console.log(users)
    }

    changeName(e) {
        this.setState({
            name : e.target.value
        })
    }

    changeAddress(e) {
        this.setState({
            address : e.target.value
        })
    }

    onEdit(id) {
        console.log(id)

        const user = UserService.get().doc(id)
        user.get().then((doc) => {
            const { name, address} = doc.data()
            this.setState({
                id : doc.id,
                name,
                address,
                edit : true
            })
        })
    }
    
    onDelete(id) {
        UserService.delete(id)
        .then(() => {
            console.log("Deleted new item successfully!");
        })
        .catch((e) => {
            console.log(e)
        })
    }

    onSubmit(e)
    {
        e.preventDefault()
        if(!this.state.edit) {
            UserService.create({
                name : this.state.name,
                address : this.state.address
            })
            .then(() => {
                console.log("Created new item successfully!");
                this.setState({
                    name: "",
                    address: ""
                });
            })
            .catch((e) => {
                console.log(e)
            })
        } else {
            UserService.update(this.state.id, {
                name : this.state.name,
                address : this.state.address
            }).then(() => {
                console.log("Updated  item successfully!");
                this.setState({
                    name: "",
                    address: "",
                    edit : false
                });
            })
            .catch((e) => {
                console.log(e)
            })
        }
    }

    componentDidMount() {
        this.ref.orderBy("name","asc").onSnapshot(this.onRenderUserList)
    }

    render() {
        return (
            <div className="container">
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Nama</label>
                        <input type="text" className="form-control" value={this.state.name} onChange={this.changeName}/>
                    </div>
                    <div className="form-group">
                        <label>Alamat</label>
                        <input type="text" className="form-control" value={this.state.address} onChange={this.changeAddress}/>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form> 

                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Nama</th>
                            <th>Alamat</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.users.map(user => 
                            <tr>
                                <td>{user.name}</td>
                                <td>{user.address}</td>
                                <td>
                                    <button className="btn btn-primary" onClick={ () => this.onEdit(user.id)} >Edit</button>
                                    <button className="btn btn-danger" onClick={ () => this.onDelete(user.id)}>Delete</button>
                                </td>
                            </tr>    
                        )}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default App;