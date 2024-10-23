import { Component, OnInit } from '@angular/core';
import { UrlServiceService } from '../../batool/services/url-service.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';  // Import SweetAlert
import { AnimalService } from '../../Adoptioh/animals.service';

@Component({
  selector: 'app-admin-adoption',
  templateUrl: './admin-adoption.component.html',
  styleUrls: ['./admin-adoption.component.css']  // Corrected to styleUrls
})
export class AdminAdoptionComponent implements OnInit {
  allAnimalsArray: any[] = [];  // Array to hold all animals

  constructor(private animalService: AnimalService, private router: Router) { }  // Service for API calls and router

  ngOnInit() {
    this.GetAllAnimals();  // Fetch all animals on initialization
  }

  GetAllAnimals() {
    this.animalService.getAnimals().subscribe((animals: any[]) => {  // Corrected method name and added type
      this.allAnimalsArray = animals;
    });
  }

  // Navigate to edit animal
  editAnimal(id: number): void {
    this.router.navigate(['/dash/EditAnimal', id]);  // Route to edit animal
  }
/*
  // Delete animal
  deleteAnimal(id: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.animalService.deleteAnimal(id).subscribe({
          next: () => {
            this.GetAllAnimals();  // Refresh the animal list after deletion
            Swal.fire('Deleted!', 'The animal has been deleted.', 'success');
          },
          error: (error) => {
            console.error('Error deleting animal:', error);
            Swal.fire('Error', 'Failed to delete animal. Please try again.', 'error');
          }
        });
      }
    });
  }
*/
  // Navigate to create new animal
  createNewAnimal(): void {
    this.router.navigate(['/dash/addAnimal']);  // Navigate to add animal
  }
}
