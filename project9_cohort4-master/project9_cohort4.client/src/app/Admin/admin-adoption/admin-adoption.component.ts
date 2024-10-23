import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';  // Import SweetAlert
import { AnimalService } from '../../Adoptioh/animals.service';  // Adjust the path if necessary

@Component({
  selector: 'app-admin-adoption',
  templateUrl: './admin-adoption.component.html',
  styleUrls: ['./admin-adoption.component.css']  // Corrected styleUrls
})
export class AdminAdoptionComponent implements OnInit {
  allAnimalsArray: any[] = [];  // Array to hold all animals
  errorMessage: string = '';    // For error handling

  constructor(private animalService: AnimalService, private router: Router) { }

  ngOnInit() {
    this.GetAllAnimals();  // Fetch all animals on initialization
  }

  // Fetch all animals
  GetAllAnimals() {
    this.animalService.getAnimals().subscribe({
      next: (animals: any[]) => {
        this.allAnimalsArray = animals;
        console.log(this.allAnimalsArray);  // Log animals to check if the data is fetched
      },
      error: (error) => {
        console.error('Error fetching animals:', error);
        this.errorMessage = 'Could not load animals!';
      }
    });
  }

  // Navigate to edit animal
  editAnimal(id: number): void {
    this.router.navigate(['/dash/EditAnimal', id]);  // Route to edit animal
  }

  // Navigate to create new animal
  createNewAnimal(): void {
    this.router.navigate(['/dash/addAnimal']);  // Navigate to add animal
  }
}
