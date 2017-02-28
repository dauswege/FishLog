namespace fishing.log {
    'use strict';

    export class BaseUrlCreator {

        constructor() {
        }

        public static getBaseUrl(): string {
            return '/' + window.location.pathname.split('/')[1] + '/';
        }
    }

    angular.module('fishingLog');
}