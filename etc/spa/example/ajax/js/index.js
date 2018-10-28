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
        'home': function () {
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
        otherwise(page) {
            root.innerHTML = `${page} Not Found`;
        }
    }

    function router(page) {
        (routes[page] || routes.otherwise)(page);
    }

    navigation.addEventListener('click', function(e) {
        if (!e.target || e.target.nodeName !== 'A') return;
        e.preventDefault();
        router(e.target.id);
    });

    window.addEventListener('DOMContentLoaded', function() {
        router('home');
    });
})();