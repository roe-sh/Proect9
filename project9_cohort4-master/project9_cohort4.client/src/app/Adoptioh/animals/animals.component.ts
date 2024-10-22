import { Component, OnInit } from '@angular/core';
import { AnimalService } from '../../Adoptioh/animals.service';
import { ShelterService } from '../../Adoptioh/shelter.service';

@Component({
  selector: 'app-animals',
  templateUrl: './animals.component.html',
  styleUrls: ['./animals.component.css']
})
export class AnimalsComponent implements OnInit {

  animals: any[] = [];
  displayedAnimals: any[] = [];
  shelters: any[] = [];
  speciesList: string[] = ['Dog', 'Cat', 'Bird', 'Reptile'];
  selectedShelter: number | null = null;
  selectedSpecies: string = '';
  selectedBreed: string = '';
  selectedAge: number = 0;
  selectedSort: string = 'default';
  currentPage: number = 1;
  pageSize: number = 12;
  totalItems: number = 0;
  totalPages: number = 0;

  // Add Math as a class property so it can be used in the template
  Math = Math;

  constructor(private animalService: AnimalService, private shelterService: ShelterService) { }

  ngOnInit(): void {
    this.fetchAnimals();
    this.fetchShelters();
  }

  fetchAnimals(): void {
    const filters = {
      shelterId: this.selectedShelter !== null ? this.selectedShelter : undefined,
      species: this.selectedSpecies || undefined,
      breed: this.selectedBreed || undefined,
      age: this.selectedAge > 0 ? this.selectedAge : undefined
    };

    this.animalService.getAnimals(filters).subscribe((data: any[]) => {
      this.animals = data;
      this.totalItems = this.animals.length;
      this.totalPages = Math.ceil(this.totalItems / this.pageSize);
      this.updateDisplayedAnimals();
    });
  }

  fetchShelters(): void {
    this.shelterService.getShelters().subscribe((data: any[]) => {
      this.shelters = data;
    });
  }

  updateDisplayedAnimals(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = this.currentPage * this.pageSize;
    this.displayedAnimals = this.animals.slice(start, end);
  }

  setPage(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateDisplayedAnimals();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedAnimals();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayedAnimals();
    }
  }

  paginationRange(): number[] {
    const range: number[] = [];
    for (let i = 1; i <= this.totalPages; i++) {
      range.push(i);
    }
    return range;
  }

  sortAnimals(): void {
    switch (this.selectedSort) {
      case 'newest':
        this.animals.sort((a, b) => new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime());
        break;
      case 'oldest':
        this.animals.sort((a, b) => new Date(a.createdAt || '').getTime() - new Date(b.createdAt || '').getTime());
        break;
      case 'high-low':
        this.animals.sort((a, b) => (b.age ?? 0) - (a.age ?? 0));
        break;
      case 'low-high':
        this.animals.sort((a, b) => (a.age ?? 0) - (b.age ?? 0));
        break;
      default:
        break;
    }
    this.updateDisplayedAnimals();
  }

  applyFilters(): void {
    this.fetchAnimals();
  }
}
