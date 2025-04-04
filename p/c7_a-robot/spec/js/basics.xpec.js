/*
Simple suite

*/
describe("A suite is just a function", function () {
  let a;

  it("and so is a spec", function () {
    a = true;

    expect(a).toBe(true);
  });
});

/*
Expectations are built with the function expect which takes a value,
called the actual.
It is chained with a Matcher function, which takes the expected value.
 */
describe(
  "The 'toBe' matcher compares with ===", function () {

    it("and has a positive case", function () {
      expect(true).toBe(true);
    });

    it("and can have a negative case", function () {
      expect(false).not.toBe(true);
    });
  });

/*
To help a test suite DRY up any duplicated setup and teardown code,
Jasmine provides the global
beforeEach, afterEach, beforeAll, and afterAll functions.

*/
describe(
  "A suite with some shared setup", function () {
    let foo = 0;

    beforeEach(function () {
      foo += 1;
    });

    afterEach(function () {
      foo = 0;
    });

    beforeAll(function () {
      foo = 1;
    });

    afterAll(function () {
      foo = 0;
    });

    let a;

    it("and so is a spec", function () {
      a = true;

      expect(a).toBe(true);
    });
  });

/*
The this keyword
Another way to share variables between a beforeEach, it,
and afterEach is through the this keyword. Each spec's
beforeEach/it/afterEach has the this as the same empty
object that is set back to empty for the next spec's
beforeEach/it/afterEach.

Note: If you want to use the this keyword
to share variables, you must use the function
keyword and not arrow functions.

 */
describe("A spec", function () {
  beforeEach(function () {
    this.foo = 0;
  });

  it("can use the `this` to share state", function () {
    expect(this.foo).toEqual(0);
    this.bar = "test pollution?";
  });

  it("prevents test pollution by having an empty `this` " +
    "created for the next spec", function () {
    expect(this.foo).toEqual(0);
    expect(this.bar).toBe(undefined);
  });
});

/*
fail
 */
describe("A spec using the fail function", function () {
  function foo(x, callBack) {
    if (x) {
      callBack();
    }
  }

  it("should not call the callBack", function () {
    foo(false, function () {
      fail("Callback has been called");
    });
  });
});

/*
Calls to describe can be nested, with specs defined at any level.
This allows a suite to be composed as a tree of functions.
Before a spec is executed, Jasmine walks down the tree executing
each beforeEach function in order.
After the spec is executed, Jasmine walks through the afterEach
functions similarly.

 */
describe("A spec2", function () {
  let foo;

  beforeEach(function () {
    foo = 0;
    foo += 1;
  });

  afterEach(function () {
    foo = 0;
  });

  it("is just a function, so it can contain any code", function () {
    expect(foo).toEqual(1);
  });

  it("can have more than one expectation", function () {
    expect(foo).toEqual(1);
    expect(true).toEqual(true);
  });

  describe("nested inside a second describe", function () {
    let bar;

    beforeEach(function () {
      bar = 1;
    });

    it("can reference both scopes as needed", function () {
      expect(foo).toEqual(bar);
    });
  });
});

/*
Disable suites
Suites can be disabled with the xdescribe function.
These suites and any specs inside them are skipped
when run and thus their results will show as pending.

Suites can also be focused with the fdescribe function.
That means only fdescribe suits will run.

 */
xdescribe("A spec3", function () {
  let foo;

  beforeEach(function () {
    foo = 0;
    foo += 1;
  });

  it("is just a function, so it can contain any code", function () {
    expect(foo).toEqual(1);
  });
});

/*
xit pending
fit focused

 */
describe("Pending specs", function () {

  xit("can be declared 'xit'", function () {
    expect(true).toBe(false);
  });

  it("can be declared with 'it' but without a function");

  it("can be declared by calling 'pending' in the spec body", function () {
    expect(true).toBe(false);
    pending('this is why it is pending');
  });
});

/*
Asynchronous Support

Jasmine also has support for running specs that require
testing asynchronous operations. The functions that you
pass to beforeAll, afterAll, beforeEach, afterEach, and
it can be declared async.

This spec will not start until the promise returned from
the call to beforeEach above is settled. And this spec
will not complete until the promise that it returns is settled.
 */
describe("Using async/await", function () {
  beforeEach(async function () {
    await soon();
    value = 0;
  });

  it("supports async execution of test preparation and expectations",
    async function () {
      await soon();
      value++;
      expect(value).toBeGreaterThan(0);
    }
  );

  function soon() {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        resolve();
      }, 1);
    });
  }
});

/*
By default jasmine will wait for 5 seconds
for an asynchronous spec to finish before
causing a timeout failure. If the timeout
expires before done is called, the current
spec will be marked as failed and suite
execution will continue as if done was called.

If specific specs should fail faster or need
more time this can be adjusted by passing a timeout value to it, etc.

If the entire suite should have a different timeout,
jasmine.DEFAULT_TIMEOUT_INTERVAL can be set globally,
outside of any given describe.

 */
xdescribe("long asynchronous specs", function () {
  beforeEach(async function () {
    await somethingSlow();
  }, 1000);

  it("takes a long time", async function () {
    await somethingReallySlow();
  }, 10000);

  afterEach(async function () {
    await somethingSlow();
  }, 1000);
});

/*
Spies

Jasmine has test double functions called spies.
A spy can stub any function and tracks calls to it
and all arguments. A spy only exists in the describe
or it block in which it is defined, and will be
removed after each spec.
There are special matchers for interacting with spies.


You can define what the spy will do when invoked with and.

 */
describe("A spy", function () {
  let foo;
  let bar = null;

  beforeEach(function () {
    foo = {
      setBar: function (value) {
        bar = value;
      }
    };

    spyOn(foo, 'setBar');

    foo.setBar(123);
    foo.setBar(456, 'another param');
  });

  it("tracks that the spy was called", function () {
    expect(foo.setBar).toHaveBeenCalled();
  });

  it("tracks that the spy was called x times", function () {
    expect(foo.setBar).toHaveBeenCalledTimes(2);
  });

  it("tracks all the arguments of its calls", function () {
    expect(foo.setBar).toHaveBeenCalledWith(123);
    expect(foo.setBar).toHaveBeenCalledWith(456, 'another param');
  });

  it("tracks if it was called at all", function () {
    foo.setBar();

    expect(foo.setBar.calls.any()).toEqual(true);
  });
});

/*
createSpy

 */
describe("A spy, when created manually", function () {
  let whatAmI;

  beforeEach(function () {
    whatAmI = jasmine.createSpy('whatAmI');

    whatAmI("I", "am", "a", "spy");
  });

  it("tracks that the spy was called", function () {
    expect(whatAmI).toHaveBeenCalled();
  });
});


/*
createSpyObj

In order to create a mock with multiple spies, use jasmine.createSpyObj
and pass an array of strings.
It returns an object that has a property for each string that is a spy.

 */
describe("Multiple spies, when created manually", function () {
  let tape;

  beforeEach(function () {
    tape = jasmine.createSpyObj(
      'tape',
      ['play', 'pause', 'stop', 'rewind']
    );

    tape.play();
    tape.pause();
    tape.rewind(0);
  });

  it("creates spies for each requested function", function () {
    expect(tape.play).toBeDefined();
    expect(tape.pause).toBeDefined();
    expect(tape.stop).toBeDefined();
    expect(tape.rewind).toBeDefined();
  });
});

/*
Matching with more finesse

 */
describe("Matching with finesse", function() {
  describe("jasmine.any", function () {
    it("matches any value", function () {
      expect({}).toEqual(jasmine.any(Object));
      expect(12).toEqual(jasmine.any(Number));
    });

    describe("when used with a spy", function () {
      it("is useful for comparing arguments", function () {
        const foo = jasmine.createSpy('foo');
        foo(12, function () {
          return true;
        });

        expect(foo).toHaveBeenCalledWith(
          jasmine.any(Number), jasmine.any(Function)
        );
      });
    });
  });

  describe("jasmine.anything", function () {
    it("matches anything", function () {
      expect(1).toEqual(jasmine.anything());
    });

    describe("when used with a spy", function () {
      it("is useful when the argument can be ignored", function () {
        const foo = jasmine.createSpy('foo');
        foo(12, function () {
          return false;
        });

        expect(foo).toHaveBeenCalledWith(12, jasmine.anything());
      });
    });
  });

  describe("jasmine.objectContaining", function () {
    let foo;

    beforeEach(function () {
      foo = {
        a: 1,
        b: 2,
        bar: "baz"
      };
    });

    it("matches objects with the expect key/value pairs", function () {
      expect(foo).toEqual(jasmine.objectContaining({
        bar: "baz"
      }));
      expect(foo).not.toEqual(jasmine.objectContaining({
        c: 37
      }));
    });

    describe("when used with a spy", function () {
      it("is useful for comparing arguments", function () {
        const callback = jasmine.createSpy('callback');

        callback({
          bar: "baz"
        });

        expect(callback).toHaveBeenCalledWith(
          jasmine.objectContaining({bar: "baz"})
        );
      });
    });
  });

  describe("jasmine.arrayContaining", function () {
    let foo;

    beforeEach(function () {
      foo = [1, 2, 3, 4];
    });

    it("matches arrays with some of the values", function () {
      expect(foo).toEqual(jasmine.arrayContaining([3, 1]));
      expect(foo).not.toEqual(jasmine.arrayContaining([6]));
    });

    describe("when used with a spy", function () {
      it("is useful when comparing arguments", function () {
        const callback = jasmine.createSpy('callback');

        callback([1, 2, 3, 4]);

        expect(callback).toHaveBeenCalledWith(
          jasmine.arrayContaining([4, 2, 3])
        );
        expect(callback).not.toHaveBeenCalledWith(
          jasmine.arrayContaining([5, 2])
        );
      });
    });
  });


  describe('jasmine.stringMatching', function () {
    it("matches as a regexp", function () {
      expect({foo: 'bar'}).toEqual({
        foo: jasmine.stringMatching(/^bar$/)
      });
      expect({foo: 'foobarbaz'}).toEqual({
        foo: jasmine.stringMatching('bar')
      });
    });

    describe("when used with a spy", function () {
      it("is useful for comparing arguments", function () {
        const callback = jasmine.createSpy('callback');

        callback('foobarbaz');

        expect(callback).toHaveBeenCalledWith(
          jasmine.stringMatching('bar')
        );
        expect(callback).not.toHaveBeenCalledWith(
          jasmine.stringMatching(/^bar$/)
        );
      });
    });
  });

  describe("custom asymmetry", function () {
    const tester = {
      asymmetricMatch: function (actual) {
        const secondValue = actual.split(',')[1];
        return secondValue === 'bar';
      }
    };

    it("dives in deep", function () {
      expect("foo,bar,baz,quux").toEqual(tester);
    });

    describe("when used with a spy", function () {
      it("is useful for comparing arguments", function () {
        const callback = jasmine.createSpy('callback');

        callback('foo,bar,baz');

        expect(callback).toHaveBeenCalledWith(tester);
      });
    });
  });

  // Jasmine clock time dependent code
  describe("Manually ticking the Jasmine Clock", function () {
    let timerCallback;

    beforeEach(function () {
      timerCallback = jasmine.createSpy("timerCallback");
      jasmine.clock().install();
    });

    afterEach(function () {
      jasmine.clock().uninstall();
    });

    it("causes a timeout to be called synchronously", function () {
      setTimeout(function () {
        timerCallback();
      }, 100);

      expect(timerCallback).not.toHaveBeenCalled();

      jasmine.clock().tick(101);

      expect(timerCallback).toHaveBeenCalled();
    });

    it("causes an interval to be called synchronously", function () {
      setInterval(function () {
        timerCallback();
      }, 100);

      expect(timerCallback).not.toHaveBeenCalled();

      jasmine.clock().tick(101);
      expect(timerCallback.calls.count()).toEqual(1);

      jasmine.clock().tick(50);
      expect(timerCallback.calls.count()).toEqual(1);

      jasmine.clock().tick(50);
      expect(timerCallback.calls.count()).toEqual(2);
    });

    describe("Mocking the Date object", function () {
      it("mocks the Date object and sets it to a given time", function () {
        const baseTime = new Date(2013, 9, 23);

        jasmine.clock().mockDate(baseTime);

        jasmine.clock().tick(50);
        expect(new Date().getTime()).toEqual(baseTime.getTime() + 50);
      });
    });
  });

});