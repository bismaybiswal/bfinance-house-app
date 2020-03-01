import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EventsService } from 'src/app/services/events.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-expense-card',
  templateUrl: './create-expense-card.component.html',
  styleUrls: ['./create-expense-card.component.scss']
})
export class CreateExpenseCardComponent implements OnInit {
  createEventForm: FormGroup;
  constructor(private toastr: ToastrService, private eventsService: EventsService, private formBuilder: FormBuilder,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.createEventForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      estimate: ['', Validators.compose([Validators.required])]
    });
  }

  onCreate() {
    if (this.createEventForm.invalid) {
      this.toastr.error("Please fill the information correctly")
      return;
    }
    let payload = {
      name: this.createEventForm.controls.name.value,
      estimate: this.createEventForm.controls.estimate.value
    }

    this.eventsService.createEvent(payload).subscribe(data => {
      console.log(data);
      this.createEventForm.reset();
      this.router.navigate(['dashboard']);
      this.toastr.success(`${payload.name} event created`);

    }, (error) => {
      this.toastr.error("Something went wrong")
    });

  }

}
