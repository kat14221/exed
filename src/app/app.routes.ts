import { Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component'; 
import { ClienteComponent } from './componentes/cliente/cliente.component';
import { CarritoComponent } from './componentes/carrito/carrito.component';
import { FacturaComponent } from './componentes/factura/factura.component';


export const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent,
        title: 'Home'
    },
    {
        path: 'cliente',
        component: ClienteComponent,
        title: 'Cliente'
    },
    {
        path: 'carrito',
        component: CarritoComponent,
        title: 'Carrito'
    },
    {
        path: 'factura',
        component: FacturaComponent,
        title: 'Factura'
    },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: '/home'
    }
];
