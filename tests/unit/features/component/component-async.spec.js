import Vue from 'vue';
import { promise } from 'es6-promise';

describe('Component async', () => {

  const oldSetTimeout = window.setTimeout;
  const oldClearTimeout = window.clearTimeout;

  // will contain pending timeouts set during the test iteration
  // will contain the id of the timeout as the key, and the the millisecond timeout as the value
  // this helps to identify the timeout that is still pending
  let timeoutsPending = {};

  beforeEach(() => {
    import('../helpers/wait-for-update');
    window.__WEEX__ = false;
    // reset the timeouts for this iteration
    timeoutsPending = {};

    window.setTimeout = function (func, delay) {
      let id = oldSetTimeout(function () {
        delete timeoutsPending[id];
        func();
      }, delay);
      timeoutsPending[id] = delay;
      return id
    };

    window.clearTimeout = function (id) {
      oldClearTimeout(id);
      delete timeoutsPending[id];
    };
  });

  afterEach(() => {
    window.setTimeout = oldSetTimeout;
    window.clearTimeout = oldClearTimeout;
    // after the test is complete no timeouts that have been set up during the test should still be active
    // compare stringified JSON for better error message containing ID and millisecond timeout
    expect(JSON.stringify(timeoutsPending)).toEqual(JSON.stringify({}));
  })

  it('normal', done => {
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        test: (resolve) => {
          setTimeout(() => {
            resolve({
              template: '<div>hi</div>'
            })
            // wait for parent update
            Vue.nextTick(next)
          }, 0)
        }
      }
    }).$mount();

    // console.log('window', window);
    // console.log('vm.$el', vm.$el);

    expect(vm.$el.innerHTML).toBe('<!---->');
    expect(vm.$children.length).toBe(0);

    function next() {
      expect(vm.$el.innerHTML).toBe('<div>hi</div>');
      expect(vm.$children.length).toBe(1);
      done();
    }
  })

  it('resolve ES module default', done => {
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        test: (resolve) => {
          setTimeout(() => {
            resolve({
              __esModule: true,
              default: {
                template: '<div>hi</div>'
              }
            })
            // wait for parent update
            Vue.nextTick(next)
          }, 0)
        }
      }
    }).$mount()
    expect(vm.$el.innerHTML).toBe('<!---->')
    expect(vm.$children.length).toBe(0)

    function next() {
      expect(vm.$el.innerHTML).toBe('<div>hi</div>')
      expect(vm.$children.length).toBe(1)
      done()
    }
  })

  it('as root', done => {
    const vm = new Vue({
      template: '<test></test>',
      components: {
        test: resolve => {
          setTimeout(() => {
            resolve({
              template: '<div>hi</div>'
            })
            // wait for parent update
            Vue.nextTick(next)
          }, 0)
        }
      }
    }).$mount()
    expect(vm.$el.nodeType).toBe(8)
    expect(vm.$children.length).toBe(0)

    function next() {
      expect(vm.$el.nodeType).toBe(1)
      expect(vm.$el.outerHTML).toBe('<div>hi</div>')
      expect(vm.$children.length).toBe(1)
      done()
    }
  })

  it('dynamic', done => {
    const vm = new Vue({
      template: '<component :is="view"></component>',
      data: {
        view: 'view-a'
      },
      components: {
        'view-a': resolve => {
          setTimeout(() => {
            resolve({
              template: '<div>A</div>'
            })
            Vue.nextTick(step1)
          }, 0)
        },
        'view-b': resolve => {
          setTimeout(() => {
            resolve({
              template: '<p>B</p>'
            })
            Vue.nextTick(step2)
          }, 0)
        }
      }
    }).$mount()
    let aCalled = false

    function step1() {
      // ensure A is resolved only once
      expect(aCalled).toBe(false)
      aCalled = true
      expect(vm.$el.tagName).toBe('DIV')
      expect(vm.$el.textContent).toBe('A')
      vm.view = 'view-b'
    }

    function step2() {
      expect(vm.$el.tagName).toBe('P')
      expect(vm.$el.textContent).toBe('B')
      vm.view = 'view-a'
      waitForUpdate(function () {
        expect(vm.$el.tagName).toBe('DIV')
        expect(vm.$el.textContent).toBe('A')
      }).then(done)
    }
  })
});
