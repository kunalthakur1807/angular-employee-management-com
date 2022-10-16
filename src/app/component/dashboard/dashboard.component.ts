import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/service/employee';
import { AuthService } from 'src/app/shared/auth.service';
import { DataService } from 'src/app/shared/data.service';
import * as bs from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  employeeList: Employee[] = [];
  employeeObj: Employee = {
    id: '',
    age: '',
    first_name: '',
    last_name: '',
    email: '',
    mobile: ''
  };
  id: string = '';
  first_name: string = '';
  last_name: string = '';
  age: string = '';
  email: string = '';
  mobile: string = '';

  constructor(private auth: AuthService, private data: DataService) {  }

  ngOnInit(): void {
    this.getAllemployee();
  }

  // register() {
  //   this.auth.logout();
  // }

  getAllemployee() {
    
    this.data.getAllEmployee().subscribe(res => {

      this.employeeList = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      })

    }, err => {
      alert('Error while fetching employee data');
    })

  }

  resetForm() {
    this.id = '';
    this.first_name = '';
    this.last_name = '';
    this.age = '';
    this.email = '';
    this.mobile = '';
  }

  addemployee() {
    if (this.first_name == '' || this.last_name == '' || this.mobile == '' || this.email == '' || this.age == '') {
      alert('Fill all input fields');
      return;
    }
    this.employeeObj.email = this.email;
    this.employeeObj.age = this.age;
    this.employeeObj.first_name = this.first_name;
    this.employeeObj.last_name = this.last_name;
    this.employeeObj.mobile = this.mobile;
    if (this.id == '') {
      this.data.addEmployee(this.employeeObj);
    }
    else {
      this.employeeObj.id = this.id;
      this.data.editEmployee(this.employeeObj);
    }
    this.resetForm();

  }

  editContactList(emp: Employee) {

    this.email = emp.email;
    this.age = emp.age;
    this.first_name = emp.first_name;
    this.last_name = emp.last_name;
    this.mobile = emp.mobile;
    this.id = emp.id;
  }

  updateemployee() {


  }



  deleteemployee(employee: Employee) {
    if (window.confirm('Are you sure you want to delete ' + employee.first_name + ' ' + employee.last_name + ' ?')) {
      this.data.deleteEmployee(employee)
    }
  }
}