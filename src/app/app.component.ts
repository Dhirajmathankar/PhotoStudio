import { Component, AfterViewInit, OnDestroy, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnDestroy {
  title = 'photoShop';
  // A property to hold our observer so we can clean it up later
  private observer: IntersectionObserver | undefined;
  
  // We inject ElementRef to get a reference to this component's host element
  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    // This hook runs *after* the component's view (HTML) is initialized.
    
    // We use this.el.nativeElement to query *within* this component's template.
    // This is safer than using document.getElementById() in Angular.
    const menuToggle = this.el.nativeElement.querySelector('#menu-toggle');
    const mobileNav = this.el.nativeElement.querySelector('#mobile-nav');

    // --- 1. Mobile "Toggle" Menu Animation ---
    if (menuToggle && mobileNav) {
      
      // Click listener for the hamburger button
      menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        mobileNav.classList.toggle('active');
      });

      // Close mobile menu when a link is clicked
      const mobileNavLinks = mobileNav.querySelectorAll('a');
      mobileNavLinks.forEach((link: HTMLElement) => {
        link.addEventListener('click', () => {
          menuToggle.classList.remove('active');
          mobileNav.classList.remove('active');
        });
      });
    }

    // --- 2. "Animate on Scroll" Logic ---
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
        // Optional: remove class when it scrolls out of view
        // else {
        //   entry.target.classList.remove('visible');
        // }
      });
    }, {
      threshold: 0.1 // Trigger when 10% of the element is visible
    });

    // Observe all elements with the class
    const elementsToAnimate = this.el.nativeElement.querySelectorAll('.animate-on-scroll');
    elementsToAnimate.forEach((el: Element) => {
      this.observer?.observe(el);
    });
  }

  ngOnDestroy(): void {
    // This is crucial for preventing memory leaks when the component is destroyed
    if (this.observer) {
      // Stop observing all elements
      this.observer.disconnect();
    }
    
    // Note: The event listeners on menuToggle and mobileNavLinks
    // will be automatically removed by the browser when the
    // elements themselves are destroyed (when the component is destroyed).
  }


  // Input to receive the content items (e.g., photo URLs, text blocks)
  @Input() contentItems: any[] =  [
  { id: 1, url: 'https://render.fineartamerica.com/images/rendered/medium/print/8/5.5/break/images/artworkimages/medium/3/valley-of-gods-john-mueller.jpg', description: 'Photo 1' },
  { id: 2, url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSLi7rYQAyaxysMBDsddiuJ4qF9N7h547fAxNOWLoywTF4hk0IpxdXZVNIBXU1R_LOxUE&usqp=CAU', description: 'Photo 2' },
  { id: 3, url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJm-ONKqeXR4Ycwbs2q1iOjWSwgsbvMCPeShjxB7WHLEOsaISa-3UpR8PfKkYW-JEe7HU&usqp=CAU', description: 'Photo 3' }
];;
  
mySlides = [
    { id: 1, title: 'Capturing Life\'s Moments', description: 'Professional photography for your events, portraits, and precious memories.', url: 'https://render.fineartamerica.com/images/rendered/medium/print/8/5.5/break/images/artworkimages/medium/3/valley-of-gods-john-mueller.jpg' },
    { id: 2, title: 'Our Expert Team', description: 'Meet the passionate artists behind every perfect shot.', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSLi7rYQAyaxysMBDsddiuJ4qF9N7h547fAxNOWLoywTF4hk0IpxdXZVNIBXU1R_LOxUE&usqp=CAU' },
    { id: 3, title: 'Stunning Landscapes', description: 'Explore the beauty of nature through our lens.', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJm-ONKqeXR4Ycwbs2q1iOjWSwgsbvMCPeShjxB7WHLEOsaISa-3UpR8PfKkYW-JEe7HU&usqp=CAU' },
    { id: 4, title: 'Creative Portraits', description: 'Bring your personality to life with our unique portrait sessions.', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSLi7rYQAyaxysMBDsddiuJ4qF9N7h547fAxNOWLoywTF4hk0IpxdXZVNIBXU1R_LOxUE&usqp=CAU' }
  ];
  // The index of the currently visible content
  currentSlideIndex: number = 0;

  // The CSS class to apply for the animation (e.g., 'next' or 'prev')
  // Starts as an empty string.
  animationDirection: 'next' | 'prev' | '' = ''; 
  
  // Holds the content that is currently leaving the screen
  leavingContent: any;
  
  // Holds the content that is entering the screen
  enteringContent: any;

  // Time in ms for the CSS transition to complete (must match CSS transition time)
  private animationDuration = 500; 

  ngOnInit(): void {
    if (this.contentItems.length > 0) {
      this.leavingContent = this.contentItems[0];
      this.enteringContent = this.contentItems[0];
    }
    this.checkScreenSize();
    window.addEventListener('resize', () => this.checkScreenSize());
  }

  // --- Core Logic for Switching Content ---
  
  private switchContent(newIndex: number, direction: 'next' | 'prev'): void {
    if (newIndex === this.currentSlideIndex || this.contentItems.length === 0) {
      return; // Prevent switching while animating or if no content
    }

    this.animationDirection = direction;
    this.leavingContent = this.contentItems[this.currentSlideIndex];
    this.enteringContent = this.contentItems[newIndex];
    
    // 1. Start the animation by applying the CSS class
    // We update the index *after* the animation is complete

    setTimeout(() => {
      // 2. After the animation duration, snap the old content out
      this.currentSlideIndex = newIndex;
      this.leavingContent = this.contentItems[newIndex]; // reset leaving content
      
      // 3. Clear the animation class to reset for the next switch
      // Use a brief delay to ensure the reset happens after the transition ends
      setTimeout(() => {
        this.animationDirection = '';
      }, 50);

    }, this.animationDuration);
  }

  goNext(): void {
    const newIndex = (this.currentSlideIndex + 1) % this.contentItems.length;
    this.switchContent(newIndex, 'next');
  }

  goPrevious(): void {
    let newIndex = this.currentSlideIndex - 1;
    if (newIndex < 0) {
      newIndex = this.contentItems.length - 1; // Loop back to the end
    }
    this.switchContent(newIndex, 'prev');
  }

   showCarousel = true;
    checkScreenSize() {
    // 👇 768px से छोटी स्क्रीन पर component hide हो जाएगा
    this.showCarousel = window.innerWidth > 768;
  }
}
