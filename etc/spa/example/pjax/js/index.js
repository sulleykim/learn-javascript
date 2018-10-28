(function() {
    var root = document.querySelector('.app-root'),
        navigation = document.getElementById('navigation');

    function render(data) {
        var json = JSON.parse(data);
        root.innerHTML = `<h1>${json.title}</h1><p>${json.content}</p>`
    }

    function renderHtml(html) {
        root.innerHTML = html;
    }

    function get(url) {
        return new Promise(function(resolve, reject) {
            var req = new XMLHttpRequest();

            req.open('GET', url);
            req.send();

            req.onreadystatechange = function() {
                if(req.readyState === XMLHttpRequest.DONE) {
                    if(req.status === 200) resolve(req.response);
                    else reject(req.statusText);
                }
            };
        });
    }

    const routes = {
        '/': function () {
            get('/data/home.json')
            .then(function(res) {
                render(res);
            });
        },
        '/service': function () {
            get('/data/service.json')
            .then(function(res) {
                render(res);
            });
        },
        '/about': function () {
            get('/data/about.html')
            .then(function(res) {
                renderHtml(res);
            });
        },
        otherwise(path) {
            root.innerHTML = `${path} Not Found`;
        }
    }

    function router(path) {
        (routes[path] || routes.otherwise)(path);
    }

    // history entry가 변경되면 발생하는 이벤트
    // PJAX 방식은 hash를 사용하지 않으므로 hashchange 이벤트를 사용할 수 없다.
    // popstate event는 pushState에 의해 발생시키지 않는다.
    // 이전페이지 / 다음페이지 button 또는 history.back() / history.go(n)에 의해 발생한다.
    window.addEventListener('popstate', function(e) {
        console.log('[popstate]', e.state);

        router(e.state.path);
    });

    navigation.addEventListener('click', function(e) {
        if (!e.target || e.target.nodeName !== 'A') return;
        e.preventDefault();

        var path = e.target.getAttribute('href');

        history.pushState({ path }, null, path);

        router(path);
    });

    router('/');
    
    // DOMContentLoaded은 HTML과 script가 로드된 시점에 발생하는 이벤트로 load 이벤트보다 먼저 발생한다. (IE 9 이상 지원)
    // window.addEventListener('DOMContentLoaded', router);

    // 새로고침이 클릭되었을 때, 현 페이지(예를들어 loclahost:5004/service)가 서버에 요청된다.
    // 서버측에는 이에 응답하는 기능이 추가되어야 한다.
    // ex) app.get('/service', (req, res) => res.sendFile(path.join(__dirname + '/public/data/service.html')));
})();