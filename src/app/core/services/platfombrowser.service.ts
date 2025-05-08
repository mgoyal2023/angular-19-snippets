import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class platformService {
    isPlatformBrowser: boolean = false;

    constructor(@Inject(PLATFORM_ID) private platformId: Object) {
        this.isPlatformBrowser =  isPlatformBrowser(this.platformId)
    }
} 