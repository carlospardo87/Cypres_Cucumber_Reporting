let reporter = require('cucumber-html-reporter');

let options = {
        theme: 'bootstrap',
        jsonDir: '../results/cypress/reports/test-results/cucumber-json',
        screenshotsDirectory: '../results/cypress/screenshots',
        storeScreenshots: true,
        output: '../results/cypress/reports/report.html',
        reportSuiteAsScenarios: true,
        scenarioTimestamp: true,       
        metadata: {            
            "Test Environment": "SIT",
            "Executed": "Docker Container"
        }
    };

    reporter.generate(options);