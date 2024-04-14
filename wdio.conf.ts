import type { Options } from '@wdio/types'
const allure = require('allure-commandline')
import * as fs from "fs"
require('dotenv').config()

export const config: Options.Testrunner = {
    runner: 'local',

    autoCompileOpts: {
        autoCompile: true,
        tsNodeOpts: {
            project: './tsconfig.json',
            transpileOnly: true
        }
    },

    specs: [
        './tests/login/**/*.ts'
    ],

    exclude: [
        // 'path/to/excluded/files'
    ],

    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: ['--no-sandbox', '--headless']
        }
    }],

    logLevel: 'info',

    bail: 0,

    baseUrl: 'https://dev.mycavago.com/',

    waitforTimeout: 30000,

    connectionRetryTimeout: 120000,

    services: ['chromedriver'],

    framework: 'mocha',

    reporters: ['spec', ['allure', {
        outputDir: 'allure-results',
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: false,
    }]],

    mochaOpts: {
        ui: 'bdd',
        timeout: 120000
    },

    onComplete: function() {
        const reportError = new Error('Could not generate Allure report')
        const generation = allure(['generate', 'allure-results', '--clean'])
        return new Promise<void>((resolve, reject) => {
            const generationTimeout = setTimeout(
                () => reject(reportError),
                5000)

            generation.on('exit', function(exitCode) {
                clearTimeout(generationTimeout)

                if (exitCode !== 0) {
                    return reject(reportError)
                }
                resolve()
            })
        })
    },

    afterTest: async function(test, context, { error, result, duration, passed, retries }) {
        if (error) {
            await browser.takeScreenshot();
        }
    },

    afterSession: function (result, capabilities, specs) {
        fs.cp('./allure-report/history', './allure-results/history', { recursive: true }, (err) => {
            if (err) {
                console.error(err);
            }
        });
    }
}
