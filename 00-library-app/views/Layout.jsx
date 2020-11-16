const React = require('react');

function Layout(props) {
    return (
        <html lang="en">
            <head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Book App</title>
                <link rel="stylesheet" href="./../stylesheets/style.css"></link>
            </head>
            <body>
                {props.children}
            </body>
        </html>
    )
}

module.exports = Layout;