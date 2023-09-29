import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, SortDirection } from '@angular/material/sort';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgIf, DatePipe } from '@angular/common';
import { ClientesService, categoria, cliente } from 'src/app/servicios/clientes.service';

@Component({
  selector: 'app-consultar-cliente',
  templateUrl: './consultar-cliente.component.html',
  styleUrls: ['./consultar-cliente.component.css']
})
export class ConsultarClienteComponent implements OnInit {
  isTableEmpty = true;

  displayedColumns: string[] = ['codigo', 'nombre', 'activo'];

  clientesInfo: cliente[] = [];
  categoriasInfo: categoria[] = [];


  // exampleDatabase!: ExampleHttpDatabase | null;
  // data: GithubIssue[] = [];

  resultsLength = 0;
  isLoadingResults = false;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private clientservice: ClientesService, private _httpClient: HttpClient) { }

  ngOnInit(): void {
    this.getDataClient();
    this.getCategorias();
  }

  // ngAfterViewInit() {



  //   this.exampleDatabase = new ExampleHttpDatabase(this._httpClient);

  //   // If the user changes the sort order, reset back to the first page.
  //   this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

  //   merge(this.sort.sortChange, this.paginator.page)
  //     .pipe(
  //       startWith({}),
  //       switchMap(() => {
  //         this.isLoadingResults = true;
  //         return this.exampleDatabase!.getRepoIssues(
  //           this.sort.active,
  //           this.sort.direction,
  //           this.paginator.pageIndex,
  //         ).pipe(catchError(() => observableOf(null)));
  //       }),
  //       map(data => {
  //         // Flip flag to show that loading has finished.
  //         this.isLoadingResults = false;
  //         this.isRateLimitReached = data === null;

  //         if (data === null) {
  //           return [];
  //         }

  //         // Only refresh the result length if there is new data. In case of rate
  //         // limit errors, we do not want to reset the paginator to zero, as that
  //         // would prevent users from re-triggering requests.
  //         this.resultsLength = data.total_count;
  //         return data.items;
  //       }),
  //     )
  //     .subscribe(data => (this.data = data));
  // }

  getDataClient() {
    try {
      this.clientservice.getAllClients().subscribe( (data: any) => {
        this.clientesInfo = data;
        console.log('esta es la info: ' + data);
      })
    } catch (error) {
      console.error('Este es el error: ', error)
    }
  }

  getCategorias(){
    try {

      this.clientservice.getAllCat().subscribe( (data: any) => {
        this.categoriasInfo = data;
        console.log('las categorias son: ', data);
      })
    } catch (error) {
      console.error('Este es el error: ', error)
    }
  }
}

// export interface GithubApi {
//   items: GithubIssue[];
//   total_count: number;
// }

// export interface GithubIssue {
//   created_at: string;
//   number: string;
//   state: string;
//   title: string;
// }

// /** An example database that the data source uses to retrieve data for the table. */
// export class ExampleHttpDatabase {
//   constructor(private _httpClient: HttpClient) { }

//   getRepoIssues(sort: string, order: SortDirection, page: number): Observable<GithubApi> {
//     const href = 'https://api.github.com/search/issues';
//     const requestUrl = `${href}?q=repo:angular/components&sort=${sort}&order=${order}&page=${page + 1
//       }`;

//     return this._httpClient.get<GithubApi>(requestUrl);
//   }
// }
