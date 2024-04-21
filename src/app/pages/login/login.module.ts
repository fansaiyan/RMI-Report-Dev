import { NgModule } from '@angular/core';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { CoreModule } from 'src/app/core/core.module';
import { MessageService } from 'primeng/api';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CoreModule,
    LoginRoutingModule
  ],
  providers:[
    MessageService
  ]
})
export class LoginModule { }
