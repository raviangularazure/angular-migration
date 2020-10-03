import { platformBrowser } from '@angular/platform-browser';
import { UpgradeModule } from '@angular/upgrade/static';
import { enableProdMode } from '@angular/core';
import { AppModuleNgFactory } from '../aot/public/app/app.module.ngfactory'; // This file will never exist on disk. This will be available when compiler is running


enableProdMode();
platformBrowser().bootstrapModuleFactory(AppModuleNgFactory).then(platformRef => { // this line bootstraps the Angular 2+ app first
    const upgrade = platformRef.injector.get(UpgradeModule) as UpgradeModule;
    upgrade.bootstrap(document.documentElement, ['app']); // this line bootstraps the Angular 1 code

    console.log('hybrid app boostrapped');
}); // platformBrowser is for AOT


