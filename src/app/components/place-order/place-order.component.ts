import { Order } from '../../models/order';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlaceOrderService } from '../../services/place-order.service';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css']
})

export class PlaceOrderComponent implements OnInit {

  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  phoneAndEmailNotSet = false;
  orderListOpened = false;

  orderForm: FormGroup;

  constructor(private fb: FormBuilder, private placeOrderService: PlaceOrderService) {
    this.createOrderForm();
   }

  ngOnInit() {
    const availableItems = this.placeOrderService.getAvailableItems();
    this.dropdownList = this.orderItemsToObject(availableItems);
    this.selectedItems = [];
    this.dropdownSettings = {
        text: 'Click here to see whats cooking...',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        classes: 'myclass custom-class'
    };
  }

  orderItemsToObject(availableItems: Array<string>) {
    const dropdownList = [];
    let count = 1;
    for (const item of availableItems) {
      const dropdownListItem = { id: '', itemName: ''};
      dropdownListItem.id = (count++).toString();
      dropdownListItem.itemName = item;
      dropdownList.push(dropdownListItem);
    }
    return dropdownList;
  }

  createOrderForm() {
    this.orderForm = this.fb.group({
      name: ['', Validators.required],
      phone: '',
      email: '',
      orderList: [[], Validators.required]
    }, {validator: this.phoneOrEmail('phone', 'email')});
  }

  submitOrder() {
    const orderObject = new Order();
    orderObject.name = this.orderForm.value.name;
    orderObject.phoneNumber = this.orderForm.value.phone;
    orderObject.email = this.orderForm.value.email;
    orderObject.orderTime = new Date().valueOf().toString();
    orderObject.orderStatus = 'Pending';
    orderObject.orderItems = this.orderItemsToArray(this.orderForm.value.orderList);

    this.placeOrderService.submitOrder(orderObject);
    this.resetOrderForm();
  }

  resetOrderForm() {
    this.orderListOpened = false;
    this.orderForm.reset();
  }

  orderItemsToArray(orderList: any) {
    const orderItemsArray = [];
    for (const item of orderList) {
      orderItemsArray.push(item.itemName);
    }
    return orderItemsArray;
  }

  onOpen() {
    this.orderListOpened = true;
  }

  resetEmail() {
    const formValue = JSON.parse(JSON.stringify(this.orderForm.value));
    formValue.email = '';
    this.orderForm.patchValue(formValue);
  }

  resetPhone() {
    const formValue = JSON.parse(JSON.stringify(this.orderForm.value));
    formValue.phone = '';
    this.orderForm.patchValue(formValue);
  }

  phoneOrEmail(phoneKey: string, emailKey: string) {
    return (group: FormGroup) => {
      const phoneInput = group.controls[phoneKey];
      const emailInput = group.controls[emailKey];
      this.phoneAndEmailNotSet = false;
      if ((phoneInput.value === '') && (emailInput.value === '')) {
        this.phoneAndEmailNotSet = true;
        return null;
      } else if (!((emailInput.value === '') || (emailInput.value === null))) {
        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailInput.value))) {
          return emailInput.setErrors({emailInvalid: true});
        } else {
          return null;
        }
      } else if (!((phoneInput.value === '') || (phoneInput.value === null))) {
          const pattern = new RegExp('([^\d])\d{10}([^\d])');
          if (!(/^\d{10}$/.test(phoneInput.value))) {
              return phoneInput.setErrors({phoneInvalid: true});
          } else {
            return null;
          }
      } else {
        return null;
      }
    };
  }

  isNameValid() {
    return (!this.orderForm.get('name').valid && this.orderForm.get('name').touched);
  }

}
