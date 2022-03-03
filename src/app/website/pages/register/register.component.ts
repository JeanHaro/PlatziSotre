import { Component, OnInit } from '@angular/core';

// Guardian
import { ExitGuard } from '../../../guards/exit.guard'; 

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onExit() {
    const rta = confirm('Logica desde comp, estás seguro salir?');
    return rta;
  }

}
