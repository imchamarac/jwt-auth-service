type HelmetConfigs = {
    contentSecurityPolicy: {
        directives: {
            defaultSrc: string[];
            imgSrc: string[];
            scriptSrc: string[];
        };
    };
};

export const helmetConfigs: HelmetConfigs = {
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            imgSrc: ["'self'", 'https://uilogos.co'], //img locations
            scriptSrc: ["'self'", '*.jsdelivr.net'], //script locations
        },
    },
};
