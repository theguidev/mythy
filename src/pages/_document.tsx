import Document, {Html, Head, Main, NextScript} from "next/document";

export default class MyDocument extends Document{
    render() {
        return (
            <Html>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;900&display=swap" rel="stylesheet"/>
                <link rel="icon" type="image/x-icon" href="/static/favicon.ico" />
            </Head>
            <body> 
                <Main />
                <NextScript />
            </body>
            </Html>
        )
    }
}