import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AdoptionService } from '../../Adoptioh/adoption.service';
import { BUrlServicesService } from '../../Batoul/burl-services.service'; // Add this import
import Swal from 'sweetalert2';

@Component({
  selector: 'app-animal-form',
  templateUrl: './animal-form.component.html',
  styleUrls: ['./animal-form.component.css']
})
export class AnimalFormComponent implements OnInit {
  adoptionDetails = {
    userId: null as number | null,  // Initialize with the logged-in user's ID later
    animalId: null as number | null,
    userMedicalStatus: '',
    housingType: 'Apartment',
    userFinancialStatus: '',
    userFlatType: '',
    userLivingStatus: '',
    userMoreDetails: ''
  };

  constructor(private adoptionService: AdoptionService, private authService: BUrlServicesService) { }

  ngOnInit(): void {
    // Assuming you set the userId from the logged-in user data
    this.adoptionDetails.userId = this.authService.userId.value; // Fetch logged-in user ID from service
  }

  submitAdoptionForm(form: NgForm): void {
    if (form.valid) {
      this.adoptionService.submitAdoptionRequest(this.adoptionDetails).subscribe(
        response => {
          console.log('Adoption request submitted successfully:', response);
          Swal.fire({
            title: 'Thank You for Choosing Me!',
            text: 'Your adoption request has been submitted successfully!',
            icon: 'success',
            confirmButtonText: 'Okay'
          });
          form.reset();
          this.adoptionDetails.animalId = null;
        },
        error => {
          console.error('Error submitting adoption request:', error);
          Swal.fire({
            title: 'Error!',
            text: 'There was an error submitting your request. Please try again.',
            icon: 'error',
            confirmButtonText: 'Okay'
          });
        }
      );
    }
  }
}
