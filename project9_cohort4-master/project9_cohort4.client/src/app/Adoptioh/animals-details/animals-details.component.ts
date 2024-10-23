import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimalService } from '../../Adoptioh/animals.service';
import { BUrlServicesService } from '../../Batoul/burl-services.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-animals-details',
  templateUrl: './animals-details.component.html',
  styleUrls: ['./animals-details.component.css']
})
export class AnimalsDetailsComponent implements OnInit {
  animal: any;
  relatedAnimals: any[] = [];

  constructor(
    private animalService: AnimalService,
    private route: ActivatedRoute,
    private authService: BUrlServicesService,
    private router: Router // Inject Router to navigate users
  ) { }

  ngOnInit(): void {
    this.fetchAnimalDetails();
  }

  fetchAnimalDetails(): void {
    const animalId = Number(this.route.snapshot.paramMap.get('id'));
    if (!isNaN(animalId)) {
      this.animalService.getAnimalById(animalId).subscribe((data: any) => {
        this.animal = data;
        this.fetchRelatedAnimals(this.animal.shelterId, this.animal.species);
      });
    }
  }

  fetchRelatedAnimals(shelterId: number, species: string): void {
    this.animalService.getRelatedAnimals(shelterId, species).subscribe((data: any[]) => {
      this.relatedAnimals = data;
    });
  }

  adoptNow(): void {
    this.authService.isLoggedInObs.subscribe(isLoggedIn => {
      if (isLoggedIn) {
        // User is logged in, navigate to the adoption form
        this.router.navigate(['/animals-form', this.animal.animalId]);
      } else {
        // User is not logged in, redirect to login page with alert
        Swal.fire({
          title: 'Login Required',
          text: 'You have to log in first to adopt an animal.',
          icon: 'warning',
          confirmButtonText: 'Okay'
        }).then(() => {
          this.router.navigate(['/login']); // Navigate to the login page
        });
      }
    });
  }
}
