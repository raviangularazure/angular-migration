import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { UpgradeModule } from '@angular/upgrade/static';
import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule).then(platformRef => { // this line bootstraps the Angular 2+ app first
    const upgrade = platformRef.injector.get(UpgradeModule) as UpgradeModule;
    upgrade.bootstrap(document.documentElement, ['app']); // this line bootstraps the Angular 1 code

    console.log('hybrid app boostrapped');
}) // platformBrowserDynamic is JIT compiler


