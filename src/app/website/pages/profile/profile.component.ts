import { Component, OnInit } from '@angular/core';

// Servicios
import { AuthService } from '../../../services/auth.service';

// Interfaces
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User | null = null;

  constructor (
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.getProfile()
    .subscribe(data => {
      this.user = data;
    })
  }

}
