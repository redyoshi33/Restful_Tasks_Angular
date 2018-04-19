import { Component, OnInit} from '@angular/core';
import { HttpService } from './http.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  	title = 'Tasks';
  	tasks = [];
  	task: any;
    newTask: any;
    editTask: any;
    edit = false

    constructor(private _httpService: HttpService){}
    ngOnInit(){
      this.newTask = {title: "", description: ""}
      this.editTask = {title: "", description: ""}
      this.getTasksFromService()
    }
    getTasksFromService(){
      let observable = this._httpService.getTasks();
      observable.subscribe(data => {
      	console.log("Got our tasks!", data)
      	this.tasks = data['data']
      	console.log(this.tasks)
      })
    }
    getTask(id){
    	if(id){
    		let tempObs = this._httpService.oneTask(id);
  			tempObs.subscribe(data => {
  			console.log("Got the task!", data)
  			this.task = data['data'][0]
        this.editTask = {title: this.task.title, description: this.task.description}
        this.edit = true
  			})
    	}
    	else{
    		console.log("Error")
    	}
    }
    removeATask(id){
      let tempObs = this._httpService.removeTask(id)
      tempObs.subscribe(data => console.log("Removed the task!"))
      this.getTasksFromService()
      this.task = {}
    }
    createSubmit(){
      let observable = this._httpService.addTask(this.newTask);
      observable.subscribe(data => {
        console.log("Got data from post back!", data)
      })
      this.getTasksFromService()
      this.newTask = {title: "", description: ""}
    }
    editSubmit(id){
      let observable = this._httpService.editTask(id ,this.editTask);
      observable.subscribe(data => {
        console.log("Got data from post back!", data)
      })
      this.edit = false
      this.getTasksFromService()
    }
}
