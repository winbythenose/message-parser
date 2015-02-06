var testRunner = (function(utils) {
    var testrunner = {};

    testrunner.reportHtml = '';

    testrunner.run = function(parser, tests) {
        if (utils.isEmptyObject(parser)) {
            return 'Parser not found';
        }
        if (utils.isEmptyObject(tests)) {
            return 'Test cases not found';
        }

        testrunner.reportHtml = '';
        var promises = [];
        for (var i = 0, l = tests.cases.length; i < l; i++) {
            var testCase = tests.cases[i];
            promises.push(parser.parse(testCase.input).then(makeTestCaseCallback(testCase)));
        }
        // return the promise which will resolve when all cases resolve and pass the report
        return Promise.all(promises);
    };

    function makeTestCaseCallback(testCase) {
        return function(results) {
            var success = JSON.stringify(results) === JSON.stringify(testCase.expected) ? 'PASSED' : 'FAILED';
            testrunner.reportHtml += '<p>' + 'Testing ' + testCase.name + '...' + success + '</p>';
        };
    }

    return testrunner;
}(Utility));