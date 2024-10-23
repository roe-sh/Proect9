import { Component, OnInit } from '@angular/core';
import { AdoptionService } from '../../Adoptioh/adoption.service';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-animal-form',
  templateUrl: './animal-form.component.html',
  styleUrls: ['./animal-form.component.css']
})
export class AnimalFormComponent implements OnInit {

  adoptionDetails = {
    userId: 1, // This will depend on the logged-in user
    animalId: null as number | null,
    userMedicalStatus: '', // Make sure this property exists in your DTO
    housingType: 'Apartment',
    userFinancialStatus: '', // Update according to your DTO
    userFlatType: '', // Update according to your DTO
    userLivingStatus: '', // Update according to your DTO
    userMoreDetails: '' // Update according to your DTO
  };

  constructor(private adoptionService: AdoptionService) { }

  ngOnInit(): void {
    // Any necessary initialization can go here
  }

  submitAdoptionForm(form: NgForm): void {
    if (form.valid) {
      this.adoptionService.submitAdoptionRequest(this.adoptionDetails).subscribe(
        response => {
          console.log('Adoption request submitted successfully:', response);
          Swal.fire({
            title: 'Thank U For Choosing Me:3',
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
