import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'master',
    loadChildren: () => import('./master/master.module').then(m => m.MasterModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'rmi/report',
    loadChildren: () => import('./report/report.module').then(m => m.ReportModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'smi',
    loadChildren: () => import('./smi/smi.module').then(m => m.SMIModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'rmi',
    loadChildren: () => import('./self-assessment/self-assessment.module').then(m => m.SelfAssessmentModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
