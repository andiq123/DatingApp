import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  model: any = {};
  constructor(
    private accountService: AccountService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  register() {
    if (this.model.username && this.model.password) {
      this.accountService.register(this.model).subscribe(
        (resp) => {
          console.log(resp);
          this.cancel();
        },
        (error) => {
          if (error.length > 0) {
            for (const err of error) {
              this.toastr.error(err);
            }
          }
        }
      );
    }
  }

  cancel() {
    this.cancelRegister.emit();
  }
}
