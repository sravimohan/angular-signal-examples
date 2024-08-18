import { Routes } from '@angular/router';
import { PrimitiveTypesComponent } from './primitive-types/primitive-types.component';
import { ObjectTypeComponent } from './object-type/object-type.component';

import { WithInputComponent } from './with-input/with-input.component';
import { WithModelComponent } from './with-model/with-model.component';

export const routes: Routes = [
    { path: '', redirectTo: 'primitive-types', pathMatch: 'full' },
    { path: 'primitive-types', component: PrimitiveTypesComponent },
    { path: 'object-type', component: ObjectTypeComponent },
    { path: 'with-input', component: WithInputComponent },
    { path: 'with-model', component: WithModelComponent },
];
