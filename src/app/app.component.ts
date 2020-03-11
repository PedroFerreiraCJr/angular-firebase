import { Component, OnInit } from '@angular/core';

import { SimpleService } from './app.simple.service';
import { map } from 'rxjs/operators';
import { Task } from './task.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  values: any[] = []
  description: string

  constructor(private service: SimpleService) {}

  ngOnInit() {
    this.load()
  }

  insert() {
    this.service.insert(new Task(this.description, new Date().getTime()))
    this.description = undefined
  }

  load() {
    this.service.getAll().subscribe((value: any) => {
 	this.values = []
	value.map((i: any) => {
	    this.values.push({key: i.key, value: {description: i.payload.val().description, date: i.payload.val().date}})
	})
    })
  }
}
