import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Country } from 'src/app/common/country';
import { Luv2ShopFormService } from 'src/app/services/luv2-shop-form.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup!: FormGroup;
  creditCardMonths: number [] = [];
  creditCardYears: number [] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;

  countries: Country[] = [];
  constructor(private formBuilder: FormBuilder, private luv2ShopService: Luv2ShopFormService) { }

  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName:[""],
        lastName:[""],
        email:[""]
      }),
      shippingAddress: this.formBuilder.group({
        street:[""],
        city:[""],
        state:[""],
        country:[""],
        zipCode:[""]
      }),
      billingAddress: this.formBuilder.group({
        street:[""],
        city:[""],
        state:[""],
        country:[""],
        zipCode:[""]
      }),
      creditCard: this.formBuilder.group({
        cardType:[""],
        nameOnCard:[""],
        cardNumber:[""],
        security:[""],
        expirationMonth:[""],
        expirationYear:[""]
      }),
      
    })

    // populate properties

    const startMonth:number = new Date().getMonth() + 1;

    this.luv2ShopService.getCreditCardMonths(startMonth).subscribe(
      data => this.creditCardMonths = data
    );

    this.luv2ShopService.getCreditCardYears().subscribe(
      data => this.creditCardYears = data
    );

    // populate countries
    
    this.luv2ShopService.getCountries().subscribe(
      data => this.countries = data
    )
    console.log(this.countries);
   
  }

  onSubmit(){
    console.log(this.checkoutFormGroup.get("customer")?.value);
  }

  copyShippingToBillindAddress(event:any){

    if(event.target.checked){
      this.checkoutFormGroup.controls.billingAddress
        .setValue(this.checkoutFormGroup.controls.shippingAddress.value);
    }else{
      this.checkoutFormGroup.controls.billingAddress.reset();
    }
  }

  handleMonthsAndYears(){
    const creditCardFormGroup = this.checkoutFormGroup.get("creditCard");

    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(creditCardFormGroup?.value.expirationYear);
    let startMonth:number = 0;
    if(currentYear == selectedYear){
      startMonth = +new Date().getMonth() + 1;
    }else{
      
      startMonth = 1;
    }

    this.luv2ShopService.getCreditCardMonths(startMonth).subscribe(
      data => this.creditCardMonths = data
    );

  }

}
