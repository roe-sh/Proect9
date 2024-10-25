import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'] // Corrected 'styleUrl' to 'styleUrls'
})
export class AboutComponent {
  teamMembers = [
    {
      name: 'Esraa Odat',
      position: 'Scrum Master',
      image: 'team-1.png', 
      description: 'An experienced Developer who loves helping others.'
    },
    {
      name: 'Batool Khazali',
      position: 'Product Owner',
      image: 'team-2.png',
      description: 'A passionate Developer who ensures Website look it best.'
    },
    {
      name: 'Rahaf AL-Shorman',
      position: 'Web Developer',
      image: 'team-3.png',
      description: 'Specializes in pet website developing.'
    }
  ];
}
