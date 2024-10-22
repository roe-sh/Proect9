import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    userId:1,
    fullName: '',
    email: '',
    medicalStatus: '',
    housingType: 'Apartment', // Default value
    financialStatus: '',
    additionalDetails: '',
    animalId: null as string | null
  };

  constructor(private route: ActivatedRoute, private adoptionService: AdoptionService) { }

  ngOnInit(): void {
    const animalId = this.route.snapshot.paramMap.get('id');
    this.adoptionDetails.animalId = animalId;
  }

  submitAdoptionForm(form: NgForm): void {
    if (form.valid) {
      this.adoptionService.submitAdoptionRequest(this.adoptionDetails).subscribe(
        response => {
          console.log('Adoption request submitted successfully:', response);
     
        

         
          Swal.fire({
            title: 'Success!',
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
