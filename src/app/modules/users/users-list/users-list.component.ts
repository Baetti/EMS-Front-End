import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { UserSchema } from '../users.model';
import jspdf from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent implements OnInit {
  allUsers: UserSchema[] = [];
  searchKey: string = '';
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;

  constructor(private api: ApiService) {}

  // when UsersListComponent page is open call getUserlist()
  ngOnInit(): void {
    this.getUserslist();
  }
  //  when users list  page opens,display all users list from json file by making an api call: http://localhost:3000/users/1
  getUserslist() {
    this.api.getallusers().subscribe({
      next: (result: any) => {
        console.log(result);
        this.allUsers = result;
      },
      error: (result: any) => {
        console.log(result);
        alert('error while fetching data...');
      },
    });
  }

  deleteuser(id: any) {
    this.api.deleteuser(id).subscribe({
      next: (res: any) => {
        console.log('deleted successfully');
        this.getUserslist();
      },
      error: (err: any) => {
        console.log(err);
        alert('cannot perform action now... please try after sometime!!!!');
      },
    });
  }

  sortById() {
    this.allUsers.sort((a: any, b: any) => a.id - b.id);
    console.log(this.allUsers);
  }

  sortByName() {
    this.allUsers.sort((a: any, b: any) => a['name'].localeCompare(b['name']));
  }

  // sortByName() {
  //   this.allUsers.sort((a: any, b: any) => {});
  // }

  onTableDataChange(event: any) {
    this.page = event;
  }

  generatePDF() {
    let pdf = new jspdf();
    let head = [['User Id', 'User Name', 'Email', 'Status']];
    let body: any = [];
    this.allUsers.forEach((item: any) => {
      body.push([item.id, item.name, item.email, item.active]);
    });
    pdf.setFontSize(16);
    pdf.text('All Employee List', 10, 10);
    autoTable(pdf, { head, body });
    pdf.output('dataurlnewwindow');
    pdf.save('allUsers.pdf');
  }
}
