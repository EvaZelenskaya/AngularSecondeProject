import {Component,  OnInit, } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {from} from "rxjs";

interface IPerson {
  name: string,
  age: number
}

interface IPersonExt extends IPerson {
  batya: boolean
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  userForm: FormGroup;
  public taxiList: IPerson[];
    //@ts-ignore
  resultTwo: IPersonExt[];
  // @ts-ignore
  result: IPersonExt[];

  constructor(private fb: FormBuilder) {
    this.taxiList = [
      {name: 'Jim', age: 77},
      {name: 'Jenny', age: 170},
      {name: 'Fanagoria', age: 100},
      {name: 'Julia', age: 54}
    ];
    this.userForm = this.fb.group({name: [], age: []})
  }

  public addItem(): void {
    this.taxiList = [...this.taxiList, this.userForm.value];
    this.resultTwo = [];
    this.result = [];
    from(this.taxiList).subscribe((item) => {
      this.resultTwo.push({...item, batya: item.age > 65})
      if (item.name.length < 4 && item.age > 65) {
        this.result.push({...item, batya: true})
      }
    })
  }

  ngOnInit() {

    this.addItem(); //  cringe

     }
}
