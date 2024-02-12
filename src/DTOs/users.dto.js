export default class UsersDTO {
    constructor(obj){
        this._id = obj._id
        this.first_name = obj.first_name
        this.last_name = obj.last_name
        this.fullname = `${obj.first_name} ${obj.last_name}`
        this.email = obj.email
        this.cart = obj.cart
        this.role = obj.role
    }
}