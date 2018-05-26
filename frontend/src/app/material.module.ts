import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import {MatBadgeModule} from '@angular/material/badge';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import {MatRadioModule} from '@angular/material/radio';




@NgModule({
  imports: [MatButtonModule,MatInputModule,MatFormFieldModule,MatCardModule,MatSlideToggleModule,
    MatCheckboxModule,MatTabsModule,MatSelectModule,MatDialogModule,MatBadgeModule,
    MatIconModule,MatListModule,MatDividerModule,MatRadioModule],
  exports: [MatButtonModule,MatInputModule,MatFormFieldModule,MatCardModule,MatSlideToggleModule,
    MatCheckboxModule,MatTabsModule,MatSelectModule,MatDialogModule,MatBadgeModule,
    MatIconModule,MatListModule,MatDividerModule,MatRadioModule],
})
export class MaterialModule { }