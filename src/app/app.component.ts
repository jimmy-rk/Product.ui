import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { RouterLinkWithHref } from '@angular/router';
import { Product } from './types/product';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Product';
  displayedColumns: string[] = ['name','price','comments','action'];
  dataSource!: MatTableDataSource<Product>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private dialog : MatDialog,
    private api : ApiService
    ){}
  ngOnInit(): void {
    this.getProducts();
  }

  openDialog(): void {
    this.dialog.open(DialogComponent, {
      width: '30%',
    }).afterClosed().subscribe(val => {
      if(val === 'save') this.getProducts();
    });
  }

  public getProducts(): void {
    this.api.getProducts()
            .subscribe({
              next: (res) => {
                this.dataSource = new MatTableDataSource(res.data);
                this.dataSource.paginator = this.paginator;
              },
              error: () => alert('Error Retreiving Products')
            });
  }

  editProduct(element: any): void {
    this.dialog.open(DialogComponent,{
      width: '30%',
      data : element
    }).afterClosed().subscribe(val => {
      if(val === 'update') this.getProducts()
    });
  }
}
