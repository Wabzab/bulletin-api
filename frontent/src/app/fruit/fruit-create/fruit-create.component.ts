import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-fruit-create',
  templateUrl: './fruit-create.component.html',
  styleUrls: ['./fruit-create.component.css']
})
export class FruitCreateComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }

  onAddFruit(fruitForm: NgForm) {
    if (fruitForm.invalid) {
      alert("Invalid!")
      return
    }
    alert(fruitForm.value.enteredId + ':' + fruitForm.value.enteredName)
  }

}
