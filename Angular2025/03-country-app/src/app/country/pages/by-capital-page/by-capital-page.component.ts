import { Component, inject, signal } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'country-by-capital-page',
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-capital-page.component.html'
})
export class ByCapitalPageComponent {

  countryService = inject(CountryService)

  isLoading = signal(false)
  isError = signal<null|string>(null)
  countries = signal<Country[]>([])

  onSearch(value: string) {
    if (this.isLoading()) return

    this.isLoading.set(true)
    this.isError.set(null)
    
    this.countryService.searchByCapital(value).subscribe((countries) => {
      this.isLoading.set(false)
      this.countries.set(countries)
    })
  }
}
