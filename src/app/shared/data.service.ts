import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FileMetaData } from '../service/file-meta-data';
import { Employee } from '../service/employee';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private afs : AngularFirestore, private fireStorage : AngularFireStorage) { }


  // add employee
  addEmployee(employee : Employee) {
    employee.id = this.afs.createId();
    return this.afs.collection('/Employee').add(employee);
  }

  // get all employee
  getAllEmployee() {
    return this.afs.collection('/Employee').snapshotChanges();
  }


  // delete employee
  deleteEmployee(employee : Employee) {
     this.afs.doc('/Employee/'+employee.id).delete();
  }

  

  // update employee
  editEmployee(employee : Employee) {
    this.afs.doc('/Employee/'+employee.id).update(employee);

  }
}
