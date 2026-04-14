'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">nest-basic-hoidanit documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                                <li class="link">
                                    <a href="overview.html" data-type="chapter-link">
                                        <span class="icon ion-ios-keypad"></span>Overview
                                    </a>
                                </li>

                            <li class="link">
                                <a href="index.html" data-type="chapter-link">
                                    <span class="icon ion-ios-paper"></span>
                                        README
                                </a>
                            </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>

                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-fe80e7df7a3ce215ce42890dd01a09dc1dc293b871d757f7b6232731a159ed425074aff7edb9af80f83a9065f78a164d2d9ba8121dd9d98289d324ad6aa8825d"' : 'data-bs-target="#xs-controllers-links-module-AppModule-fe80e7df7a3ce215ce42890dd01a09dc1dc293b871d757f7b6232731a159ed425074aff7edb9af80f83a9065f78a164d2d9ba8121dd9d98289d324ad6aa8825d"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-fe80e7df7a3ce215ce42890dd01a09dc1dc293b871d757f7b6232731a159ed425074aff7edb9af80f83a9065f78a164d2d9ba8121dd9d98289d324ad6aa8825d"' :
                                            'id="xs-controllers-links-module-AppModule-fe80e7df7a3ce215ce42890dd01a09dc1dc293b871d757f7b6232731a159ed425074aff7edb9af80f83a9065f78a164d2d9ba8121dd9d98289d324ad6aa8825d"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-fe80e7df7a3ce215ce42890dd01a09dc1dc293b871d757f7b6232731a159ed425074aff7edb9af80f83a9065f78a164d2d9ba8121dd9d98289d324ad6aa8825d"' : 'data-bs-target="#xs-injectables-links-module-AppModule-fe80e7df7a3ce215ce42890dd01a09dc1dc293b871d757f7b6232731a159ed425074aff7edb9af80f83a9065f78a164d2d9ba8121dd9d98289d324ad6aa8825d"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-fe80e7df7a3ce215ce42890dd01a09dc1dc293b871d757f7b6232731a159ed425074aff7edb9af80f83a9065f78a164d2d9ba8121dd9d98289d324ad6aa8825d"' :
                                        'id="xs-injectables-links-module-AppModule-fe80e7df7a3ce215ce42890dd01a09dc1dc293b871d757f7b6232731a159ed425074aff7edb9af80f83a9065f78a164d2d9ba8121dd9d98289d324ad6aa8825d"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-a99f01336126a44bb674ce5ba863c633f760c8b7d370c882e5dcf2fd69c4cf541b406c330b979edeedea63bbeabd42cbfc8d5c34338ea8711aa5e05b84d91fa1"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-a99f01336126a44bb674ce5ba863c633f760c8b7d370c882e5dcf2fd69c4cf541b406c330b979edeedea63bbeabd42cbfc8d5c34338ea8711aa5e05b84d91fa1"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-a99f01336126a44bb674ce5ba863c633f760c8b7d370c882e5dcf2fd69c4cf541b406c330b979edeedea63bbeabd42cbfc8d5c34338ea8711aa5e05b84d91fa1"' :
                                            'id="xs-controllers-links-module-AuthModule-a99f01336126a44bb674ce5ba863c633f760c8b7d370c882e5dcf2fd69c4cf541b406c330b979edeedea63bbeabd42cbfc8d5c34338ea8711aa5e05b84d91fa1"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-a99f01336126a44bb674ce5ba863c633f760c8b7d370c882e5dcf2fd69c4cf541b406c330b979edeedea63bbeabd42cbfc8d5c34338ea8711aa5e05b84d91fa1"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-a99f01336126a44bb674ce5ba863c633f760c8b7d370c882e5dcf2fd69c4cf541b406c330b979edeedea63bbeabd42cbfc8d5c34338ea8711aa5e05b84d91fa1"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-a99f01336126a44bb674ce5ba863c633f760c8b7d370c882e5dcf2fd69c4cf541b406c330b979edeedea63bbeabd42cbfc8d5c34338ea8711aa5e05b84d91fa1"' :
                                        'id="xs-injectables-links-module-AuthModule-a99f01336126a44bb674ce5ba863c633f760c8b7d370c882e5dcf2fd69c4cf541b406c330b979edeedea63bbeabd42cbfc8d5c34338ea8711aa5e05b84d91fa1"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LocalStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LocalStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CompanysModule.html" data-type="entity-link" >CompanysModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-CompanysModule-d34f68801037e2619aa9c7408b21fb6eecace3c03c8088219818d3adac2c6eba85a6614cf94a2b76d3822d3764cfaebe067a36f3349cd8715c371f863e84ac2b"' : 'data-bs-target="#xs-controllers-links-module-CompanysModule-d34f68801037e2619aa9c7408b21fb6eecace3c03c8088219818d3adac2c6eba85a6614cf94a2b76d3822d3764cfaebe067a36f3349cd8715c371f863e84ac2b"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CompanysModule-d34f68801037e2619aa9c7408b21fb6eecace3c03c8088219818d3adac2c6eba85a6614cf94a2b76d3822d3764cfaebe067a36f3349cd8715c371f863e84ac2b"' :
                                            'id="xs-controllers-links-module-CompanysModule-d34f68801037e2619aa9c7408b21fb6eecace3c03c8088219818d3adac2c6eba85a6614cf94a2b76d3822d3764cfaebe067a36f3349cd8715c371f863e84ac2b"' }>
                                            <li class="link">
                                                <a href="controllers/CompanysController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CompanysController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-CompanysModule-d34f68801037e2619aa9c7408b21fb6eecace3c03c8088219818d3adac2c6eba85a6614cf94a2b76d3822d3764cfaebe067a36f3349cd8715c371f863e84ac2b"' : 'data-bs-target="#xs-injectables-links-module-CompanysModule-d34f68801037e2619aa9c7408b21fb6eecace3c03c8088219818d3adac2c6eba85a6614cf94a2b76d3822d3764cfaebe067a36f3349cd8715c371f863e84ac2b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CompanysModule-d34f68801037e2619aa9c7408b21fb6eecace3c03c8088219818d3adac2c6eba85a6614cf94a2b76d3822d3764cfaebe067a36f3349cd8715c371f863e84ac2b"' :
                                        'id="xs-injectables-links-module-CompanysModule-d34f68801037e2619aa9c7408b21fb6eecace3c03c8088219818d3adac2c6eba85a6614cf94a2b76d3822d3764cfaebe067a36f3349cd8715c371f863e84ac2b"' }>
                                        <li class="link">
                                            <a href="injectables/CompanysService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CompanysService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/DatabasesModule.html" data-type="entity-link" >DatabasesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-DatabasesModule-5895c6644c1cc81a0117ce97e0d2605b95174727b609a6fe269204f0c9e641c017075f98bf757a771e9cb2e4a2ed3e52165397ed0728c4f64afabbf09f7c20a2"' : 'data-bs-target="#xs-controllers-links-module-DatabasesModule-5895c6644c1cc81a0117ce97e0d2605b95174727b609a6fe269204f0c9e641c017075f98bf757a771e9cb2e4a2ed3e52165397ed0728c4f64afabbf09f7c20a2"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-DatabasesModule-5895c6644c1cc81a0117ce97e0d2605b95174727b609a6fe269204f0c9e641c017075f98bf757a771e9cb2e4a2ed3e52165397ed0728c4f64afabbf09f7c20a2"' :
                                            'id="xs-controllers-links-module-DatabasesModule-5895c6644c1cc81a0117ce97e0d2605b95174727b609a6fe269204f0c9e641c017075f98bf757a771e9cb2e4a2ed3e52165397ed0728c4f64afabbf09f7c20a2"' }>
                                            <li class="link">
                                                <a href="controllers/DatabasesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DatabasesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-DatabasesModule-5895c6644c1cc81a0117ce97e0d2605b95174727b609a6fe269204f0c9e641c017075f98bf757a771e9cb2e4a2ed3e52165397ed0728c4f64afabbf09f7c20a2"' : 'data-bs-target="#xs-injectables-links-module-DatabasesModule-5895c6644c1cc81a0117ce97e0d2605b95174727b609a6fe269204f0c9e641c017075f98bf757a771e9cb2e4a2ed3e52165397ed0728c4f64afabbf09f7c20a2"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-DatabasesModule-5895c6644c1cc81a0117ce97e0d2605b95174727b609a6fe269204f0c9e641c017075f98bf757a771e9cb2e4a2ed3e52165397ed0728c4f64afabbf09f7c20a2"' :
                                        'id="xs-injectables-links-module-DatabasesModule-5895c6644c1cc81a0117ce97e0d2605b95174727b609a6fe269204f0c9e641c017075f98bf757a771e9cb2e4a2ed3e52165397ed0728c4f64afabbf09f7c20a2"' }>
                                        <li class="link">
                                            <a href="injectables/DatabasesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DatabasesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/FilesModule.html" data-type="entity-link" >FilesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-FilesModule-673d29967e33d9c0a7614e763440d4a42eb5af3391c8bb047c3d33717da4069612a3a00d78b5005055a3bd85efa53eaafe72c30bfa268c82128d2e644b9229bb"' : 'data-bs-target="#xs-controllers-links-module-FilesModule-673d29967e33d9c0a7614e763440d4a42eb5af3391c8bb047c3d33717da4069612a3a00d78b5005055a3bd85efa53eaafe72c30bfa268c82128d2e644b9229bb"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-FilesModule-673d29967e33d9c0a7614e763440d4a42eb5af3391c8bb047c3d33717da4069612a3a00d78b5005055a3bd85efa53eaafe72c30bfa268c82128d2e644b9229bb"' :
                                            'id="xs-controllers-links-module-FilesModule-673d29967e33d9c0a7614e763440d4a42eb5af3391c8bb047c3d33717da4069612a3a00d78b5005055a3bd85efa53eaafe72c30bfa268c82128d2e644b9229bb"' }>
                                            <li class="link">
                                                <a href="controllers/FilesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FilesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-FilesModule-673d29967e33d9c0a7614e763440d4a42eb5af3391c8bb047c3d33717da4069612a3a00d78b5005055a3bd85efa53eaafe72c30bfa268c82128d2e644b9229bb"' : 'data-bs-target="#xs-injectables-links-module-FilesModule-673d29967e33d9c0a7614e763440d4a42eb5af3391c8bb047c3d33717da4069612a3a00d78b5005055a3bd85efa53eaafe72c30bfa268c82128d2e644b9229bb"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-FilesModule-673d29967e33d9c0a7614e763440d4a42eb5af3391c8bb047c3d33717da4069612a3a00d78b5005055a3bd85efa53eaafe72c30bfa268c82128d2e644b9229bb"' :
                                        'id="xs-injectables-links-module-FilesModule-673d29967e33d9c0a7614e763440d4a42eb5af3391c8bb047c3d33717da4069612a3a00d78b5005055a3bd85efa53eaafe72c30bfa268c82128d2e644b9229bb"' }>
                                        <li class="link">
                                            <a href="injectables/FilesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FilesService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/MulterConfigService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MulterConfigService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/JobsModule.html" data-type="entity-link" >JobsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-JobsModule-d55f780faa803b6f2bf9ed6f343a86a60fa8f2977447ad480ce57b16f05c1fd32696ff02958c2db8969bdd28050229da29d35cfd98e2d4ffb85299f839e686b5"' : 'data-bs-target="#xs-controllers-links-module-JobsModule-d55f780faa803b6f2bf9ed6f343a86a60fa8f2977447ad480ce57b16f05c1fd32696ff02958c2db8969bdd28050229da29d35cfd98e2d4ffb85299f839e686b5"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-JobsModule-d55f780faa803b6f2bf9ed6f343a86a60fa8f2977447ad480ce57b16f05c1fd32696ff02958c2db8969bdd28050229da29d35cfd98e2d4ffb85299f839e686b5"' :
                                            'id="xs-controllers-links-module-JobsModule-d55f780faa803b6f2bf9ed6f343a86a60fa8f2977447ad480ce57b16f05c1fd32696ff02958c2db8969bdd28050229da29d35cfd98e2d4ffb85299f839e686b5"' }>
                                            <li class="link">
                                                <a href="controllers/JobsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JobsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-JobsModule-d55f780faa803b6f2bf9ed6f343a86a60fa8f2977447ad480ce57b16f05c1fd32696ff02958c2db8969bdd28050229da29d35cfd98e2d4ffb85299f839e686b5"' : 'data-bs-target="#xs-injectables-links-module-JobsModule-d55f780faa803b6f2bf9ed6f343a86a60fa8f2977447ad480ce57b16f05c1fd32696ff02958c2db8969bdd28050229da29d35cfd98e2d4ffb85299f839e686b5"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-JobsModule-d55f780faa803b6f2bf9ed6f343a86a60fa8f2977447ad480ce57b16f05c1fd32696ff02958c2db8969bdd28050229da29d35cfd98e2d4ffb85299f839e686b5"' :
                                        'id="xs-injectables-links-module-JobsModule-d55f780faa803b6f2bf9ed6f343a86a60fa8f2977447ad480ce57b16f05c1fd32696ff02958c2db8969bdd28050229da29d35cfd98e2d4ffb85299f839e686b5"' }>
                                        <li class="link">
                                            <a href="injectables/JobsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JobsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MailModule.html" data-type="entity-link" >MailModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-MailModule-dbfc34b931f43a7cfa31a2210e58783ac49e2e01bf7d31b4a107783db26a90fb52a0e61b84030f9d51fe77a828f5517f438c0a0fcde204df67869ae87b1c2a76"' : 'data-bs-target="#xs-controllers-links-module-MailModule-dbfc34b931f43a7cfa31a2210e58783ac49e2e01bf7d31b4a107783db26a90fb52a0e61b84030f9d51fe77a828f5517f438c0a0fcde204df67869ae87b1c2a76"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-MailModule-dbfc34b931f43a7cfa31a2210e58783ac49e2e01bf7d31b4a107783db26a90fb52a0e61b84030f9d51fe77a828f5517f438c0a0fcde204df67869ae87b1c2a76"' :
                                            'id="xs-controllers-links-module-MailModule-dbfc34b931f43a7cfa31a2210e58783ac49e2e01bf7d31b4a107783db26a90fb52a0e61b84030f9d51fe77a828f5517f438c0a0fcde204df67869ae87b1c2a76"' }>
                                            <li class="link">
                                                <a href="controllers/MailController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MailController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-MailModule-dbfc34b931f43a7cfa31a2210e58783ac49e2e01bf7d31b4a107783db26a90fb52a0e61b84030f9d51fe77a828f5517f438c0a0fcde204df67869ae87b1c2a76"' : 'data-bs-target="#xs-injectables-links-module-MailModule-dbfc34b931f43a7cfa31a2210e58783ac49e2e01bf7d31b4a107783db26a90fb52a0e61b84030f9d51fe77a828f5517f438c0a0fcde204df67869ae87b1c2a76"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MailModule-dbfc34b931f43a7cfa31a2210e58783ac49e2e01bf7d31b4a107783db26a90fb52a0e61b84030f9d51fe77a828f5517f438c0a0fcde204df67869ae87b1c2a76"' :
                                        'id="xs-injectables-links-module-MailModule-dbfc34b931f43a7cfa31a2210e58783ac49e2e01bf7d31b4a107783db26a90fb52a0e61b84030f9d51fe77a828f5517f438c0a0fcde204df67869ae87b1c2a76"' }>
                                        <li class="link">
                                            <a href="injectables/MailService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MailService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PermissionsModule.html" data-type="entity-link" >PermissionsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-PermissionsModule-adcd404e54756c7eb4951a2a8bc07f400215340f8ca3baa233948dc1607a51f829cadcfcf8054d278572a582bd5a8281ea6fe5369d1e2826998a88ca720a0745"' : 'data-bs-target="#xs-controllers-links-module-PermissionsModule-adcd404e54756c7eb4951a2a8bc07f400215340f8ca3baa233948dc1607a51f829cadcfcf8054d278572a582bd5a8281ea6fe5369d1e2826998a88ca720a0745"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PermissionsModule-adcd404e54756c7eb4951a2a8bc07f400215340f8ca3baa233948dc1607a51f829cadcfcf8054d278572a582bd5a8281ea6fe5369d1e2826998a88ca720a0745"' :
                                            'id="xs-controllers-links-module-PermissionsModule-adcd404e54756c7eb4951a2a8bc07f400215340f8ca3baa233948dc1607a51f829cadcfcf8054d278572a582bd5a8281ea6fe5369d1e2826998a88ca720a0745"' }>
                                            <li class="link">
                                                <a href="controllers/PermissionsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PermissionsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PermissionsModule-adcd404e54756c7eb4951a2a8bc07f400215340f8ca3baa233948dc1607a51f829cadcfcf8054d278572a582bd5a8281ea6fe5369d1e2826998a88ca720a0745"' : 'data-bs-target="#xs-injectables-links-module-PermissionsModule-adcd404e54756c7eb4951a2a8bc07f400215340f8ca3baa233948dc1607a51f829cadcfcf8054d278572a582bd5a8281ea6fe5369d1e2826998a88ca720a0745"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PermissionsModule-adcd404e54756c7eb4951a2a8bc07f400215340f8ca3baa233948dc1607a51f829cadcfcf8054d278572a582bd5a8281ea6fe5369d1e2826998a88ca720a0745"' :
                                        'id="xs-injectables-links-module-PermissionsModule-adcd404e54756c7eb4951a2a8bc07f400215340f8ca3baa233948dc1607a51f829cadcfcf8054d278572a582bd5a8281ea6fe5369d1e2826998a88ca720a0745"' }>
                                        <li class="link">
                                            <a href="injectables/PermissionsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PermissionsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ResumesModule.html" data-type="entity-link" >ResumesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ResumesModule-2c1a49c69a767216994be8fd624e133560625c9dc177ab19bb21ef6dc19d61d7d6347ab75adbdae858b72397700bd210f0dfd394a7ec57b25202fb6fc5ce14b5"' : 'data-bs-target="#xs-controllers-links-module-ResumesModule-2c1a49c69a767216994be8fd624e133560625c9dc177ab19bb21ef6dc19d61d7d6347ab75adbdae858b72397700bd210f0dfd394a7ec57b25202fb6fc5ce14b5"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ResumesModule-2c1a49c69a767216994be8fd624e133560625c9dc177ab19bb21ef6dc19d61d7d6347ab75adbdae858b72397700bd210f0dfd394a7ec57b25202fb6fc5ce14b5"' :
                                            'id="xs-controllers-links-module-ResumesModule-2c1a49c69a767216994be8fd624e133560625c9dc177ab19bb21ef6dc19d61d7d6347ab75adbdae858b72397700bd210f0dfd394a7ec57b25202fb6fc5ce14b5"' }>
                                            <li class="link">
                                                <a href="controllers/ResumesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ResumesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ResumesModule-2c1a49c69a767216994be8fd624e133560625c9dc177ab19bb21ef6dc19d61d7d6347ab75adbdae858b72397700bd210f0dfd394a7ec57b25202fb6fc5ce14b5"' : 'data-bs-target="#xs-injectables-links-module-ResumesModule-2c1a49c69a767216994be8fd624e133560625c9dc177ab19bb21ef6dc19d61d7d6347ab75adbdae858b72397700bd210f0dfd394a7ec57b25202fb6fc5ce14b5"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ResumesModule-2c1a49c69a767216994be8fd624e133560625c9dc177ab19bb21ef6dc19d61d7d6347ab75adbdae858b72397700bd210f0dfd394a7ec57b25202fb6fc5ce14b5"' :
                                        'id="xs-injectables-links-module-ResumesModule-2c1a49c69a767216994be8fd624e133560625c9dc177ab19bb21ef6dc19d61d7d6347ab75adbdae858b72397700bd210f0dfd394a7ec57b25202fb6fc5ce14b5"' }>
                                        <li class="link">
                                            <a href="injectables/ResumesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ResumesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/RolesModule.html" data-type="entity-link" >RolesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-RolesModule-996681bcf5393431b5de457438ff4ba91da75707902015f8a8d3d1bf2494c0fe7de1c40cb465cb183f2598336ac576a4f8d9567f10b180d267022ede703d84b7"' : 'data-bs-target="#xs-controllers-links-module-RolesModule-996681bcf5393431b5de457438ff4ba91da75707902015f8a8d3d1bf2494c0fe7de1c40cb465cb183f2598336ac576a4f8d9567f10b180d267022ede703d84b7"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-RolesModule-996681bcf5393431b5de457438ff4ba91da75707902015f8a8d3d1bf2494c0fe7de1c40cb465cb183f2598336ac576a4f8d9567f10b180d267022ede703d84b7"' :
                                            'id="xs-controllers-links-module-RolesModule-996681bcf5393431b5de457438ff4ba91da75707902015f8a8d3d1bf2494c0fe7de1c40cb465cb183f2598336ac576a4f8d9567f10b180d267022ede703d84b7"' }>
                                            <li class="link">
                                                <a href="controllers/RolesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RolesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-RolesModule-996681bcf5393431b5de457438ff4ba91da75707902015f8a8d3d1bf2494c0fe7de1c40cb465cb183f2598336ac576a4f8d9567f10b180d267022ede703d84b7"' : 'data-bs-target="#xs-injectables-links-module-RolesModule-996681bcf5393431b5de457438ff4ba91da75707902015f8a8d3d1bf2494c0fe7de1c40cb465cb183f2598336ac576a4f8d9567f10b180d267022ede703d84b7"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-RolesModule-996681bcf5393431b5de457438ff4ba91da75707902015f8a8d3d1bf2494c0fe7de1c40cb465cb183f2598336ac576a4f8d9567f10b180d267022ede703d84b7"' :
                                        'id="xs-injectables-links-module-RolesModule-996681bcf5393431b5de457438ff4ba91da75707902015f8a8d3d1bf2494c0fe7de1c40cb465cb183f2598336ac576a4f8d9567f10b180d267022ede703d84b7"' }>
                                        <li class="link">
                                            <a href="injectables/RolesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RolesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SubscribersModule.html" data-type="entity-link" >SubscribersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-SubscribersModule-9094046e35cb89fdd34382db5c8c1d8d3ad8355e36c218992093bf78ed43f37c325070e60564cee0535e800ec958b0130b0b20fa7a3f4986c0a4116f1dfcf54a"' : 'data-bs-target="#xs-controllers-links-module-SubscribersModule-9094046e35cb89fdd34382db5c8c1d8d3ad8355e36c218992093bf78ed43f37c325070e60564cee0535e800ec958b0130b0b20fa7a3f4986c0a4116f1dfcf54a"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-SubscribersModule-9094046e35cb89fdd34382db5c8c1d8d3ad8355e36c218992093bf78ed43f37c325070e60564cee0535e800ec958b0130b0b20fa7a3f4986c0a4116f1dfcf54a"' :
                                            'id="xs-controllers-links-module-SubscribersModule-9094046e35cb89fdd34382db5c8c1d8d3ad8355e36c218992093bf78ed43f37c325070e60564cee0535e800ec958b0130b0b20fa7a3f4986c0a4116f1dfcf54a"' }>
                                            <li class="link">
                                                <a href="controllers/SubscribersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SubscribersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-SubscribersModule-9094046e35cb89fdd34382db5c8c1d8d3ad8355e36c218992093bf78ed43f37c325070e60564cee0535e800ec958b0130b0b20fa7a3f4986c0a4116f1dfcf54a"' : 'data-bs-target="#xs-injectables-links-module-SubscribersModule-9094046e35cb89fdd34382db5c8c1d8d3ad8355e36c218992093bf78ed43f37c325070e60564cee0535e800ec958b0130b0b20fa7a3f4986c0a4116f1dfcf54a"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SubscribersModule-9094046e35cb89fdd34382db5c8c1d8d3ad8355e36c218992093bf78ed43f37c325070e60564cee0535e800ec958b0130b0b20fa7a3f4986c0a4116f1dfcf54a"' :
                                        'id="xs-injectables-links-module-SubscribersModule-9094046e35cb89fdd34382db5c8c1d8d3ad8355e36c218992093bf78ed43f37c325070e60564cee0535e800ec958b0130b0b20fa7a3f4986c0a4116f1dfcf54a"' }>
                                        <li class="link">
                                            <a href="injectables/SubscribersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SubscribersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-daf7c9dffe757418ec5dc6f8260d183c7b9cbb0cef402e1fdbd287e8a561f4a2ce3709afdcadd740daa0e3929d4910187d116a3b617edebde78122684672bd19"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-daf7c9dffe757418ec5dc6f8260d183c7b9cbb0cef402e1fdbd287e8a561f4a2ce3709afdcadd740daa0e3929d4910187d116a3b617edebde78122684672bd19"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-daf7c9dffe757418ec5dc6f8260d183c7b9cbb0cef402e1fdbd287e8a561f4a2ce3709afdcadd740daa0e3929d4910187d116a3b617edebde78122684672bd19"' :
                                            'id="xs-controllers-links-module-UsersModule-daf7c9dffe757418ec5dc6f8260d183c7b9cbb0cef402e1fdbd287e8a561f4a2ce3709afdcadd740daa0e3929d4910187d116a3b617edebde78122684672bd19"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-daf7c9dffe757418ec5dc6f8260d183c7b9cbb0cef402e1fdbd287e8a561f4a2ce3709afdcadd740daa0e3929d4910187d116a3b617edebde78122684672bd19"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-daf7c9dffe757418ec5dc6f8260d183c7b9cbb0cef402e1fdbd287e8a561f4a2ce3709afdcadd740daa0e3929d4910187d116a3b617edebde78122684672bd19"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-daf7c9dffe757418ec5dc6f8260d183c7b9cbb0cef402e1fdbd287e8a561f4a2ce3709afdcadd740daa0e3929d4910187d116a3b617edebde78122684672bd19"' :
                                        'id="xs-injectables-links-module-UsersModule-daf7c9dffe757418ec5dc6f8260d183c7b9cbb0cef402e1fdbd287e8a561f4a2ce3709afdcadd740daa0e3929d4910187d116a3b617edebde78122684672bd19"' }>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/CompanysController.html" data-type="entity-link" >CompanysController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/DatabasesController.html" data-type="entity-link" >DatabasesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/FilesController.html" data-type="entity-link" >FilesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/JobsController.html" data-type="entity-link" >JobsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/MailController.html" data-type="entity-link" >MailController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/PermissionsController.html" data-type="entity-link" >PermissionsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ResumesController.html" data-type="entity-link" >ResumesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/RolesController.html" data-type="entity-link" >RolesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/SubscribersController.html" data-type="entity-link" >SubscribersController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UsersController.html" data-type="entity-link" >UsersController</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Company.html" data-type="entity-link" >Company</a>
                            </li>
                            <li class="link">
                                <a href="classes/Company-1.html" data-type="entity-link" >Company</a>
                            </li>
                            <li class="link">
                                <a href="classes/CompanyDto.html" data-type="entity-link" >CompanyDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCompanyDto.html" data-type="entity-link" >CreateCompanyDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateFileDto.html" data-type="entity-link" >CreateFileDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateJobDto.html" data-type="entity-link" >CreateJobDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePermissionDto.html" data-type="entity-link" >CreatePermissionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateResumeDto.html" data-type="entity-link" >CreateResumeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateRoleDto.html" data-type="entity-link" >CreateRoleDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateSubscriberDto.html" data-type="entity-link" >CreateSubscriberDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/File.html" data-type="entity-link" >File</a>
                            </li>
                            <li class="link">
                                <a href="classes/Job.html" data-type="entity-link" >Job</a>
                            </li>
                            <li class="link">
                                <a href="classes/Permission.html" data-type="entity-link" >Permission</a>
                            </li>
                            <li class="link">
                                <a href="classes/RefreshTokenDto.html" data-type="entity-link" >RefreshTokenDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/RegisterUserDto.html" data-type="entity-link" >RegisterUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Resume.html" data-type="entity-link" >Resume</a>
                            </li>
                            <li class="link">
                                <a href="classes/ResumeHistory.html" data-type="entity-link" >ResumeHistory</a>
                            </li>
                            <li class="link">
                                <a href="classes/Role.html" data-type="entity-link" >Role</a>
                            </li>
                            <li class="link">
                                <a href="classes/Subscriber.html" data-type="entity-link" >Subscriber</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateCompanyDto.html" data-type="entity-link" >UpdateCompanyDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateFileDto.html" data-type="entity-link" >UpdateFileDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateJobDto.html" data-type="entity-link" >UpdateJobDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdatePermissionDto.html" data-type="entity-link" >UpdatePermissionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateResumeDto.html" data-type="entity-link" >UpdateResumeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateRoleDto.html" data-type="entity-link" >UpdateRoleDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateSubscriberDto.html" data-type="entity-link" >UpdateSubscriberDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserDto.html" data-type="entity-link" >UpdateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link" >User</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CompanysService.html" data-type="entity-link" >CompanysService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DatabasesService.html" data-type="entity-link" >DatabasesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FilesService.html" data-type="entity-link" >FilesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JobsService.html" data-type="entity-link" >JobsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtAuthGuard.html" data-type="entity-link" >JwtAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtStrategy.html" data-type="entity-link" >JwtStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalAuthGuard.html" data-type="entity-link" >LocalAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalStrategy.html" data-type="entity-link" >LocalStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MailService.html" data-type="entity-link" >MailService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MulterConfigService.html" data-type="entity-link" >MulterConfigService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PermissionsService.html" data-type="entity-link" >PermissionsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ResumesService.html" data-type="entity-link" >ResumesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RolesService.html" data-type="entity-link" >RolesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SubscribersService.html" data-type="entity-link" >SubscribersService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TransformInterceptor.html" data-type="entity-link" >TransformInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsersService.html" data-type="entity-link" >UsersService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/IUser.html" data-type="entity-link" >IUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Response.html" data-type="entity-link" >Response</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});