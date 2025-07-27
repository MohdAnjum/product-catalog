// import { bootstrapApplication } from '@angular/platform-browser';
// import { appConfig } from './app/app.config';
// import { App } from './app/app';

// bootstrapApplication(App, appConfig)
//   .catch((err) => console.error(err));


import { bootstrapApplication } from '@angular/platform-browser';
// import { ProductListComponent } from './app/components/product-list.component';
import { ProductListComponent } from './app/components/product-list/product-list';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(ProductListComponent, {
  providers: [provideHttpClient()]
}).catch(err => console.error(err));
