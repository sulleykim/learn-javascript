(function() {
    var root = document.querySelector('.app-root');

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
        '': function () {
            get('/data/home.json')
            .then(function(res) {
                render(res);
            });
        },
        'service': function () {
            get('/data/service.json')
            .then(function(res) {
                render(res);
            });
        },
        'about': function () {
            get('/data/about.html')
            .then(function(res) {
                renderHtml(res);
            });
        },
        otherwise() {
            root.innerHTML = `${location.hash} Not Found`;
        }
    }

    function router() {
        var hash = location.hash.replace('#', '');
        (routes[hash] || routes.otherwise)();
    }

    window.addEventListener('hashchange', router);
    window.addEventListener('DOMContentLoaded', router);
})();