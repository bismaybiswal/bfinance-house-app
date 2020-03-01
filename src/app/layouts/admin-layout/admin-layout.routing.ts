import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { CreateExpenseCardComponent } from '../../pages/create-expense-card/create-expense-card.component';
import { ExpenseDetailsComponent } from '../../pages/expense-details/expense-details.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { AuthGuard } from 'src/app/services/auth/auth.guard';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'expense-card/create', component: CreateExpenseCardComponent, canActivate: [AuthGuard] },
    { path: 'expense-details/:eventId', component: ExpenseDetailsComponent, canActivate: [AuthGuard]},
    { path: 'tables', component: TablesComponent },
    { path: 'icons', component: IconsComponent },
    { path: 'maps', component: MapsComponent }
];
