// src/app/content-switcher/content-switcher.component.ts
import { Component, Input, OnInit } from '@angular/core';
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

animations: [
    trigger('slideAnimation', [
      
      // 1. Entering Animation (:enter)
      // Transition from a custom state (using parameters) TO the final active state
      transition(':enter', [
        
        // Define STARTING style using parameters
        style({ 
          transform: 'translate({{ startX }}, {{ startY }})', 
          opacity: 0,
          zIndex: 3 
        }),
        
        // Animate TO the final (center) position
        animate('600ms ease-out', style({ 
          transform: 'translate(0, 0)', 
          opacity: 1 
        }))
      ], { 
          // Default parameters (must be present)
          params: { startX: '100%', startY: '-100%' } 
      }), 

      
      // 2. Leaving Animation (:leave)
      // Transition FROM the active state TO a custom state (using parameters)
      transition(':leave', [
        
        // Animate FROM the current center position 
        // TO the final exit position defined by parameters
        animate('600ms ease-out', style({ 
          transform: 'translate({{ endX }}, {{ endY }})', 
          opacity: 0.2 
        }))
      ], { 
          // Default parameters (must be present)
          params: { endX: '-100%', endY: '100%' } 
      }) 
    ])
  ]



})
export class ContentSwitcherComponent implements OnInit {

  @Input() contentItems: any[] = [];
  
  currentSlideIndex: number = 0;
  
  // This state will trigger the animation (e.g., 'active', 'next', 'prev')
  animationState: 'active' | 'next' | 'prev' = 'active';

  constructor() { }

  ngOnInit(): void {
    if (this.contentItems.length === 0) {
      console.warn("ContentSwitcherComponent: No content items provided.");
    }
  }

  // --- Core Logic for Switching Content ---
  
 
  
  animationDirection: 'next' | 'prev' = 'next'; 
  
  // ... (ngOnInit)

  private switchContent1(newIndex: number, direction: 'next' | 'prev'): void {
    if (newIndex === this.currentSlideIndex || this.contentItems.length === 0) {
      return;
    }
    
    // 1. Set the direction parameter BEFORE changing the index
    this.animationDirection = direction;

    // 2. Changing the index triggers *ngIf to remove the old element (:leave) 
    //    and insert the new element (:enter) simultaneously.
    setTimeout(() => {
        this.currentSlideIndex = newIndex;
    }, 50);
  }

  // --- Core Logic: The `goNext` and `goPrevious` methods need to be updated ---
  
  goNext1(): void {
    const newIndex = (this.currentSlideIndex + 1) % this.contentItems.length;
    // We update animationDirection BEFORE calling switchContent
    this.animationDirection = 'next';
    this.switchContent(newIndex, 'next');
  }

  goPrevious1(): void {
    let newIndex = this.currentSlideIndex - 1;
    if (newIndex < 0) {
      newIndex = this.contentItems.length - 1; 
    }
    // We update animationDirection BEFORE calling switchContent
    this.animationDirection = 'prev';
    this.switchContent(newIndex, 'prev');
  }


  // 🆕 NEW: Animation Lock Variable
  isAnimating: boolean = false; 
  
  // Animation Duration (Must match the 600ms in the animate() function)
  private animationDuration = 600; 

  // ... (ngOnInit remains the same)

  // ... (ngOnInit remains the same)

  // 🆕 NEW: Variable to hold the unique trigger value for the HTML
  animationTriggerValue: string = 'slide-0-next'; 

  // ... (ngOnInit remains the same)

// Check your switchContent method
private switchContent(newIndex: number, direction: 'next' | 'prev'): void {
    
    if (this.isAnimating || newIndex === this.currentSlideIndex || this.contentItems.length === 0) {
      return; 
    }
    
    // 1. 🔒 LOCK and Set Direction
    this.isAnimating = true;
    this.animationDirection = direction;

    // 2. 💥 UPDATE TRIGGER VALUE: Must happen before index change.
    this.animationTriggerValue = `slide-${newIndex}-${direction}`;

    // 3. UPDATE INDEX: This triggers the *ngIf and starts the animation.
    this.currentSlideIndex = newIndex;
    
    // 4. 🔓 UNLOCK: After animation time.
    setTimeout(() => {
        this.isAnimating = false;
    }, 600); // 👈 Check this time (must be 600ms)
}
  // --- goNext and goPrevious methods updated to set direction BEFORE switch ---
  
  goNext(): void {
    const newIndex = (this.currentSlideIndex + 1) % this.contentItems.length;
    this.isAnimating = false;
    this.switchContent(newIndex, 'next');
  }

  goPrevious(): void {
    let newIndex = this.currentSlideIndex - 1;
    if (newIndex < 0) {
      newIndex = this.contentItems.length - 1; 
    }
      this.isAnimating = false;
    this.switchContent(newIndex, 'prev');
  }

  // --- A NEW method to calculate the dynamic parameters for HTML ---
  
  getAnimationParams(): any {
    // next: New enters from Top-Right (100%, -100%) and Old leaves to Bottom-Left (-100%, 100%)
    if (this.animationDirection === 'next') {
      return { 
        enter: { startX: '100%', startY: '-100%' }, 
        leave: { endX: '-100%', endY: '100%' } 
      };
    } else { 
      // prev: New enters from Bottom-Left (-100%, 100%) and Old leaves to Top-Right (100%, -100%)
      return { 
        enter: { startX: '-100%', startY: '100%' }, 
        leave: { endX: '100%', endY: '-100%' } 
      };
    }
}
}