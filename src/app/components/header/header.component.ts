import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RouterLink, RouterOutlet } from '@angular/router';
import { DateFormatPipe } from '../date-format.pipe';

@Component({
  selector: 'app-header',
  imports: [ RouterOutlet,MatIcon,RouterLink,DateFormatPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  currentDate: string = new Date().toString(); 
}
