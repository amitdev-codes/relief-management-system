import 'toastr/build/toastr.min.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import React, { Suspense, lazy, useState } from 'react';
import AppWrapper from './src/AppWrapper';
import ServerErrorPage from './pages/errors/ServerErrorPage';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';
const pages = {
    ...import.meta.glob('./pages/**/*.jsx'),
    ...import.meta.glob('./Pages/**/*.jsx'),
    ...import.meta.glob('./admin/pages/**/*.jsx'),
    ...import.meta.glob('./user/pages/**/*.jsx'),
};

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: async (name) => {
        const pageName = name.includes('/') ? name : `pages/${name}`;
        const page = pages[`./${pageName}.jsx`];
        if (page) {
            const module = await page();
            return module.default;
        }
        return ServerErrorPage;
    },
    setup({ el, App, props }) {
        createRoot(el).render(
            <Suspense fallback={<div>Loading...</div>}>
                <AppWrapper App={App} props={props} />
            </Suspense>
        );
    },
    progress: {
        color: '#4B5563',
    },
});
