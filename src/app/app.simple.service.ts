import { Injectable } from '@angular/core';

import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root'
})
export class SimpleService {
  constructor(private db: AngularFireDatabase) {}

  insert(value: Task) {
    this.db
        .list('tasks')
        .push(value)
        .then((result: any) => { console.log(result.key) })
        .catch((error: any) => { console.log(error) })
  }

  getAll(): Observable<any> {
    return this.db.list('tasks').snapshotChanges()
  }
}
