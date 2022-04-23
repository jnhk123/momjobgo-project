const SUB_PATH = `/momjobgo-project`;

export default class Page {
    
    static HOME = {
        path: `${SUB_PATH}/`,
        name: `home`,
        meta: {
            title: `Home`,
            icon: `home`
        },
    }

    static ABOUT = {
        path: `${SUB_PATH}/about`,
        name: `about`,
        meta: {
            title: `About`,
            icon: `question_mark`
        },
    }

    static USER = {
        path: `${SUB_PATH}/user`,
        name: `user`,
        meta: {
            title: `User`,
            icon: `account_circle`
        },
    }

    static BOARD = {
        path: `${SUB_PATH}/board`,
        name: `board`,
        meta: {
            title: `Board`,
            icon: `table_rows`
        }
    }

    static LOGIN = {
        path: `${SUB_PATH}/login`,
        name: `login`,
        meta: {
            title: `Login`
        },
    }


}