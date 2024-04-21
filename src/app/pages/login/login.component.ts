import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { PopupLoadingComponent } from 'src/app/shared/popup-loading/popup-loading.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  dark: boolean;
  checked: boolean;
  forms: FormGroup;
  initialForm: any;
  returnUrl: string;
  constructor(
    private fb: FormBuilder,
    private service: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private titleTab: Title,
    public dialog: DialogService,
    private messageService: MessageService
  ) {
    this.titleTab.setTitle('RMI Survey - Login');
    this.forms = this.fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
      db: 'rmi-survey'
    });
    this.initialForm = this.forms.value;
  }
  

  ngOnInit(): void {
    localStorage.removeItem('roleid');
    localStorage.removeItem('menulink');
    this.service.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  onSubmit(){
    if(this.forms.valid){
      const overlay = this.dialog.open(PopupLoadingComponent, {
        data: {
          message: 'Authentication...'
        }
      });
      const postbody: any =  {
        jsonrpc: '2.0',
        params: this.forms.value
      };
      this.service.login(postbody).subscribe(
        (resp: any) => {
          overlay.close(true);
          if (resp.result) {
            this.service.storeLocal(resp.result);
            this.router.navigate([ this.returnUrl ]);
          }
        },(error) => {
          overlay.close(true);
          if (Array.isArray(error.error.error)) {
            for (var i = 0; i < error.error.error.length; i++) {
              this.messageService.add({
                key:'toast-notif',
                severity: 'error', 
                summary: 'Error', 
                detail: error.error.error[i]
              });
            }
          } else {
            this.messageService.add({
              key:'toast-notif',
              severity: 'error', 
              summary: 'Error', 
              detail: error.error, 
            });
          }
        });
    }
  }
  ngOnDestroy(): void {
    this.forms.reset(this.initialForm);
  }
}
