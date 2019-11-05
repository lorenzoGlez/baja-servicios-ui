import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { filter } from 'minimatch';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {
  public users;
  public rows: Array<any>[][] = [];
  
  
  servicesFiltered: Array<any>[] = [];
  
  _listFilter: String = "'";
  get listFilter(): String{
    return this._listFilter;
  }
  set listFilter(value: String){
      this._listFilter = value;
      this.servicesFiltered = this._listFilter && this._listFilter!="" ? this.performFilter(this._listFilter) : this.users;
      this.propagate(this.servicesFiltered);
  }

  constructor(private userService: UserService) { 

    
  }

  
  ngOnInit() {
    this.getUsuarios();
    
 
  }

  performFilter(filterBy: String){
    filterBy = filterBy.toLocaleLowerCase();
    return  this.users.filter((user: any) => 
      user.name.toLocaleLowerCase().indexOf(filterBy) !== -1
    );
  }

  propagate(users){
    var col: number = 0;
    var  row: number = 0;
    var colUsers: Array<any>[3] = [];
    this.rows = [];
    this.rows[0] = [];

    users.forEach(user => {
      this.rows[row][col] = user;

      if(col == 2){
        row++;
        this.rows[row] = [];
        col = 0;
      }else  col++;
    });
  }

  getUsuarios(){
    this.userService.getUsuarios().subscribe(
      data => { 
        this.users = data; 
        this.listFilter = '';
      },
      err => console.error(err),
      () => console.log ('users loaded')
    )
  }

}
