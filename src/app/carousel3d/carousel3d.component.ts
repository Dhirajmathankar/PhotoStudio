import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import * as $ from 'jquery';
import { TweenMax, Expo, Quint } from 'gsap';

@Component({
  selector: 'app-carousel3d',
  templateUrl: './carousel3d.component.html',
  styleUrls: ['./carousel3d.component.css']
})
export class Carousel3dComponent implements AfterViewInit, OnDestroy {

  private observer: any;
  private ticker: any;
  private mouseX = 0;
  private mouseY = 0;
  private mouseZ = 0;
  private addX = 0;
  private radius = 0;
  private rY = 0;
  private itemLength = 0;
  private counter: any;
  public sliderData = [
    {img:'assets/carousel/img1.jpg' , contaixt : "this is weeding shoot info"}, {img:'assets/carousel/img2.jpg',  contaixt : "this is weeding shoot info"}, {img:'assets/carousel/img3.jpg',  contaixt : "this is weeding shoot info"}, {img:'assets/carousel/img4.jpg' , contaixt : "this is weeding shoot info"}, {img:'assets/carousel/img5.jpg' , contaixt : "this is weeding shoot info"}, {img:'assets/carousel/img6.jpg' , contaixt : "this is weeding shoot info"}, {img:'assets/carousel/img7.jpg' , contaixt : "this is weeding shoot info"}, {img:'assets/carousel/img8.jpg' , contaixt : "this is weeding shoot info"}, {img:'assets/carousel/img9.jpg' , contaixt : "this is weeding shoot info"}, {img:'assets/carousel/img10.jpg', contaixt : "this is weeding shoot info"}];

  ngAfterViewInit(): void {
    this.init();
  }

  ngOnDestroy(): void {
    clearInterval(this.ticker);
    window.removeEventListener('mousemove', this.onMouseMove);
  }

  private init(): void {
    const w = $(window);
    const container = $('#contentContainer');
    const carousel = $('#carouselContainer');
    const item = $('.carouselItem');
    const fps = $('#fps');
    this.itemLength = item.length;
    this.rY = 360 / this.itemLength;
    this.radius = Math.round(250 / Math.tan(Math.PI / this.itemLength));

    // perspective
    TweenMax.set(container, { perspective: 600 });
    TweenMax.set(carousel, { z: -this.radius });

    // animate each item
    for (let i = 0; i < this.itemLength; i++) {
      const $item = item.eq(i);
      const $block = $item.find('.carouselItemInner');
      TweenMax.set($item, {
        rotationY: this.rY * i,
        z: this.radius,
        transformOrigin: `50% 50% ${-this.radius}px`
      });
      this.animateIn($item, $block);
    }

    window.addEventListener('mousemove', this.onMouseMove.bind(this), false);
    this.ticker = setInterval(() => this.looper(carousel, fps), 1000 / 60);
  }

  private animateIn($item: any, $block: any): void {
    const getRandomInt = (n: number) => Math.floor(Math.random() * n + 1);
    const nrX = 360 * getRandomInt(2);
    const nrY = 360 * getRandomInt(2);
    const nx = -2000 + getRandomInt(4000);
    const ny = -2000 + getRandomInt(4000);
    const nz = -4000 + getRandomInt(4000);
    const s = 1.5 + (getRandomInt(10) * 0.1);
    const d = 1 - (getRandomInt(8) * 0.1);

    TweenMax.set($item, { autoAlpha: 1, delay: d });
    TweenMax.set($block, { z: nz, rotationY: nrY, rotationX: nrX, x: nx, y: ny, autoAlpha: 0 });
    TweenMax.to($block, s, { delay: d, rotationY: 0, rotationX: 0, z: 0, ease: Expo.easeInOut });
    TweenMax.to($block, s - 0.5, { delay: d, x: 0, y: 0, autoAlpha: 1, ease: Expo.easeInOut });
  }

  private onMouseMove = (event: MouseEvent): void => {
    this.mouseX = -(-(window.innerWidth * 0.5) + event.pageX) * 0.0025;
    this.mouseY = -(-(window.innerHeight * 0.5) + event.pageY) * 0.01;
    this.mouseZ = -(this.radius) - (Math.abs(-(window.innerHeight * 0.5) + event.pageY) - 200);
  };

  private looper(carousel: any, fps: any): void {
    this.addX += this.mouseX;
    TweenMax.to(carousel, 1, { rotationY: this.addX, rotationX: this.mouseY, ease: Quint.easeOut });
    TweenMax.set(carousel, { z: this.mouseZ });
  }
}
