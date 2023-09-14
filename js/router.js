export default class Router {
    routes = {};
    backgrounds = document.querySelector("body");
    linkHome = document.querySelector(".a-home");
    linkUniverse = document.querySelector(".a-universe");
    linkExploration = document.querySelector(".a-exploration");

    add(routeName, page) {
        this.routes[routeName] = page;
    }

    route(event) {
        event = event || window.event;
        event.preventDefault();

        window.history.pushState({}, "", event.target.href);

        this.handle();
    }

    handle() {
        const { pathname } = window.location;
        const route = this.routes[pathname] || this.routes[404];

        fetch(route)
            .then(data => data.text())
            .then(html => {
                document.querySelector('#app').innerHTML = html;
                this.changingClasses(pathname);
            });

    }

    changingClasses(route) {
        let background = String(route);
        background = background.slice(1);

        if (background === "") {
            this.backgrounds.classList.replace(this.backgrounds.classList[0], "bg-home");
            this.linkHome.classList.add("clicked");
            this.linkUniverse.classList.remove("clicked");
            this.linkExploration.classList.remove("clicked");
            return
        }

        if (background != "exploration" && background != "universe") {
            this.linkHome.classList.remove("clicked");
            this.linkUniverse.classList.remove("clicked");
            this.linkExploration.classList.remove("clicked");
            return
        }

        if (background === "universe") {
            this.linkHome.classList.remove("clicked");
            this.linkUniverse.classList.add("clicked");
            this.linkExploration.classList.remove("clicked");
        }

        if (background === "exploration") {
            this.linkHome.classList.remove("clicked");
            this.linkUniverse.classList.remove("clicked");
            this.linkExploration.classList.add("clicked");
        }


        this.backgrounds.classList.replace(this.backgrounds.classList[0], `bg-${background}`);
    }

}