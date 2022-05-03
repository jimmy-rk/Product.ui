import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';
import { Product } from '../types/product';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  productGroupList : string[] = ['PHO', 'COM', 'TV'];
  productForm !: FormGroup
  actionBtn: string = 'Save';

  constructor(
    private formBuilder: FormBuilder,
    private api : ApiService,
    private dialogRef : MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any
    ) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name : ['',Validators.required],
      productGroupNk : ['',Validators.required],
      price : ['',Validators.required],
      comments : ['']
    })

    if(this.editData){
      this.actionBtn = 'Update';
      this.productForm.controls['name'].setValue(this.editData.name);
      this.productForm.controls['productGroupNk'].setValue(this.editData.productGroupNk);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['comments'].setValue(this.editData.comments);
    }


    
  }

  saveProduct(): void {
    if(this.editData){
      this.updateProduct();
    }
    else{
      this.addProduct();
    }
     
  }

  addProduct(): void {
    if(this.productForm.valid){
      this.api.postProduct(this.productForm.value)
              .subscribe({
                next: () => {
                  alert('Product successfully Saved');
                  this.productForm.reset();
                  this.dialogRef.close('save');
                },
                error: () => alert ('Error saving Product')
              });
    }
  }

  updateProduct(): void {
    let product = new Product();
    product.guid = this.editData.guid;
    product.name = this.productForm.controls['name'].value;
    product.productGroupNk = this.productForm.controls['productGroupNk'].value;
    product.price = this.productForm.controls['price'].value;
    product.comments = this.productForm.controls['comments'].value;

    this.api.putProduct(product)
              .subscribe({
                next: () => {
                  alert('Product successfully Saved');
                  this.productForm.reset();
                  this.dialogRef.close('update');
                },
                error: () => alert ('Error saving Product')
              });
  }

}
