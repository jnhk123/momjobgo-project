export default class Page {
    
    static BASE_PATH = `/momjobgo-project`;

    static HOME = {
        path: `/home`,
        name: `home`,
        meta: {
            title: `Home`,
            icon: `home`
        },
    }

    static ABOUT = {
        path: `/about`,
        name: `about`,
        meta: {
            title: `About`,
            icon: `question_mark`
        },
    }

    static USER = {
        path: `/user`,
        name: `user`,
        meta: {
            title: `User`,
            icon: `account_circle`
        },
    }

    static BOARD = {
        path: `/board`,
        name: `board`,
        meta: {
            title: `Board`,
            icon: `table_rows`
        }
    }

    static LOGIN = {
        path: `/login`,
        name: `login`,
        meta: {
            title: `Login`
        },
    }

    static method = {
        getSubPath(){
            return window.location.pathname.replace(Page.BASE_PATH, '');
        }
    }
}