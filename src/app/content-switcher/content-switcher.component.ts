// src/app/content-switcher/content-switcher.component.ts
import { Component, Input, OnInit , HostListener, Renderer2} from '@angular/core';
import { trigger, state, style, transition, animate, group } from '@angular/animations';


@Component({
  selector: 'app-content-switcher',
  templateUrl: './content-switcher.component.html',
  styleUrls: ['./content-switcher.component.css'],
  // animations: [
  //   trigger('slideAnimation', [
  //     // State for when a slide is active (fully visible)
  //     state('active', style({ 
  //       transform: 'translate(0, 0)', 
  //       opacity: 1,
  //       zIndex: 1
  //     })),

  //     // --- NEXT Transition (Top-Left Corner Effect) ---
  //     transition('* => next', [
  //       group([
  //         // Current slide LEAVING (pull to bottom-left)
  //         style({ zIndex: 2 }), // Ensure it's on top initially
  //         animate('0.6s ease-out', style({ 
  //           transform: 'translate(-100%, 100%)', // Move to bottom-left corner
  //           opacity: 0.2 // Fade out a bit
  //         })),
  //       ]),
  //       group([
  //         // New slide ENTERING (from top-left corner)
  //         style({ 
  //           transform: 'translate(100%, -100%)', // Start from top-right corner (off-screen)
  //           opacity: 0,
  //           zIndex: 3 // Ensure it appears on top
  //         }),
  //         animate('0.6s ease-out', style({ 
  //           transform: 'translate(0, 0)', // Move to center
  //           opacity: 1 
  //         }))
  //       ])
  //     ]),

  //     // --- PREVIOUS Transition (Bottom-Right Corner Effect) ---
  //     transition('* => prev', [
  //       group([
  //         // Current slide LEAVING (pull to top-right)
  //         style({ zIndex: 2 }),
  //         animate('0.6s ease-out', style({ 
  //           transform: 'translate(100%, -100%)', // Move to top-right corner
  //           opacity: 0.2
  //         })),
  //       ]),
  //       group([
  //         // New slide ENTERING (from bottom-right corner)
  //         style({ 
  //           transform: 'translate(-100%, 100%)', // Start from bottom-left corner (off-screen)
  //           opacity: 0,
  //           zIndex: 3 
  //         }),
  //         animate('0.6s ease-out', style({ 
  //           transform: 'translate(0, 0)', // Move to center
  //           opacity: 1 
  //         }))
  //       ])
  //     ])
  //   ])
  // ]


//  animations: [
//     trigger('slideAnimation', [
      
//       // 1. Entering Animation (New slide coming in)
//       // We use the `value` parameter here for the dynamic start style
//       transition(':enter', [
        
//         // **FIXED:** We use the style with PARAMETERS
//         style({ 
//           // Default values for the parameters are defined below (e.g., '100%')
//           transform: 'translate({{ startX }}, {{ startY }})', 
//           opacity: 0,
//           zIndex: 3 
//         }),
        
//         // Animate to the final (center) position
//         animate('600ms ease-out', style({ 
//           transform: 'translate(0, 0)', 
//           opacity: 1 
//         }))
//       ], { 
//           // Default Parameters for :enter
//           params: { startX: '100%', startY: '-100%' } 
//       }), 

      
//       // 2. Leaving Animation (Old slide going out)
//       // We use the `value` parameter here for the dynamic end style
//       transition(':leave', [
        
//         // Animate from the current (center) position to the final (exit) position
//         animate('600ms ease-out', style({ 
//           // **FIXED:** We use the style with PARAMETERS
//           transform: 'translate({{ endX }}, {{ endY }})', 
//           opacity: 0.2 
//         }))
//       ], { 
//           // Default Parameters for :leave
//           params: { endX: '-100%', endY: '100%' } 
//       }) 
//     ])
//   ]


// src/app/content-switcher/content-switcher.component.ts
// ... (Component decorator)
  // animations: [
  //   trigger('slideAnimation', [
      
  //     // 1. Entering Animation (:enter)
  //     transition(':enter', [
        
  //       // Use the parameter placeholders
  //       style({ 
  //         transform: 'translate({{ startX }}, {{ startY }})', 
  //         opacity: 0,
  //         zIndex: 3 
  //       }),
        
  //       animate('600ms ease-out', style({ 
  //         transform: 'translate(0, 0)', 
  //         opacity: 1 
  //       }))
  //     ], { 
  //         // Default Parameters for :enter (only used if no params are passed)
  //         params: { startX: '100%', startY: '-100%' } 
  //     }), 

      
  //     // 2. Leaving Animation (:leave)
  //     transition(':leave', [
        
  //       animate('600ms ease-out', style({ 
  //         // Use the parameter placeholders
  //         transform: 'translate({{ endX }}, {{ endY }})', 
  //         opacity: 0.2 
  //       }))
  //     ], { 
  //         // Default Parameters for :leave
  //         params: { endX: '-100%', endY: '100%' } 
  //     }) 
  //   ])
  // ]
// ...


})
export class ContentSwitcherComponent implements OnInit {

 index = 0;
  movies: any[] = [];
  transform: string[] = [];
  zIndex: string[] = [];

  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    // ✅ Hardcoded movie data (poster URL अपने हिसाब से बदल सकते हो)
    this.movies = [
      { Title: 'Inception', Year: '2010', Poster: 'assets/carousel/main-backround.jpg' },
      { Title: 'Interstellar', Year: '2014', Poster: 'assets/carousel/main-backround.jpg' },
      { Title: 'The Dark Knight', Year: '2008', Poster: 'assets/carousel/main-backround.jpg' },
      { Title: 'Avatar', Year: '2009', Poster: 'assets/carousel/main-backround.jpg' },
      { Title: 'Titanic', Year: '1997', Poster: 'assets/carousel/main-backround.jpg' }
    ];

    this.loadData();
    this.mapStars();
  }

  loadData() {
    const container = document.getElementById('slideContainer') as HTMLElement;
    this.movies.forEach((movie, i) => {
      this.transform.push(`translate3d(${i * 150}px, 0px, -${i * 1000}px)`);
      this.zIndex.push(`-${i}`);

      const slide = this.renderer.createElement('div');
      const item = this.renderer.createElement('div');
      const text = this.renderer.createElement('div');
      const image = this.renderer.createElement('img');
      const title = this.renderer.createElement('h1');
      const year = this.renderer.createElement('h2');

      this.renderer.addClass(slide, 'slide');
      this.renderer.addClass(item, 'item');
      this.renderer.addClass(image, 'img');
      this.renderer.addClass(text, 'text');
      this.renderer.addClass(title, 'title');
      this.renderer.addClass(year, 'year');

      image.src = movie.Poster;
      image.alt = movie.Title;

      title.innerText = movie.Title;
      year.innerText = movie.Year;

      this.renderer.appendChild(text, title);
      this.renderer.appendChild(text, year);
      this.renderer.appendChild(item, image);
      this.renderer.appendChild(item, text);
      this.renderer.appendChild(slide, item);
      this.renderer.appendChild(container, slide);
    });

    this.showSlide(this.index);
  }

  onChange(toIndex: number) {
    if (toIndex === 1) {
      this.transform.unshift(this.transform[this.transform.length - 1]);
      this.transform.pop();
      this.zIndex.unshift(this.zIndex[this.zIndex.length - 1]);
      this.zIndex.pop();
    } else {
      this.transform.push(this.transform[0]);
      this.transform.shift();
      this.zIndex.push(this.zIndex[0]);
      this.zIndex.shift();
    }
    this.showSlide(this.index += toIndex);
  }

  showSlide(toIndex: number) {
    const slides = document.getElementsByClassName('slide') as HTMLCollectionOf<HTMLElement>;
    const texts = document.getElementsByClassName('text') as HTMLCollectionOf<HTMLElement>;

    if (toIndex >= slides.length) this.index = 0;
    if (toIndex < 0) this.index = slides.length - 1;

    for (let i = 0; i < slides.length; i++) {
      slides[i].style.transform = this.transform[i];
      slides[i].style.zIndex = this.zIndex[i];
      texts[i].style.opacity = this.index === i ? '1' : '0';
    }
  }

  mapStars() {
    const container = document.getElementById('starField') as HTMLElement;
    for (let i = 0; i < window.innerWidth; i++) {
      const star = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      star.setAttribute('cx', (Math.random() * window.innerWidth).toString());
      star.setAttribute('cy', (Math.random() * window.innerHeight).toString());
      star.setAttribute('fill', '#eee');
      star.setAttribute('opacity', Math.random().toString());
      star.setAttribute('r', (Math.random() + 1).toString());
      container.appendChild(star);
    }
  }
}