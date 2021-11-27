exports.schema = {
    page: {
        customSanitizer: {
            options: (value, { req, location, path }) => {
                let pageValue = parseInt(value, 10);
                let sanitizedValue = pageValue <= 0 ? 1 : pageValue;
                return sanitizedValue;
            }
        }
    },
    limit: {
        customSanitizer: {
            options: (value, { req, location, path }) => {
                let limitValue = parseInt(value, 10);
                let sanitizedValue = (isNaN(limitValue) || limitValue <= 0) ? 10 : limitValue;
                return sanitizedValue;
            }
        }
    },
    sortDirection: {
        customSanitizer: {
            options:  (value, { req, location, path }) => {
                let allowedOptions = ['asc', 'desc'];
                let sanitizedValue = allowedOptions.includes(value) ? value : 'desc';
                return sanitizedValue;
            }
        }
    }
}