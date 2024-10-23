import { Component, OnInit } from '@angular/core';
import { AnimalService } from '../../Adoptioh/animals.service';
import { ShelterService } from '../../Adoptioh/shelter.service';

@Component({
  selector: 'app-animals',
  templateUrl: './animals.component.html',
  styleUrls: ['./animals.component.css']
})
export class AnimalsComponent implements OnInit {

  animals: any[] = []; // قائمة الحيوانات الكاملة
  displayedAnimals: any[] = []; // الحيوانات التي سيتم عرضها بناءً على الصفحة والفلاتر
  shelters: any[] = []; // قائمة الملاجئ
  speciesList: string[] = ['Dog', 'Cat', 'Bird', 'Reptile']; // لائحة الأنواع
  selectedShelter: number | null = null; // ملجأ محدد
  selectedSpecies: string = ''; // النوع المحدد للتصفية
  searchTerm: string = ''; // مصطلح البحث
  selectedBreed: string = ''; // السلالة المحددة
  selectedAge: number = 0; // العمر المحدد
  selectedSort: string = 'default'; // الترتيب
  currentPage: number = 1; // الصفحة الحالية
  pageSize: number = 12; // عدد العناصر في كل صفحة
  totalItems: number = 0; // العدد الإجمالي للعناصر بعد التصفية
  totalPages: number = 0; // عدد الصفحات الكلي

  Math = Math; // للسماح باستخدام Math في HTML

  constructor(private animalService: AnimalService, private shelterService: ShelterService) { }

  // عند التهيئة، يتم جلب البيانات المطلوبة
  ngOnInit(): void {
    this.fetchAnimals();
    this.fetchShelters();
  }

  // جلب البيانات مع استخدام الفلاتر
  fetchAnimals(): void {
    const filters = {
      shelterId: this.selectedShelter !== null ? this.selectedShelter : undefined,
      species: this.selectedSpecies || undefined,
      breed: this.selectedBreed || undefined,
      age: this.selectedAge > 0 ? this.selectedAge : undefined
    };

    this.animalService.getAnimals(filters).subscribe((data: any[]) => {
      this.animals = data; // تخزين جميع الحيوانات
      this.totalItems = this.animals.length; // تحديث العدد الإجمالي للعناصر
      this.totalPages = Math.ceil(this.totalItems / this.pageSize); // حساب عدد الصفحات
      this.updateDisplayedAnimals(); // تحديث الحيوانات المعروضة
    });
  }

  // جلب بيانات الملاجئ
  fetchShelters(): void {
    this.shelterService.getShelters().subscribe((data: any[]) => {
      this.shelters = data;
    });
  }

  // تحديث قائمة الحيوانات المعروضة بناءً على الفلاتر
  updateDisplayedAnimals(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = this.currentPage * this.pageSize;

    let filteredAnimals = [...this.animals];

    // تصفية حسب النوع
    if (this.selectedSpecies) {
      filteredAnimals = filteredAnimals.filter(animal => animal.species === this.selectedSpecies);
    }

    // تصفية حسب البحث
    if (this.searchTerm.trim()) {
      filteredAnimals = filteredAnimals.filter(animal =>
        animal.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    this.totalItems = filteredAnimals.length; // تحديث العدد بعد الفلاتر
    this.totalPages = Math.ceil(this.totalItems / this.pageSize); // إعادة حساب عدد الصفحات

    this.displayedAnimals = filteredAnimals.slice(start, end); // تحديد الحيوانات التي سيتم عرضها في الصفحة الحالية
  }

  // التنقل بين الصفحات
  setPage(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateDisplayedAnimals();
    }
  }

  // الصفحة السابقة
  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedAnimals();
    }
  }

  // الصفحة التالية
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayedAnimals();
    }
  }

  // قائمة الصفحات
  paginationRange(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  // الترتيب
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

  // تطبيق الفلاتر
  applyFilters(): void {
    this.currentPage = 1;
    this.fetchAnimals();
  }

  // البحث
  onSearchChange(searchTerm: string): void {
    this.searchTerm = searchTerm.trim();
    this.applyFilters();
  }

  // التصفية حسب النوع
  onFilterChanged(species: string): void {
    this.selectedSpecies = species;
    this.applyFilters();
  }
  // داخل AnimalsComponent
// ...

// دالة جديدة للبحث عند إرسال النموذج
onSearchSubmit(event: Event): void {
  event.preventDefault(); // منع إعادة تحميل الصفحة
  this.applyFilters(); // تطبيق الفلاتر باستخدام مصطلح البحث الحالي
}


}
