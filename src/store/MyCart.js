import {observable, action, computed, mobx, toJS} from 'mobx';

class MyCart {
    @observable cartList;

    constructor() {
        this.cartList = [];
    }

    addItemToCart(item) {
        console.log(item)
        if (this.contains(item.id)) {
            console.log("item already in cart" + item.id)
            return true
        } else {
            console.log("item added to cart" + item.id)
            this
                .cartList
                .push({name: item})
            return false
        }
    }

    itemCount() {
        return this.cartList.length
    }

    // array = [{key:value},{key:value}]
    objectFindByKey = (value) => {
        var values = toJS(this.cartList);
        console.log("converted to JS array from observable " + values)
        var contains = false;
        values.forEach(element => {
            if (element.name.id === value) {
                contains = true;
            }
        });
        if (contains) {
            return true;
        } else {
            return null;
        }
    }

    contains = (id) => {
        console.log("contains? " + id);
        try {
            if (this.objectFindByKey(id) != null) {
                return true
            } else {
                return false
            }
        } catch (err) {
            return false
            console.log(err.message);
        }
    }
}

var myCart = new MyCart();
export default myCart;