import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { CategoryComponent } from '../category/category.component';
import { ProductService } from 'src/app/services/product.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  onAddProduct = new EventEmitter();
  onEditProduct = new EventEmitter();
  productForm:any=FormGroup;

  dialogAction:any="Add";
  action:any="Add";
  responseMessage:any;
  categorys:any=[];
  constructor(@Inject(MAT_DIALOG_DATA) public dialogData:any,
  private formBuilder:FormBuilder,
  private productService:ProductService,
  public dialogRef:MatDialogRef<ProductComponent>,
  public snackbarService:SnackbarService,
  private categoryService:CategoryService) { }

  ngOnInit(): void {
    this.productForm=this.formBuilder.group({
      name:[null,[Validators.required,Validators.pattern(GlobalConstants.nameRegex)]],
      categoryId:[null,Validators.required],
      price:[null,Validators.required],
      description:[null,Validators.required]

    });

    if(this.dialogData.action === 'Edit'){
      this.dialogAction="Edit";
      this.action="Update";
      this.productForm.patchValue(this.dialogData.data);
    }

    this.getCategorys();
  }

  getCategorys(){
    this.categoryService.getCategory().subscribe((res:any)=>{
      this.categorys = res;
    },(err)=>{
      if (err.error?.message) {
        this.responseMessage = err.error?.message;
      } else {
        this.responseMessage = GlobalConstants.genericError;
      }

      this.snackbarService.openSnackBar(
        this.responseMessage,
        GlobalConstants.error
      );
    })

  }

  handleSubmit(){
    if(this.dialogAction==="Edit"){
      this.editProduct();
    }
    else{
      this.addNewProduct();
    }
  }

  editProduct(){
    var formData = this.productForm.value;
    var data = {
      id:this.dialogData.data.id,
      name:formData.name,
      categoryId:formData.categoryId,
      price:formData.price,
      description:formData.description
    }
    this.productService.updateProduct(data).subscribe((res:any)=>{
      this.dialogRef.close();
      this.onEditProduct.emit();
      this.responseMessage=res.message;
      this.snackbarService.openSnackBar(this.responseMessage,"success");
    },(err)=>{
      this.dialogRef.close();
      if (err.error?.message) {
        this.responseMessage = err.error?.message;
      } else {
        this.responseMessage = GlobalConstants.genericError;
      }

      this.snackbarService.openSnackBar(
        this.responseMessage,
        GlobalConstants.error
      );
    })

  }
  addNewProduct(){
    var formData = this.productForm.value;
    var data = {
      name:formData.name,
      categoryId:formData.categoryId,
      price:formData.price,
      description:formData.description
    }
    this.productService.addProduct(data).subscribe((res:any)=>{
      this.dialogRef.close();
      this.onAddProduct.emit();
      this.responseMessage=res.message;
      this.snackbarService.openSnackBar(this.responseMessage,"success");
    },(err)=>{
      this.dialogRef.close();
      if (err.error?.message) {
        this.responseMessage = err.error?.message;
      } else {
        this.responseMessage = GlobalConstants.genericError;
      }

      this.snackbarService.openSnackBar(
        this.responseMessage,
        GlobalConstants.error
      );
    })

  }

}
