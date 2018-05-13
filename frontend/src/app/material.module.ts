import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTabsModule} from '@angular/material/tabs';


@NgModule({
  imports: [MatButtonModule,MatInputModule,MatFormFieldModule,MatCardModule,MatSlideToggleModule,MatCheckboxModule,MatTabsModule],
  exports: [MatButtonModule,MatInputModule,MatFormFieldModule,MatCardModule,MatSlideToggleModule,MatCheckboxModule,MatTabsModule],
})
export class MaterialModule { }