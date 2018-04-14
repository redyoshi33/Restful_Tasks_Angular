import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(private _http: HttpClient) { 
  	this.oneTask("5ace7e7e00364904f5b8663e");
  	this.removeTask("5ace84dabcd25c0566f07454");
  }
  getTasks(){
    return this._http.get('/task')
    }
  oneTask(id){
  	return this._http.get('/task/'+id);
  }
  removeTask(id){
  	return this._http.get('/task/remove/'+id);
  }
  addTask(newtask){
    return this._http.post('/task/new', newtask)
  }
  editTask(id, editTask){
    return this._http.post('/task/update/'+id, editTask)
  }
}
