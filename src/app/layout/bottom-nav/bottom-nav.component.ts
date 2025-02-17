import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
    selector: 'app-bottom-nav',
    imports: [RouterLink, RouterLinkActive],
    templateUrl: './bottom-nav.component.html',
    styleUrls: ['./bottom-nav.component.css']
})
export class BottomNavComponent {}