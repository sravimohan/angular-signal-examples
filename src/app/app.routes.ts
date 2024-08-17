import { Routes } from '@angular/router';
import { PrimitiveTypesComponent } from './primitive-types/primitive-types.component';
import { ObjectTypeComponent } from './object-type/object-type.component';
import { ModelInputComponent } from './model-input/model-input.component';

export const routes: Routes = [
    { path: 'primitive-types', component: PrimitiveTypesComponent },
    { path: 'object-type', component: ObjectTypeComponent },
    { path: 'model-input', component: ModelInputComponent },
];
