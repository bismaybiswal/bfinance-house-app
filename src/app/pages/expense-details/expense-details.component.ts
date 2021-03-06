import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { EventsService } from 'src/app/services/events.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-expense-details',
  templateUrl: './expense-details.component.html',
  styleUrls: ['./expense-details.component.scss']
})
export class ExpenseDetailsComponent implements OnInit {

  createTransactionForm: FormGroup;
  editEventForm: FormGroup;
  payload: any;
  eventId: any;
  expenseType: any = 'EXPENSE';
  expenseTypeState = 'primary';
  categoryState = true;
  showTransactions = 5;

  categoryList = [{
    name: "CEMENT"
  }, {
    name: "ROD"
  }, {
    name: "METAL"
  }, {
    name: "BRICKS"
  }, {
    name: "WORKER"
  }, {
    name: "SAND"
  }, {
    name: "OTHERS"
  }
  ];


  constructor(private router: Router,private toastr: ToastrService, private formBuilder: FormBuilder, private route: ActivatedRoute, private modalService: NgbModal, private eventService: EventsService) { }

  ngOnInit() {
    this.eventId = this.route.snapshot.params.eventId;
    this.getEventDetails(this.eventId);
    this.createForm();
    this.expenseType = "EXPENSE";
    this.categoryState = true;
    this.expenseTypeState = "primary";
    this.showEditEventForm();
  }


  showMoreTransactions() {
    this.showTransactions += 5
  }

  showLessTransactions() {
    this.showTransactions = 5
  }

  showEditEventForm() {
    this.editEventForm = this.formBuilder.group({
      estimate: ['', Validators.compose([Validators.required])],
      name: ['', Validators.compose([Validators.required])]
    });
  }


  createForm() {
    this.createTransactionForm = this.formBuilder.group({
      amount: ['', Validators.compose([Validators.required])],
      desc: ['', Validators.compose([Validators.required])],
      transactionDate: ['', Validators.compose([Validators.required])],
      category: ['OTHERS']
    });
  }

  updateEvent(){
    if(this.editEventForm.invalid){
      this.toastr.error("Please fill the information correctly");
      return;
    }
    let payload = {
      name: this.editEventForm.controls.name.value,
      estimate:  this.editEventForm.controls.estimate.value
    }

    this.eventService.updateEvent(this.eventId, payload).subscribe(data => {
      this.getEventDetails(this.eventId);
      this.toastr.success("Event updated");
      this.editEventForm.reset();
      this.modalService.dismissAll();
    }, err =>{
      console.log(err);
      this.toastr.error("something went wrong")
    })
  }

  createTransaction() {
    if (this.expenseType != 'BUDGET' && this.createTransactionForm.invalid) {
      this.toastr.error("Please fill the information correctly")
      return;
    }

    let payload = {
      eventId: this.eventId,
      type: this.expenseType,
      desc: this.createTransactionForm.controls.desc.value,
      amount: this.createTransactionForm.controls.amount.value,
      transactionDate: this.formatDate(this.createTransactionForm.controls.transactionDate.value)
    }
    if (this.expenseType === 'BUDGET') {
      alert("working")
      if (payload.desc === "" || payload.amount === '' || payload.transactionDate === '') {
        this.toastr.error("Please fill the information correctly");
        return;
      }
      payload['category'] = '';
    } else {
      payload['category'] = this.createTransactionForm.controls.category.value;
    }

    this.eventService.createTransaction(payload).subscribe(data => {
      this.createTransactionForm.reset();
      this.modalService.dismissAll();
      this.getEventDetails(this.eventId);
      this.toastr.success(`Transaction created`);

    }, error => {
      console.log(error);
      this.toastr.error("Something went wrong")
    })
  }

  formatDate(dateObject) {
    if (dateObject != undefined && dateObject != '' && dateObject != null) {
      let day = dateObject.day;
      let month = dateObject.month;
      let year = dateObject.year;
      return day + "-" + month + "-" + year;
    } else {
      return "";
    }

  }

  fillEditEventForm(){
    this.editEventForm.controls.name.setValue(this.payload.eventDetails.name);
    this.editEventForm.controls.estimate.setValue(this.payload.eventDetails.estimate);
  }

  getEventDetails(eventId) {
    let eventDetails;
    let transactionDetails :any = [];
    this.eventService.getEventDetails(eventId).subscribe(data => {
      eventDetails = data;
      this.eventService.getTransactionsByEventId(eventId).subscribe(data => {
        transactionDetails = data;
        transactionDetails = this.formatTransactionDate(transactionDetails);
        let supplementaryData = this.formSupplementaryData(eventDetails, transactionDetails);
        this.payload = {
          eventDetails: eventDetails,
          transactions: transactionDetails.reverse(),
          supplementaryData: supplementaryData
        };
        console.log(this.payload)
      }, error => {
        console.log(error);
      });
    }, error => {
      console.log(error);
    });
  }

  formatTransactionDate(transactionDetails: any): any {
    const MONTH = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    if (transactionDetails.length > 0) {
      transactionDetails.forEach(t => {
        //formating
        let dateStr = t.transactionDate;
        let day = dateStr.split("-")[0];
        let month = MONTH[parseInt(dateStr.split("-")[1]) - 1];
        let year = dateStr.split("-")[2];
        let formattedDate = day + " " + month + " " + year;
        t['transactionDate'] = formattedDate;
      })
    }
    return transactionDetails;

  }

  formSupplementaryData(eventDetails, transactionDetails) {
    let supplementaryData = {
      availableBalance: '',
      totalBudget: '',
      paymentRequired: true,
      totalExpenses: '',
      expensePercentage: ''
    };
    let totalBudget = 0;
    let totalExpenses = 0;
    let availabaleBalance = 0;
    let paymentRequired = true;
    let expensePercentage = 0;
    if (transactionDetails.length > 0) {
      transactionDetails.forEach(t => {
        if (t.type === 'BUDGET') {
          totalBudget += parseInt(t.amount);
        }
        if (t.type === 'EXPENSE') {
          totalExpenses += parseInt(t.amount);
        }
      });
      availabaleBalance = totalBudget - totalExpenses;
      if (availabaleBalance > 10000) {
        paymentRequired = false;
      }
      expensePercentage = Math.round((totalExpenses / parseInt(eventDetails.estimate)) * 100);

      supplementaryData.availableBalance = availabaleBalance.toString();
      supplementaryData.totalBudget = totalBudget.toString();
      supplementaryData.totalExpenses = totalExpenses.toString();
      supplementaryData.expensePercentage = expensePercentage.toString();
      supplementaryData.paymentRequired = paymentRequired
    } else {
      supplementaryData.availableBalance = '0.00';
      supplementaryData.totalBudget = '0.00';
      supplementaryData.totalExpenses = '0.00';
      supplementaryData.expensePercentage = '0';
    }
    return supplementaryData;
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      //   this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openEditEventForm(content) {
    this.fillEditEventForm();
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      //   this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }

  changeExpenseType(event) {
    let flag = event.target.checked;
    if (flag) {
      this.expenseType = "BUDGET"
      this.categoryState = false;
      this.expenseTypeState = "success";
    } else {
      this.expenseType = "EXPENSE";
      this.categoryState = true;
      this.expenseTypeState = "primary";
    }
  }

  deleteEvent() {
    if (confirm("Are you sure to delete this event?")) {
      this.eventService.deleteEvent(this.eventId).subscribe(data => {
        this.toastr.success("Event deleted")
        this.router.navigate(['dashboard']);
      }, error => {
        console.log(error);
        this.toastr.error("Something went wrong")
      });
    }
  }

  deleteTransaction(transactionId) {
    if (confirm("Are you sure to delete this transaction?")) {
      this.eventService.deleteTransaction(transactionId).subscribe(data => {
        this.getEventDetails(this.eventId);
        this.toastr.success("Transaction deleted")
      }, error => {
        console.log(error);
        this.toastr.error("Something went wrong")
      });
    }
  }
}
