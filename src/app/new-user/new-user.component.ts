import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/User.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {
  userForm: FormGroup;
  drinks: String[] = ['Coca', 'Vin', 'Yoo-hoo'];
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.userForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      drinkPreference: new FormControl(this.drinks, Validators.required)/*,
      hobbies: new FormArray([])*/
    });
  }

  onSubmitForm() {
    const formValue = this.userForm.value;
    const newUser = new User(
      formValue['firstName'],
      formValue['lastName'],
      formValue['email'],
      formValue['drinkPreference'],
      formValue['hobbies'] ? formValue['hobbies'] : []
    );
    /*this.userService.createUser(newUser).subscribe(x => {
      console.log(x);
    })*/
    this.userService.addUser(newUser);
    this.router.navigate(['/users']);
  }

  getHobbies(): FormArray {
    return this.userForm.get('hobbies') as FormArray;
  }

  onAddHobby() {
    const newHobbyControl = new FormControl(null, Validators.required);
    this.getHobbies().push(newHobbyControl);
  }



}
