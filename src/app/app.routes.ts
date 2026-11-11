import { Routes } from '@angular/router';
import { SearchPageComponent } from './components/search-page-component/search-page-component';
import { CreaturePageComponent } from './components/creature-page-component/creature-page-component';
import { ExplorePageComponent } from './components/explore-page-component/explore-page-component';
import { AboutPageComponent } from './components/about-page-component/about-page-component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'search',
        pathMatch: 'full'
    },
    { path: 'search', component: SearchPageComponent },
    { path: 'creature/:id', component: CreaturePageComponent },
    { path: 'explore', component: ExplorePageComponent},
    { path: 'about', component: AboutPageComponent}
];
