import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { BottomNav } from '../bottom-nav/bottom-nav';


@Component({
  imports: [RouterOutlet, Header, Footer, BottomNav],
  selector: 'app-layout',
  styleUrl: './app-layout-component.scss',
  templateUrl: './app-layout-component.html',
})
export class AppLayoutComponent {}
