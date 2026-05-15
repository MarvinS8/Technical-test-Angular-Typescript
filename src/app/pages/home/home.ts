import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent {
  // Algunas estadísticas para mostrar en la home
  stats = [
    { label: 'Countries', value: '250+', icon: 'bi-globe' },
    { label: 'Regions', value: '6', icon: 'bi-map' },
    { label: 'Languages', value: '100+', icon: 'bi-translate' }
  ];

  features = [
    {
      title: 'Browse Countries',
      description: 'Explore all the countries around the world with detailed information.',
      icon: '🌍',
      link: '/countries'
    },
    {
      title: 'Interactive Maps',
      description: 'View each country on an interactive map with geolocation data.',
      icon: '🗺️',
      link: '/countries'
    },
    {
      title: 'Contact Us',
      description: 'Get in touch with us using our validated contact form.',
      icon: '✉️',
      link: '/contact'
    }
  ];
}
