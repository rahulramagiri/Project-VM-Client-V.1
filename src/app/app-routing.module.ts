import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CreateAssetComponent } from './components/create-asset/create-asset.component';
import { AssetsComponent } from './components/assets/assets.component';
import { HistoryComponent } from './components/history/history.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'create-asset', component: CreateAssetComponent },
  { path: 'edit/:assetId', component: CreateAssetComponent },
  { path: 'assets', component: AssetsComponent },
  { path: 'history', component: HistoryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
