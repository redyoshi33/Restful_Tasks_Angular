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
  	task = {};

    constructor(private _httpService: HttpService){}
    ngOnInit(){
      
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
  			})
    	}
    	else{
    		console.log("Error")
    	}
    }
}
