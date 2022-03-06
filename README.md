# Mocpiler

Mocpiler a library used to help author http mocked request responses per test case and then compiles it to mockintosh configuration.

In order to ensure that a test case response is used, the header `testcase` is configured as part of the request match condition.

It supports the typical authoring pattern of modifying base responses.
